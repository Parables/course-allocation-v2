<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	import type { ITable } from './';
	import TableCell from './TableCell.svelte';

	export let table: ITable;
	export let data: any[] = [];
</script>

<div class="flex flex-col ">
	<div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
		<div
			class="inline-block min-w-full overflow-hidden align-middle border-b shadow border-comet sm:rounded-lg"
		>
			<table id={table.id} class="w-full divide-y table-auto divide-comet">
				<thead>
					<tr>
						{#each table.columns as column, i (i)}
							<th
								class="px-6 py-3 text-xs font-medium leading-4 tracking-wider
                text-left text-gray-500 uppercase border-b border-comet
                bg-gray-50 {column.class}"
							>
								{column.name}
							</th>
						{/each}
						<th
							class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-comet bg-gray-50"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-comet">
					<slot>
						{#each data as rowData, j}
							<tr on:click={() => dispatch('rowClicked', { rowIndex: j, rowData })}>
								{#each table.rowSchema.cellSchema as cellSchema}
									<TableCell {cellSchema} {rowData} />
								{/each}
							</tr>
						{/each}
					</slot>
				</tbody>
			</table>
		</div>
	</div>
</div>
