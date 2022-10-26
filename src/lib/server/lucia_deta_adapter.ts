import { Deta } from 'deta';
import { LuciaError } from 'lucia-sveltekit';
import type { Adapter } from 'lucia-sveltekit/adapter';

const getUpdateData = (data: any) => {
	const rawData = {
		provider_id: data.providerId,
		hashed_password: data.hashedPassword,
		...(data.attributes || {})
	};
	const result: Record<string, any> = {};
	for (const key in rawData) {
		if (rawData[key] === undefined) continue;
		result[key] = rawData[key];
	}
	return result;
};

const adapter = (projectKey: string, userBaseName: string, sessionBaseName: string): Adapter => {
	// Initialize with a Project Key
	const deta = Deta(projectKey);

	// This how to connect to or create a database.
	const users = deta.Base(userBaseName);
	const sessions = deta.Base(sessionBaseName);

	return {
		getUser: async (userId) => {
			return users
				.get(userId)
				.then((data: any) => data)
				.catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 33 ~ getUser: ~ error', error);
					throw new LuciaError('DATABASE_FETCH_FAILED');
				});
		},
		getUserByProviderId: async (providerId) => {
			return users
				.fetch({ provider_id: providerId }, { limit: 1 })
				.then((data: any) => data['items'][0])
				.catch((error) => {
					console.log(
						'🚀 ~ file: lucia_deta_adapter.ts ~ line 42 ~ getUserByProviderId: ~ error',
						error
					);
					throw new LuciaError('DATABASE_FETCH_FAILED');
				});
		},
		getSessionAndUserBySessionId: async (sessionId) => {
			return sessions
				.get(sessionId)
				.then((session: any) => {
					return session?.user_id
						? users.get(session?.user_id).then((user: any) =>
								session && user
									? {
											session,
											user
									  }
									: null
						  )
						: null;
				})
				.catch((error) => {
					console.log(
						'🚀 ~ file: lucia_deta_adapter.ts ~ line 65 ~ getSessionAndUserBySessionId: ~ error',
						error
					);
					throw new LuciaError('DATABASE_FETCH_FAILED');
				});
		},

		getSession: async (sessionId) => {
			return sessions
				.get(sessionId)
				.then((data: any) => {
					return data;
				})
				.catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 80 ~ getSession: ~ error', error);
					throw new LuciaError('DATABASE_FETCH_FAILED');
				});
		},
		getSessionsByUserId: async (userId) => {
			let allItems: any[] = [];

			try {
				let res = await sessions.fetch({ user_id: userId });
				allItems = res.items;

				// continue fetching until last is not seen
				while (res.last) {
					res = await sessions.fetch({ user_id: userId }, { last: res.last });
					allItems = allItems.concat(res.items);
				}
			} catch (error) {
				console.log(
					'🚀 ~ file: lucia_deta_adapter.ts ~ line 97 ~ getSessionsByUserId: ~ error',
					error
				);
				throw new LuciaError('DATABASE_FETCH_FAILED');
			}

			return allItems;
		},
		setUser: async (userId, data) => {
			const existingUser = await users.fetch({ provider_id: data.providerId }, { limit: 1 });

			if (existingUser.count > 0) {
				throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
			}

			return users
				.insert(
					{
						id: userId || undefined,
						provider_id: data.providerId,
						hashed_password: data.hashedPassword,
						...data.attributes
					},
					userId || undefined
				)
				.then((data: any) => data)
				.catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 125 ~ setUser: ~ error', error);
					if (error.details.includes(userId)) {
						//&& error.details.includes('already exists.')) {
						throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
					}
					if (error.details.includes('already exists.')) {
						throw new LuciaError('AUTH_DUPLICATE_USER_DATA');
					}
					throw new LuciaError('DATABASE_UPDATE_FAILED');
				});
		},
		deleteUser: async (userId) => {
			if (userId) {
				users.delete(userId).catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 139 ~ deleteUser: ~ error', error);
					throw new LuciaError('DATABASE_UPDATE_FAILED');
				});
			}
		},
		setSession: async (sessionId, data) => {
			if (!(await users.get(data.userId))) {
				throw new LuciaError('AUTH_INVALID_USER_ID');
			}

			return sessions
				.insert(
					{
						id: sessionId,
						expires: data.expires,
						idle_expires: data.idlePeriodExpires,
						user_id: data.userId
					},
					sessionId
				)
				.then((data: any) => data)
				.catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 161 ~ setSession: ~ error', error);
					if (error.details.includes(sessionId)) {
						//& error.details.includes('already exists.'))
						throw new LuciaError('AUTH_DUPLICATE_SESSION_ID');
					}
					throw new LuciaError('DATABASE_UPDATE_FAILED');
				});
		},
		deleteSession: async (...sessionIds) => {
			sessionIds.forEach((key) =>
				sessions.delete(key).catch((error) => {
					console.log(
						'🚀 ~ file: lucia_deta_adapter.ts ~ line 172 ~ deleteSession: ~ error',
						error
					);
					throw new LuciaError('DATABASE_UPDATE_FAILED');
				})
			);
		},
		deleteSessionsByUserId: async (userId) => {
			let res = await sessions.fetch({ user_id: userId });
			let allItems = res.items;

			// continue fetching until last is not seen
			while (res.last) {
				res = await sessions.fetch({ user_id: userId }, { last: res.last });
				allItems = allItems.concat(res.items);
			}

			allItems.forEach((session: any) =>
				sessions.delete(session?.key ?? '').catch((error) => {
					console.log(
						'🚀 ~ file: lucia_deta_adapter.ts ~ line 192 ~ deleteSessionsByUserId: ~ error',
						error
					);
					throw new LuciaError('DATABASE_UPDATE_FAILED');
				})
			);
		},
		updateUser: async (userId, newData) => {
			const dbData = getUpdateData(newData);

			/* 		users.fetch({ provider_id: newData.providerId }, { limit: 1 }).then((found: any) => {
				if (found) {
					throw new LuciaError('AUTH_DUPLICATE_PROVIDER_ID');
				}
			}); */

			return users
				.update(dbData, userId)
				.then((data: any) => {
					if (data !== null) {
						throw new LuciaError('AUTH_INVALID_USER_ID');
					}
					return data;
				})
				.catch((error) => {
					console.log('🚀 ~ file: lucia_deta_adapter.ts ~ line 218 ~ updateUser: ~ error', error);
					if (error.details.includes('already exists.')) {
						throw new LuciaError('AUTH_DUPLICATE_USER_DATA');
					}
					throw new LuciaError('DATABASE_FETCH_FAILED');
				});
		}
	};
};
export default adapter;
