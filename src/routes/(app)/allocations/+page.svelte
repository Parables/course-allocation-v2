<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import type { UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import downloadIcon from '$lib/assets/icons/download-cloud.svg?raw';
	import filterIcon from '$lib/assets/icons/filter.svg?raw';
	import type { PageData, PageLoad } from './$types';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { FilterableProgramme, ProgrammeRawType } from '$lib/data/types/programme';
	import alasql from 'alasql';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { suffixWith } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let rawProgrammes: typeof data.rawProgrammes = [];
	let filterableProgrammes: typeof data.filterableProgrammes = [];
	let dataset: Record<string, any> = {};

	let selectedProgramme: ProgrammeRawType | undefined = undefined;
	let selectedSemester: string | undefined = undefined;
	$: {
		({ rawProgrammes, filterableProgrammes } = data);
	}

	$: {
		if (selectedProgramme) {
			// console.log(filterableProgrammes);

			Object.keys(selectedProgramme.outline).forEach((y) => {
				const res: FilterableProgramme[] = alasql(
					`SELECT * FROM ? 
					WHERE key = ? AND year LIKE ? AND sem LIKE ?`,
					[filterableProgrammes, `${selectedProgramme?.key}`, `%${y}%`, `%${selectedSemester}%`]
				);
				dataset[y] = res.map((pg, i) => ({
					'S/N': i + 1,
					'COURSE CODE': pg.course_code,
					'COURSE TITLE': pg.course_title,
					'CREDIT HOURS': pg.course_creditHours,
					LECTURER: pg.course_lecturer_fullName,
					CONTACT: pg.course_lecturer_phoneNumber
				}));
			});

			console.log(dataset);
		}
	}

	const columns: UserConfig['columns'] = [
		{ id: 'S/N', name: 'S/N', width: '10%' }, //
		{ id: 'COURSE CODE', name: 'COURSE CODE', width: '12%' },
		{ id: 'COURSE TITLE', name: 'COURSE TITLE', width: '25%' }, //
		{ id: 'CREDIT HOURS', name: 'CREDIT HOURS', width: '12%' },
		{ id: 'LECTURER', name: 'LECTURER', width: '23%' }, //
		{ id: 'CONTACT', name: 'CONTACT', width: '20%' } //
	];

	const exportToExcel = () => {
		alasql(`SELECT INTO XLSX("${selectedProgramme?.title}.xlsx",?) FROM ?`, [
			Object.keys(dataset).map((y) => ({ sheetid: y, header: true })),
			Object.values(dataset)
		]);
	};
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
</svelte:head>

<div class="flex flex-col w-full h-full overflow-hidden">
	<!-- app bar -->
	<div class="flex items-center justify-between w-full p-2">
		<div class="flex items-center w-full ">
			<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Allocations</h1>
		</div>
	</div>
	<!-- filtering dropdowns -->
	<div class="grid items-end w-full grid-cols-1 gap-10 px-2 md:grid-cols-12 ">
		<!-- select programme -->
		<div class="col-span-7 form-control">
			<label for="select-programme" class="label">
				<span class="label-text">Select Programme</span>
			</label>
			<select id="select-programme" bind:value={selectedProgramme} class="select select-bordered">
				{#each rawProgrammes as p}
					<option value={p}>{p.title}</option>
				{/each}
			</select>
		</div>

		<!-- select sem -->
		<div class="col-span-3 form-control ">
			<label for="select-sem" class="label">
				<span class="label-text">Select Semester</span>
			</label>
			<select id="select-sem" bind:value={selectedSemester} class="select select-bordered">
				<option value="sem1" selected>1st Semester</option>
				<option value="sem2">2nd Semester</option>
			</select>
		</div>

		<!-- export button -->
		<Button classNames="flex items-center gap-x-2 col-span-2" on:click={exportToExcel}
			>{@html downloadIcon}
			<p class="text-center ">Export To Excel</p>
		</Button>
	</div>

	<!-- grid list -->
	<div class="flex-1 w-full mt-4 overflow-y-auto ">
		<div class="grid w-full grid-cols-1 pr-5 mt-5 overflow-hidden gap-y-20">
			{#if selectedProgramme}
				{#each Object.keys(selectedProgramme.outline) as year}
					<div>
						<p class="py-4 text-base font-semibold text-center uppercase">
							{year.replace('year', 'Year ')} - {selectedSemester === 'sem1'
								? 'First Semester'
								: 'Second Semester'}
							{selectedProgramme.title}
						</p>
						<Grid
							{columns}
							data={dataset[year]}
							sort
							fixedHeader
							resizable
							width="100%"
							className={{
								table: 'table-auto whitespace-nowrap ',
								td: 'whitespace-nowrap ',
								tr: 'hover:cursor-pointer'
							}}
						/>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
