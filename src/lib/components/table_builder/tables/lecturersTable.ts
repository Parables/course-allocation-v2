import type { ITable } from '..';

export const lecturersTable: ITable = {
	id: 'AllLecturers',
	columns: [
		{ name: 'Full Name' },
		{ name: 'Gender' },
		{ name: 'Email', class: 'text-center' },
		{ name: 'Phone Number', class: 'text-center' },
		{ name: 'Degree' },
		{ name: 'Masters' }
	],
	rowSchema: {
		cellSchema: [
			{ type: 'avartar-text', text: 'full_name', subText: 'examsID' },
			{ type: 'chip', text: 'gender', class: 'text-center' },
			{ type: 'text', text: 'email', class: 'text-center' },
			{ type: 'text', text: 'phone_number', class: 'text-center' },
			{ type: 'text', text: 'degree' },
			{ type: 'text', text: 'masters' },
			{ type: 'actions', actions: ['view', 'edit', 'delete'] }
		]
	}
};
