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
	import type { ProgrammeType } from '$lib/data/types/programme';

	const columns: UserConfig['columns'] = [
		{
			id: 'title',
			name: 'Programme Title & Code',
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
		{ name: 'Programme Code', hidden: true },
		{ name: 'Duration' },
		{ name: 'Courses' },
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
						return `<form action="${$page.url.toString()}?/delete" method="POST" class="grid place-items-center"><input name="key" value=${key} class="sr-only" /><button type="submit">${deleteIcon}</button></form>`;
					}
				});

				return html(`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`);
			}
		}
	];
	const server: ServerStorageOptions = {
		url: `${$page.url.origin}/api/programmes`, // TODO: Replace with data fetched from PageLoad
		then: (data: ProgrammeType[]) => {
			return data?.map((programme: ProgrammeType) => {
				return [
					{ key: programme.key, title: programme.title, code: programme.code },
					programme.title,
					programme.code,
					`${Object.keys(programme.outline).length} years`,
					0, //TODO: use alaSQL here
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
			<h1 class="text-2xl font-bold font-poppins">All Programmes</h1>
		</div>

		<a href="/programmes/new">
			<Button classNames="w-auto inline-flex items-center gap-x-2">{@html plusIcon} New</Button>
		</a>
	</div>

	<div class=" w-full h-[90%] overflow-hidden mt-4" bind:this={tableWrapper}>
		<Grid
			{columns}
			sort
			autoWidth={false}
			search={{ ignoreHiddenColumns: false }}
			pagination={{ enabled: true, limit: 10 }}
			fixedHeader
			height="{tableWrapper?.clientHeight - 130}px"
			{server}
			className={{
				table: 'table-auto whitespace-nowrap ',
				td: 'whitespace-nowrap '
			}}
		/>
	</div>
</div>
