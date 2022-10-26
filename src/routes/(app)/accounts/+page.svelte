<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import userIcon from '$lib/assets/icons/user-check.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { LecturerType } from '$lib/data/types/lecturer';
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import type { PageData } from './$types';
	import Select from '$lib/components/input-fields/select.svelte';
	import { lecturersTable } from '$lib/components/table_builder/tables/lecturersTable';
	import { applyAction, enhance } from '$app/forms';
	import EasyToast from '$lib/components/easy-toast.svelte';
	import { getUser } from 'lucia-sveltekit/client';

	export let data: PageData;
	export let form: any;

	const user = getUser();

	let allLecturers: typeof data.allLecturers;
	let unregisteredLecturers: typeof data.unregisteredLecturers;
	let selectedLecturer: LecturerType | undefined;
	$: ({ allLecturers, unregisteredLecturers } = data);

	let columns: UserConfig['columns'] = [
		{ id: 'userId', name: 'user ID', hidden: true },
		{ id: 'lecturerKey', name: 'lecturerKey', hidden: true },
		{ id: 'providerId', name: 'Provider ID', width: '40%' },
		{ id: 'username', name: 'Username', width: '30%' },
		{ id: 'role', name: 'Role', width: '25%' },
		{
			name: 'Actions',
			// width: '16%',
			formatter: (cell: any, row: any) => {
				const userId = row.cells[0].data;
				const lecturerKey = row.cells[1].data;

				const actions = cell.map((action: any) => {
					if (action === 'delete') {
						return `<form action="/accounts?/deleteAccount" method="POST" class="grid place-items-center"><input name="userId" value=${userId} class="sr-only" /> <input name="lecturerKey" value=${lecturerKey} class="sr-only" /> <button type="submit" title="Delete Programme" class="hover:bg-purple-200 p-5 rounded-md"  on:click|preventDefault>${deleteIcon}</button></form>`;
					}
				});

				return html(`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`);
			}
		}
	];

	const server: ServerStorageOptions = {
		url: `${$page.url.origin}/api/users`,
		then: (data: any[]) => {
			return data
				.filter((d) => d.role !== 'admin')
				.map((d) => [d.userId, d.lecturerKey, d.providerId, d.username, d.role, ['delete']]);
		}
	};
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex items-center justify-between w-full">
		<div>
			<div class="flex items-center w-full ">
				<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
					{@html backIcon}
				</a>
				<h1 class="text-2xl font-bold font-poppins">User Accounts</h1>
			</div>
			<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Manage all Users</h3>
		</div>

		{#if user?.role === 'admin'}
			<a href="/register">
				<Button classNames="w-auto inline-flex  items-center gap-x-2"
					>{@html plusIcon} Register Another Admin</Button
				>
			</a>
		{/if}
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<!-- top divider -->
		<hr class="mt-6" />

		<div class="flex flex-col w-full mt-6 px-4">
			<!-- <div>
				<h2 class="text-sm font-semibold font-poppins">Pending Invitations</h2>
				<h5 class="mb-8 text-xs font-light font-poppins">
					Grant access to a Lecturer by sending an email invitation
				</h5>
			</div>
			<form method="POST" class="grid grid-cols-12 gap-10">
				<InputField
					id="email"
					name="email"
					label="Select Email"
					list="pending-invites"
					classNames="col-span-6 w-auto"
				/>
				<datalist id="pending-invites">
				 {#each pendingInvites as invitee}
					<option value={invitee.email}>{invitee.fullName}</option>
				{/each}
				</datalist>

				<Button classNames=" w-auto md:ml-10 col-span-3 items-center flex gap-x-5 justify-center"
					>{@html sendIcon}Send Invitation</Button
				>
			</form> -->

			{#if unregisteredLecturers.length > 0}
				<div>
					<h2 class="text-sm font-semibold font-poppins">Create Lecturer Account</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">
						A lecturer would have login access to the system
					</h5>
				</div>
				<div class="grid grid-cols-12 gap-10 mb-8">
					<div class="col-span-7 form-control">
						<label for="select-programme" class="label">
							<span class="label-text">Select Lecturer</span>
						</label>
						<select
							id="email"
							name="selectedAccount"
							required
							label="Select Lecturer"
							class="select select-bordered w-full"
							bind:value={selectedLecturer}
							>{#each unregisteredLecturers as lecturer}
								<option class="my-4 flex flex-col" value={lecturer}>
									<p>{lecturer.fullName} -</p>
									<p>{lecturer.email}</p>
								</option>
							{:else}
								<option disabled value={undefined}>All lecturers are registered</option>
							{/each}
						</select>
					</div>
					<form
						method="POST"
						action="/accounts?/createAccount"
						class="grid grid-cols-12 col-span-3 gap-10"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'redirect') {
									window.location.href = result.location; // invalidateAll() + goto() will not work
									return;
								}
								applyAction(result);
							};
						}}
					>
						<input
							id="lecturerKey"
							name="lecturerKey"
							type="text"
							class="sr-only"
							value={selectedLecturer?.key}
						/>

						<input
							id="username"
							name="username"
							type="text"
							class="sr-only"
							value={selectedLecturer?.fullName}
						/>

						<input
							id="email"
							name="email"
							type="text"
							class="sr-only"
							value={selectedLecturer?.email}
						/>

						<input
							id="password"
							name="password"
							type="text"
							class="sr-only"
							value="LECTURER_{selectedLecturer?.staffID}"
						/>

						<input id="role" name="role" type="text" class="sr-only" value="lecturer" />

						<Button classNames=" w-auto mt-6 col-span-full items-center flex gap-x-5 justify-center"
							>{@html userIcon}Create Account</Button
						>
					</form>
				</div>
			{:else}
				<a href="/lecturers/new" class="text-base font-semibold text-center "
					>{allLecturers.length > 0
						? 'All Lecturers have been registered'
						: 'There are no lecturers on the system'}. <br />
					<span class="link link-hover btn mt-4">create a lecturers here</span>
				</a>
			{/if}
			<EasyToast
				show={form?.success?.message}
				message={form?.success?.message ?? 'Account created successfully'}
				type="success"
			/>
			<EasyToast
				show={form?.error?.message}
				message={form?.error?.message ?? 'Something went wrong'}
				type="error"
			/>

			<Grid
				{columns}
				{server}
				sort
				search={{ ignoreHiddenColumns: false }}
				pagination={{ enabled: true, limit: 10 }}
				fixedHeader
				resizable
				className={{
					table: 'table-auto whitespace-nowrap ',
					td: 'whitespace-nowrap ',
					tr: 'hover:cursor-pointer'
				}}
			/>
		</div>
	</div>
</div>
