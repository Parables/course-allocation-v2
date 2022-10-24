import type { LayoutLoad } from './$types';
import HomeIcon from '$lib/assets/icons/home.svg?raw';
import AccountIcon from '$lib/assets/icons/shield.svg?raw';
import UserIcon from '$lib/assets/icons/user.svg?raw';
import LecturerIcon from '$lib/assets/icons/users.svg?raw';
import ProgrammeIcon from '$lib/assets/icons/grid.svg?raw';
import CourseIcon from '$lib/assets/icons/airplay.svg?raw';
import ScheduleIcon from '$lib/assets/icons/calendar.svg?raw';
import AllocationIcon from '$lib/assets/icons/user-check.svg?raw';
import SettingIcon from '$lib/assets/icons/settings.svg?raw';
import LogoutIcon from '$lib/assets/icons/log-out.svg?raw';
import { redirect } from '@sveltejs/kit';
import { getUser } from 'lucia-sveltekit/load';
import { accessList } from './route-access-list';
import { browser } from '$app/environment';

export const load: LayoutLoad = async (event) => {
	console.log('CSR: ', browser, 'SSR', !browser);

	// console.log('routeID: ', event.routeId);
	console.log(
		'🚀 ~ file: +layout.ts ~ line 15 ~ constload:LayoutLoad= ~ event.routeId',
		event.url.pathname
	);
	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');
	const redirectTo = accessList[event.url.pathname]?.[user.role];
	console.log(
		'🚀 ~ file: +layout.ts ~ line 23 ~ constload:LayoutLoad= ~ redirectTo',
		redirectTo,
		event.url.pathname,
		user
	);

	if (redirectTo && redirectTo !== event.url.pathname) {
		throw redirect(302, redirectTo);
	}
	return {
		navigation:
			user.role === 'admin'
				? [
						{
							title: 'Overview of the school',
							label: 'Dashboard',
							href: '/',
							icon: HomeIcon
						},
						{
							title: 'Manage User Accounts',
							label: 'Accounts',
							href: '/accounts',
							icon: AccountIcon
						},
						{
							title: 'Manage lecturers',
							label: 'Lecturers',
							href: '/lecturers',
							icon: LecturerIcon
						},
						{
							title: 'Manage courses',
							label: 'Courses',
							href: '/courses',
							icon: CourseIcon
						},
						{
							title: 'Manage programme',
							label: 'Programmes',
							href: '/programmes',
							icon: ProgrammeIcon
						},
						{
							title: 'Manage schedules',
							label: 'Schedules',
							href: '/schedules',
							icon: ScheduleIcon
						},
						{
							title: 'View and Export Course Allocations',
							label: 'Allocations',
							href: '/allocations',
							icon: ProgrammeIcon
						},
						/* 		{
				title: 'Edit your preferences',
				label: 'Settings',
				href: '/settings',
				icon: SettingIcon
			},*/
						{
							title: 'Register another admin',
							label: 'Register Admin',
							href: '/register',
							icon: UserIcon
						},
						{
							title: 'Logout current user',
							label: 'Logout',
							href: '/logout',
							icon: LogoutIcon
						}
				  ]
				: [
						{
							title: 'Overview of the school',
							label: 'Dashboard',
							href: '/',
							icon: HomeIcon
						},
						/* {
				title: 'Manage User Accounts',
				label: 'Accounts',
				href: '/accounts',
				icon: AccountIcon
			}, */
						{
							title: 'View Profile',
							label: 'Profile',
							href: `/profile/${user.lecturerKey}`,
							icon: LecturerIcon
						},
						{
							title: 'Manage courses',
							label: 'Courses',
							href: '/courses',
							icon: CourseIcon
						},
						{
							title: 'Manage programme',
							label: 'Programmes',
							href: '/programmes',
							icon: ProgrammeIcon
						},
						/* 	{
				title: 'Manage schedules',
				label: 'Schedules',
				href: '/schedules',
				icon: ScheduleIcon
			}, */
						{
							title: 'View and Export Course Allocations',
							label: 'Allocations',
							href: '/allocations',
							icon: ProgrammeIcon
						},
						/* 		{
				title: 'Edit your preferences',
				label: 'Settings',
				href: '/settings',
				icon: SettingIcon
			},*/
						{
							title: 'Logout current user',
							label: 'Logout',
							href: '/logout',
							icon: LogoutIcon
						}
				  ]
	};
};
