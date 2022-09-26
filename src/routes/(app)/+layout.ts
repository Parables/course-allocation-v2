import type { LayoutLoad } from './$types';
import HomeIcon from '$lib/assets/icons/home.svg?raw';
import LecturerIcon from '$lib/assets/icons/users.svg?raw';
import ProgrammeIcon from '$lib/assets/icons/grid.svg?raw';
import CourseIcon from '$lib/assets/icons/airplay.svg?raw';
import ScheduleIcon from '$lib/assets/icons/calendar.svg?raw';
import SettingIcon from '$lib/assets/icons/settings.svg?raw';
import LogoutIcon from '$lib/assets/icons/log-out.svg?raw';

export const load: LayoutLoad = async () => {
	return {
		navigation: [
			{
				title: 'Overview of the school',
				label: 'Dashboard',
				href: '/',
				icon: HomeIcon
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
			}
			/* 		{
				title: 'Edit your preferences',
				label: 'Settings',
				href: '/settings',
				icon: SettingIcon
			},
			{
				title: 'Logout current user',
				label: 'Logout',
				href: '/logout',
				icon: LogoutIcon
			} */
		]
	};
};
