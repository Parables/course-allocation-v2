import type { ITable } from '..';

export let coursesTable: ITable = {
	id: 'AllCourses',
	columns: [
		{ name: 'Course Name' },
		{ name: 'Year Group', class: 'text-center' },
		{ name: 'Course Type' },
		{ name: 'No. Of Students' }
	],
	rowSchema: {
		cellSchema: [
			{ type: 'text', text: 'course_name' },
			{ type: 'numeric', text: 'year_group', class: 'text-center' },
			{ type: 'text', text: 'course_type' },
			{ type: 'numeric', text: 'student_count' },
			{ type: 'actions', actions: ['edit', 'delete'] }
		]
	}
};
