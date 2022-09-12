<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { PageData } from './$types';
	import TableBuilder from '$lib/components/table_builder/TableBuilder.svelte';
	import { coursesTable } from '$lib/components/table_builder/tables/coursesTable';
	import BackButton from '$lib/assets/icons/chevron-left.svg';

	export let data: PageData;
</script>

<div class="flex w-full items-center justify-between mb-10">
	<div class="flex w-full items-center ">
		<a href="/" class=" rounded border-purple-500 text-purple-500 border mr-4">
			<BackButton />
		</a>
		<h1 class="font-poppins text-2xl font-bold">All Courses</h1>
	</div>

	<a href="/courses/new">
		<Button classNames="w-auto ">+ New</Button>
	</a>
</div>

<TableBuilder table={coursesTable} bind:data={data.courses} />
