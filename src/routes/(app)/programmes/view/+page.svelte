<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import filterIcon from '$lib/assets/icons/filter.svg?raw';
	import type { PageData } from './$types';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { FilterableProgramme, ProgrammeRawType } from '$lib/data/types/programme';
	import alasql from 'alasql';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { suffixWith } from '$lib/utils';
	import { goto } from '$app/navigation';

	let rawProgrammes: ProgrammeRawType[] = [];
	let filterByProgramme: string | undefined = undefined,
		filterByYear: string | undefined = undefined,
		filterBySem: string | undefined = undefined;

	$: {
		filterByProgramme = filterByProgramme ?? $page.url.searchParams.get('programme') ?? '';
		filterByYear = filterByYear ?? $page.url.searchParams.get('year') ?? '';
		filterBySem = filterBySem ?? $page.url.searchParams.get('semester') ?? '';
	}

	const columns: UserConfig['columns'] = [
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
			formatter: (cell: Record<string, unknown>) =>
				html(`
					<div class="flex flex-col">
						<p class="text-base font-semibold">${cell?.title}</p>
						<p class="text-sm text-gray-500">${cell?.code}</p>
					</div>`)
		},
		{ id: 'year', name: 'Year' },
		{ id: 'sem', name: 'Semester' },
		{
			id: 'course_header',
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
			formatter: (cell: Record<string, unknown>) =>
				html(`
					<div class="flex flex-col">
						<p class="text-base font-semibold">${cell?.title}</p>
						<p class="text-sm text-gray-500">${cell?.code}</p>
					</div>`)
		},
		{ id: 'course_title', name: 'Title', hidden: true },
		{ id: 'course_code', name: 'Course Code', hidden: true },
		{ id: 'course_creditHours', name: 'Credit Hours', width: '1300px' },
		{ id: 'course_contactHours', name: 'Contact Hours' },
		{ id: 'course_profile', name: 'Profile' },
		{ id: 'course_session', name: 'Session' },
		{ id: 'course_studentCount', name: 'Student Count' },
		// {id:'', name: 'Lecturer' },
		{
			name: 'Actions',
			formatter: (cell: any, row: any) => {
				const key = row.cells[0].data?.key;

				const actions = cell.map((action: any) => {
					if (action === 'edit') {
						return `<a href="${$page.url.origin}/programmes/edit/${key}">${editIcon}</a>`;
					}
				});

				return html(`<span class="inline-flex items-center gap-x-5">${actions.join('\n')}</span>`);
			}
		}
	];

	let server: ServerStorageOptions;
	$: {
		server = {
			url: `${$page.url.origin}/api/programmes?filterable=true`,
			then: (data: {
				filterableProgrammes: FilterableProgramme[];
				rawProgrammes: ProgrammeRawType[];
			}) => {
				rawProgrammes = [...data.rawProgrammes];
				const tableData = alasql(
					`SELECT * FROM ? 
					WHERE title LIKE ? AND year LIKE ? AND sem LIKE ?`,
					[
						data.filterableProgrammes,
						`%${filterByProgramme}%`,
						`%${filterByYear}%`,
						`%${filterBySem}%`
					]
				);

				return tableData.map((p: FilterableProgramme) => {
					return [
						p.header,
						p.year?.replace('year', 'Year '),
						p.sem?.replace('sem', 'Semester '),
						p.course_header,
						p.course_title?.toUpperCase(),
						p.course_code?.toUpperCase(),
						suffixWith(p.course_creditHours, 'Hour', 'Hours'),
						suffixWith(p.course_contactHours, 'Hour', 'Hours'),
						p.course_profile?.toUpperCase(),
						p.course_session?.toUpperCase(),
						suffixWith(p.course_studentCount, 'Student', 'Students'),
						['edit']
					];
				});
			}
		};
	}

	const handleRowClicked = (e: any) => {
		const key = e.detail[1]['_cells'][0]['data']['key'];
		goto(`/programmes/edit/${key}`);
	};

	let tableWrapper: HTMLDivElement | undefined;
</script>

<div class="flex flex-col w-full h-full overflow-hidden">
	<div class="flex items-center justify-between w-full p-2">
		<div class="flex items-center w-full ">
			<a href="/programmes" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Programme Details</h1>
		</div>

		<a href="/programmes/new">
			<Button classNames="w-auto inline-flex items-center gap-x-2">{@html plusIcon} New</Button>
		</a>
	</div>
	<div class="grid items-center w-full grid-cols-1 gap-10 px-2 md:grid-cols-12 ">
		<InputField
			id="filterByProgramme"
			name="filterByProgramme"
			label="Filter by Programme"
			type="search"
			initial={filterByProgramme}
			bind:value={filterByProgramme}
			list="programme-options"
			classNames="col-span-8"
		/>
		<datalist id="programme-options">
			<option value="" selected>All</option>
			{#each rawProgrammes as p}
				<option value={p.title}>{p.title}</option>
			{/each}
		</datalist>

		<InputField
			id="filterByYear"
			name="filterByYear"
			label="Filter by Year"
			type="search"
			initial={filterByYear}
			bind:value={filterByYear}
			list="year-options"
			classNames="col-span-2"
		/>

		<datalist id="year-options">
			<option value="" selected>All</option>
			<option value="year1">1st Year</option>
			<option value="year2">2nd Year</option>
			<option value="year3">3rd Year</option>
			<option value="year4">4th Year</option>
		</datalist>

		<InputField
			id="filterBySem"
			name="filterBySem"
			label="Filter by Semester"
			type="search"
			initial={filterBySem}
			bind:value={filterBySem}
			list="semester-options"
			classNames="col-span-2"
		/>
		<datalist id="semester-options">
			<option value="" selected>All</option>
			<option value="sem1">1st Semester</option>
			<option value="sem2">2nd Semester</option>
		</datalist>
	</div>
	<div class="w-full h-full mt-4 overflow-hidden " bind:this={tableWrapper}>
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
