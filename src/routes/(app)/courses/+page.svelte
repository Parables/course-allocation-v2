<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { CourseType } from '$lib/data/types/course';

	const columns: UserConfig['columns'] = [
		{
			id: 'title',
			name: 'Course Title & Code',
			sort: {
				compare: (a: any, b: any) => {
					return a.title > b.title || a.code > b.code
						? 1
						: b.title > a.title || b.code > a.code
						? -1
						: 0;
				}
			},
			formatter: (cell: any, row) =>
				html(`
		<div class="flex flex-col">
			<p class="text-base font-semibold">${cell?.title}</p>
			<p class="text-sm text-gray-500">${cell?.code}</p>
		</div>`)
		},
		{ name: 'Title', hidden: true },
		{ name: 'Course Code', hidden: true },
		{ name: 'Credit Hours' },
		{ name: 'Contact Hours' },
		{ name: 'Profile' },
		{ name: 'Session' },
		{ name: 'Student Count' },
		{ name: 'Lecturer' },
		{
			name: 'Actions',
			formatter: (cell: any, row: any) => {
				const key = row.cells[0].data?.key;

				const actions = cell.map((action: any) => {
					if (action === 'view') {
						return `<a href="${$page.url.toString()}/view/${key}">${viewIcon}</a>`;
					} else if (action === 'edit') {
						return `<a href="${$page.url.toString()}/edit/${key}">${editIcon}</a>`;
					} else if (action === 'delete') {
						return `<form action="?/delete" method="post" class="grid place-items-center"><input name="key" value=${key} class="sr-only" /><button type="submit">${deleteIcon}</button></form>`;
					}
				});

				return html(`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`);
			}
		}
	];

	const server: ServerStorageOptions = {
		url: `${$page.url.origin}/api/courses`, // TODO: Replace with data fetched from PageLoad
		then: (data: CourseType[]) => {
			return data?.map((course: CourseType) => {
				return [
					{ key: course.key, title: course.title, code: course.code },
					course.title,
					course.code,
					course.creditHours,
					course.contactHours,
					(course.profile ?? '').toUpperCase(),
					(course.session ?? '').toUpperCase(),
					course.studentCount,
					course.lecturer?.fullName,
					['view', 'edit', 'delete']
				];
			});
		}
	};

	let tableWrapper: HTMLDivElement | undefined;
</script>

<div class="flex flex-col w-full h-full overflow-hidden">
	<div class="flex items-center justify-between w-full">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">All Courses</h1>
		</div>

		<a href="/courses/new">
			<Button classNames="w-auto inline-flex items-center gap-x-2">{@html plusIcon} New</Button>
		</a>
	</div>

	<div class=" w-full h-[90%] overflow-hidden mt-4" bind:this={tableWrapper}>
		<Grid
			{columns}
			{server}
			sort
			search={{ ignoreHiddenColumns: false }}
			pagination={{ enabled: true, limit: 10 }}
			fixedHeader
			resizable
			width="{tableWrapper?.clientWidth}px"
			height="{tableWrapper?.clientHeight - 130}px"
			className={{
				table: 'table-auto whitespace-nowrap ',
				td: 'whitespace-nowrap '
			}}
		/>
	</div>
</div>
