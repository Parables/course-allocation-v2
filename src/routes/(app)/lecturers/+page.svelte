<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';
	import TableBuilder from '$lib/components/table_builder/TableBuilder.svelte';
	import { lecturersTable } from '$lib/components/table_builder/tables/lecturersTable';
	import BackButton from '$lib/assets/icons/chevron-left.svg';

	export let data: PageData;
</script>

<div class="flex w-full items-center justify-between mb-10">
	<div class="flex w-full items-center ">
		<a href="/" class=" rounded border-purple-500 text-purple-500 border mr-4">
			<BackButton />
		</a>
		<h1 class="font-poppins text-2xl font-bold">All Lecturers</h1>
	</div>

	<a href="/lecturers/new">
		<Button classNames="w-auto ">+ New</Button>
	</a>
</div>

<TableBuilder table={lecturersTable} bind:data={data.lecturers} />
