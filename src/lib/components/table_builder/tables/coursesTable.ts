import type { ITable } from '..';

export const coursesTable: ITable = {
	id: 'AllCourses',
	columns: [
		{ name: 'Course Name & Code' },
		{ name: 'Year Group', class: 'text-center' },
		{ name: 'Course Type' },
		{ name: 'No. Of Students' }
	],
	rowSchema: {
		cellSchema: [
			{ type: 'mainText-subText', text: 'course_name', subText: 'course_code' },
			{ type: 'numeric', text: 'year_group', class: 'text-center' },
			{ type: 'text', text: 'course_type' },
			{ type: 'numeric', text: 'student_count' },
			{ type: 'actions', actions: ['edit', 'delete'] }
		]
	}
};
