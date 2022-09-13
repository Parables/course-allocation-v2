import type { LayoutLoad } from './$types';
import HomeIcon from '$lib/assets/icons/home.svg';
import LecturerIcon from '$lib/assets/icons/users.svg';
import CourseIcon from '$lib/assets/icons/airplay.svg';
import ScheduleIcon from '$lib/assets/icons/calendar.svg';
import SettingIcon from '$lib/assets/icons/settings.svg';
import LogoutIcon from '$lib/assets/icons/log-out.svg';

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
			/* {
				title: 'Manage student',
				label: 'Students',
				href: '/students',
				icon: HomeIcon
			}, */
			{
				title: 'Manage courses',
				label: 'Courses',
				href: '/courses',
				icon: CourseIcon
			},
			{
				title: 'Manage schedules',
				label: 'Schedules',
				href: '/schedules',
				icon: ScheduleIcon
			},
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
