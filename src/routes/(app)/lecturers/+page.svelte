<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';
	import TableBuilder from '$lib/components/table_builder/TableBuilder.svelte';
	import { lecturersTable } from '$lib/components/table_builder/tables/lecturersTable';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import { html, type UserConfig } from 'gridjs';
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';

	const columns: UserConfig['columns'] = [
		{
			name: 'Full Name',
			sort: true
		},
		{ name: 'Gender' },
		{ name: 'Email Hours' },
		{ name: 'Phone Number' },
		{ name: 'Degree' },
		{ name: 'Masters' }
	];
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex items-center justify-between w-full ">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				<BackButton />
			</a>
			<h1 class="text-2xl font-bold font-poppins">All Lecturers</h1>
		</div>

		<a href="/lecturers/new">
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
				url: `${$page.url.origin}/api/lecturers`,
				then: (data) => {
					console.log('data', data);
					return data?.map((lecturer) => {
						return [
							lecturer.fullName ?? '',
							lecturer.gender?.toUpperCase() ?? '',
							lecturer.email ?? '',
							lecturer.phoneNumber ?? '',
							lecturer.degree ?? '',
							lecturer.masters ?? ''
						];
					});
				}
			}}
		/>
	</div>
</div>

<style>
	table {
		white-space: 'nowrap';
	}
</style>
