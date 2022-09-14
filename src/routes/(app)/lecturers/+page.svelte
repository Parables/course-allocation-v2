<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';
	import TableBuilder from '$lib/components/table_builder/TableBuilder.svelte';
	import { lecturersTable } from '$lib/components/table_builder/tables/lecturersTable';
	import BackButton from '$lib/assets/icons/chevron-left.svg';

	export let data: PageData;
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex items-center justify-between w-full mb-10">
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

	<div class="flex-1 w-full p-10 mb-10 overflow-x-hidden overflow-y-auto">
		<TableBuilder table={lecturersTable} bind:data={data.lecturers} />
	</div>
</div>
