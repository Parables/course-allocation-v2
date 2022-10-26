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
	import type { LecturerType } from '$lib/data/types/lecturer';
	import { goto } from '$app/navigation';
	import { getUser } from 'lucia-sveltekit/client';

	const user = getUser();

	let columns: UserConfig['columns'] = [
		{ name: 'Key', hidden: true },
		{ name: 'Staff ID' },
		{ name: 'Full Name' },
		{ name: 'Gender' },
		{ name: 'Email' },
		{ name: 'Phone Number' },
		{ name: 'Qualifications' }
	];

	if (user?.role === 'admin') {
		columns = [
			...columns,
			{
				name: 'Actions',
				formatter: (cell: any, row: any) => {
					const key = row.cells[0].data;

					const actions = cell.map((action: any) => {
						if (action === 'view') {
							return `<a href="/lecturers/view/${key}" title="View Lecturer" class="hover:bg-purple-200 p-5 rounded-md">${viewIcon}</a>`;
						} else if (action === 'edit') {
							return `<a href="/lecturers/edit/${key}" title="Edit Lecturer" class="hover:bg-purple-200 p-5 rounded-md">${editIcon}</a>`;
						} else if (action === 'delete') {
							return `<form action="/lecturers?/delete" method="POST" class="grid place-items-center"><input name="key" value=${key} class="sr-only" /><button type="submit" title="Delete Lecturer" class="hover:bg-purple-200 p-5 rounded-md"  on:click|preventDefault>${deleteIcon}</button></form>`;
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
		url: `${$page.url.origin}/api/lecturers`,
		then: (data: LecturerType[]) => {
			return data?.map((lecturer: LecturerType) => {
				return [
					lecturer.key,
					lecturer.staffID,
					lecturer.fullName,
					lecturer.gender.toUpperCase(),
					lecturer.email,
					lecturer.phoneNumber,
					`${Object.keys(lecturer.qualifications ?? {}).length} Qualifications Added`,
					['view', 'edit', 'delete']
				];
			});
		}
	};

	const handleRowClicked = (e: any) => {
		const key = e.detail[1]['_cells'][0]['data'];
		goto(`/lecturers/view/${key}`);
	};

	let tableWrapper: HTMLDivElement | undefined;
</script>

<div class="flex flex-col w-full h-full overflow-hidden">
	<div class="flex items-center justify-between w-full ">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">All Lecturers</h1>
		</div>
		{#if user?.role === 'admin'}
			<a href="/lecturers/new">
				<Button classNames="w-auto inline-flex items-center gap-x-2">{@html plusIcon} New</Button>
			</a>
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
