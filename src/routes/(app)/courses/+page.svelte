<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import assignLecturerIcon from '$lib/assets/icons/user-check.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { CourseType, FilterableCourse } from '$lib/data/types/course';
	import { goto } from '$app/navigation';
	import { suffixWith } from '$lib/utils';
	import { getUser } from 'lucia-sveltekit/client';

	const user = getUser();

	let columns: UserConfig['columns'] = [
		{
			id: 'header',
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
		{ id: 'title', name: 'Title', hidden: true },
		{ id: 'code', name: 'Course Code', hidden: true },
		{ id: 'creditHours', name: 'Credit Hours' },
		{ id: 'contactHours', name: 'Contact Hours' },
		{ id: 'profile', name: 'Profile' },
		{ id: 'session', name: 'Session' },
		{ id: 'studentCount', name: 'Student Count' },
		{ id: 'lecturer_header', name: 'Lecturer Header', hidden: true },
		{ id: 'lecturer_fullName', name: 'Lecturer Name' },
		{ id: 'lecturer_email', name: 'Lecturer Email' },
		{ id: 'lecturer_phoneNumber', name: 'Lecturer Phone Number' }
	];

	if (user?.role === 'admin') {
		columns = [
			...columns,
			{
				name: 'Actions',
				formatter: (cell: any, row: any) => {
					const key = row.cells[0].data?.key ?? '';

					const actions = cell.map((action: any) => {
						if (action === 'edit') {
							return `<a href="/courses/edit/${key}" title="Edit Course" class="hover:bg-purple-200 p-5 rounded-md">${editIcon}</a>`;
						} else if (action === 'delete') {
							return `<form action="/courses?/delete" method="POST" class="grid place-items-center"><input name="key" value="${key}" class="sr-only"/><button type="submit"  title="Delete Course" class="hover:bg-purple-200 p-5 rounded-md" on:click|preventDefault >${deleteIcon}</button></form>`;
						}
					});

					return html(
						`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`
					);
				}
			}
		];
	}

	const server: ServerStorageOptions = {
		url: `${$page.url.origin}/api/courses?filterable=true`,
		then: (data: { filterableCourses: FilterableCourse[]; rawCourses: CourseType[] }) => {
			return data.filterableCourses.map((c: FilterableCourse) => {
				return [
					c.header,
					c.title?.toUpperCase(),
					c.code?.toUpperCase(),
					suffixWith(c.creditHours, 'Hour', 'Hours'),
					suffixWith(c.contactHours, 'Hour', 'Hours'),
					c.profile?.toUpperCase(),
					c.session?.toUpperCase(),
					suffixWith(c.studentCount, 'Student', 'Students'),
					c.lecturer_header,
					c.lecturer_fullName ?? 'N/A',
					c.lecturer_email ?? 'N/A',
					c.lecturer_phoneNumber ?? 'N/A',
					['edit', 'delete']
				];
			});
		}
	};

	const handleRowClicked = (e: any) => {
		if (user?.role === 'admin') {
			const key = e.detail[1]['_cells'][0]['data']['key'];
			goto(`/courses/edit/${key}`);
		}
	};

	let tableWrapper: HTMLDivElement | undefined;
</script>

<div class="flex flex-col w-full h-full overflow-hidden">
	<div class="flex items-center justify-between w-full p-4">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">All Courses</h1>
		</div>

		{#if user?.role === 'admin'}
			<div class="dropdown dropdown-end">
				<!-- <label tabindex="0" class="btn btn-ghost rounded-btn">Dropdown</label> -->
				<Button tabindex="0" classNames="w-auto inline-flex items-center gap-x-2 "
					>{@html plusIcon} New</Button
				>

				<ul tabindex="0" class="mt-4 rounded-md shadow-md menu dropdown-content bg-base-100 w-52">
					{#each [{ label: 'New Course', url: '/courses/new', icon: plusIcon }, { label: 'Assign Course', url: '/schedules', icon: assignLecturerIcon }] as menu}
						<li class="hover-bordered">
							<a href={menu.url}>
								{@html menu.icon}
								{menu.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
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
				td: 'whitespace-nowrap ',
				tr: 'hover:cursor-pointer'
			}}
			on:rowClick={handleRowClicked}
		/>
	</div>
</div>
