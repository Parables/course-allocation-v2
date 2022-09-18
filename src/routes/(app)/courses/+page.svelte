<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { Cell, html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';
	import TableBuilder from '$lib/components/table_builder/TableBuilder.svelte';
	import { coursesTable } from '$lib/components/table_builder/tables/coursesTable';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { CourseType } from '$lib/data/types/course';
	const columns: UserConfig['columns'] = [
		{
			name: 'Course Title & Code',
			sort: true,
			width: '30%',
			formatter: (cell: any, row) =>
				html(`
	<div class="flex flex-col">
		<p class="text-base font-semibold">${cell?.title}</p>	
		<p class="text-sm text-gray-500">${cell?.code}</p>	
	</div>`)
		},
		{ name: 'Credit Hours', width: '12%' },
		{ name: 'Contact Hours', width: '12%' },
		{ name: 'Profile', width: '10%' },
		{ name: 'Session', width: '10%' },
		{ name: 'Student Count', width: '12%' },
		{ name: 'Lecturer', width: '14%' }
	];
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex items-center justify-between w-full">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				<BackButton />
			</a>
			<h1 class="text-2xl font-bold font-poppins">All Courses</h1>
		</div>

		<a href="/courses/new">
			<Button classNames="w-auto ">+ New</Button>
		</a>
	</div>

	<div class="flex-1 w-full p-10 mb-10 overflow-hidden">
		<!-- <TableBuilder table={coursesTable} bind:data={data.courses} /> -->

		<Grid
			{columns}
			sort
			search
			pagination={{ enabled: true, limit: 10 }}
			fixedHeader
			height="500px"
			server={{
				url: `${$page.url.origin}/api/courses`,
				then: (data) => {
					console.log('data', data);
					return data?.map((course) => {
						return [
							{ title: course.title, code: course.code },
							course.creditHours,
							course.contactHours,
							(course.profile ?? '').toUpperCase(),
							(course.session ?? '').toUpperCase(),
							course.studentCount,
							course.lecturer?.fullName
						];
					});
				}
			}}
		/>
	</div>
</div>
