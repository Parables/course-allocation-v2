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

export const load: LayoutLoad = async (event) => {
	const user = await getUser(event);
	if (!user) throw redirect(302, '/login');
	// user.role === 'guest'
	if (user.role === 'guest') {
		return {
			navigation: [
				{
					title: 'Overview of the school',
					label: 'Dashboard',
					href: '/',
					icon: HomeIcon
				}
			]
		};
	}
	// user.role === 'admin'
	else if (user.role === 'admin') {
		return {
			navigation: [
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
		};
	}

	//  user.role === 'lecturer'
	return {
		navigation: [
			{
				title: 'Overview of the school',
				label: 'Dashboard',
				href: '/',
				icon: HomeIcon
			},
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
			{
				title: 'View and Export Course Allocations',
				label: 'Allocations',
				href: '/allocations',
				icon: ProgrammeIcon
			},
			{
				title: 'Logout current user',
				label: 'Logout',
				href: '/logout',
				icon: LogoutIcon
			}
		]
	};
};
