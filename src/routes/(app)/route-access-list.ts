export const accessList: Record<string, Record<string, string>> = {
	'/': {
		admin: '/',
		lecturer: '/',
		guest: '/'
	},
	'/accounts': {
		admin: '/accounts',
		lecturer: '/',
		guest: '/'
	},
	'/allocations': {
		admin: '/allocations',
		lecturer: '/allocations',
		guest: '/'
	},
	'/courses': {
		admin: '/courses',
		lecturer: '/courses',
		guest: '/'
	},
	'/courses/new': {
		admin: '/courses/new',
		lecturer: '/courses',
		guest: '/'
	},
	'/courses/edit': {
		admin: '/courses/edit',
		lecturer: '/courses',
		guest: '/'
	},
	'/profile': {
		admin: '/profile',
		lecturer: '/profile',
		guest: '/'
	},
	'/lecturers': {
		admin: '/lecturers',
		lecturer: '/profile',
		guest: '/'
	},
	'/lecturers/view': {
		admin: '/lecturers/view',
		lecturer: '/profile',
		guest: '/'
	},
	'/lecturers/new': {
		admin: '/lecturers/new',
		lecturer: '/lecturers',
		guest: '/'
	},
	'/lecturers/edit': {
		admin: '/lecturers/edit',
		lecturer: '/lecturers',
		guest: '/'
	},
	'/programmes': {
		admin: '/programmes',
		lecturer: '/programmes',
		guest: '/'
	},
	'/programmes/view': {
		admin: '/programmes/view',
		lecturer: '/programmes',
		guest: '/'
	},
	'/programmes/new': {
		admin: '/programmes/new',
		lecturer: '/programmes',
		guest: '/'
	},
	'/programmes/edit': {
		admin: '/programmes/edit',
		lecturer: '/programmes',
		guest: '/'
	},
	'/schedules': {
		admin: '/schedules',
		lecturer: '/',
		guest: '/'
	}
};
