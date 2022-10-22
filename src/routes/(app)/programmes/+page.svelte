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
	import type {
		FilterableProgramme,
		ProgrammeRawType,
		ProgrammeType
	} from '$lib/data/types/programme';
	import alasql from 'alasql';
	import { goto } from '$app/navigation';
	import { suffixWith } from '$lib/utils';
import {getUser} from 'lucia-sveltekit/client'

const user = getUser();

	let columns: UserConfig['columns'] = [
		{
			id: 'header',
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
		</div>`),
			width: '60%'
		},
		{ id: 'title', name: 'Title', hidden: true },
		{ id: 'code', name: 'Programme Code', hidden: true },
		{ id: 'duration', name: 'Duration', width: '15%' },
		{ name: 'Courses', width: '15%' },
	
	];

	if (user?.role === 'admin') {
		columns = [
			...columns,
			{
			name: 'Actions',
			formatter: (cell: any, row: any) => {
				const key = row.cells[0].data?.key;
				const title = row.cells[0].data?.title;

				const actions = cell.map((action: any) => {
					if (action === 'view') {
						return `<a href="/programmes/view?programme=${title}"View title=" Programme" class="hover:bg-purple-200 p-5 rounded-md">${viewIcon}</a>`;
					} else if (action === 'edit') {
						return `<a href="/programmes/edit/${key}" title="Edit Programme" class="hover:bg-purple-200 p-5 rounded-md">${editIcon}</a>`;
					} else if (action === 'delete') {
						return `<form action="/programmes?/delete" method="POST" class="grid place-items-center"><input name="key" value=${key} class="sr-only" /><button type="submit" title="Delete Programme" class="hover:bg-purple-200 p-5 rounded-md"  on:click|preventDefault>${deleteIcon}</button></form>`;
					}
				});

				return html(`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`);
			}
		}
		];
	}
	const server: ServerStorageOptions = {
		url: `${$page.url.origin}/api/programmes?filterable=true`,
		then: (data: {
			filterableProgrammes: FilterableProgramme[];
			rawProgrammes: ProgrammeRawType[];
		}) => {
			const tableData = alasql(
				`SELECT p.*, COUNT(DISTINCT course_key) AS course_count FROM ? AS p GROUP BY p.title`,
				[data.filterableProgrammes]
			);

			return tableData.map((p: FilterableProgramme) => {
				return [
					p.header,
					p.title?.toUpperCase(),
					p.code?.toUpperCase(),
					suffixWith(p.duration, 'Year', 'Years'),
					suffixWith(p.course_count, 'Course', 'Courses'),
					['view', 'edit', 'delete']
				];
			});
		}
	};
	const handleRowClicked = (e: any) => {
		const title = e.detail[1]['_cells'][0]['data']['title'];
		goto(`/programmes/view?programme=${title}`);
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
