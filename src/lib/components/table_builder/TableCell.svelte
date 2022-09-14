<script lang="ts">
	import type { ICellSchema } from './';
	import { page } from '$app/stores';
	import ViewIcon from '$lib/assets/icons/eye.svg';
	import EditIcon from '$lib/assets/icons/edit.svg';
	import DeleteIcon from '$lib/assets/icons/trash.svg';
	// import MoreIcon from '$lib/assets/icons/ellipsis-vertical.svg';
	export let cellSchema: ICellSchema;
	export let rowData: Record<string, any> = {};
</script>

{#if cellSchema.type === 'avartar-mainText-subText' || cellSchema.type === 'avartar-text'}
	<td class="px-6 py-4 whitespace-no-wrap border-b border-comet">
		<div class="flex items-center">
			<div class="flex-shrink-0 w-10 h-10">
				<img class="w-10 h-10 rounded-full" src={rowData[cellSchema.avartar || '']} alt="" />
			</div>
			<div class="ml-4">
				<div class="text-sm font-medium leading-5 text-gray-500">
					{rowData[cellSchema.text || '']}
				</div>
				{#if cellSchema.type !== 'avartar-text'}
					<div class="text-sm leading-5 text-gray-600">
						{rowData[cellSchema.subText || '']}
					</div>
				{/if}
			</div>
		</div>
	</td>
{:else if cellSchema.type === 'mainText-subText'}
	<td class="px-6 py-4 whitespace-no-wrap border-b border-comet">
		<div class="grid grid-cols-1">
			<p class="text-sm font-medium leading-5 text-gray-500">
				{rowData[cellSchema.text || '']}
			</p>
			{#if cellSchema.subText && rowData[cellSchema.subText]}
				<p class="text-sm leading-5 text-gray-600">
					{rowData[cellSchema.subText || '']}
				</p>
			{/if}
		</div>
	</td>
{:else if cellSchema.type === 'chip'}
	<td class="px-6 py-4 whitespace-no-wrap border-b border-comet">
		<span
			class="inline-flex px-2 text-xs font-semibold leading-5 uppercase
      rounded-full {rowData[cellSchema.text || ''] === 'PART'
				? 'text-red-800 bg-red-500'
				: 'text-green-800 bg-green-500'}
      {cellSchema.class}"
		>
			{rowData[cellSchema.text || '']}
		</span>
	</td>
{:else if cellSchema.type === 'actions' && cellSchema.actions}
	<slot name="action">
		<td
			class="px-6 py-4 inline-flex items-center text-sm leading-5 text-gray-500 whitespace-no-wrap "
		>
			{#each cellSchema.actions as action}
				{#if action === 'view'}
					<a href="{$page.url.toString()}/view/{rowData.key}" class="mx-2">
						<svelte:component this={ViewIcon} />
					</a>
				{:else if action === 'edit'}
					<a href="{$page.url.toString()}/edit/{rowData.key}" class="mx-2">
						<svelte:component this={EditIcon} />
					</a>
				{:else if action === 'delete'}
					<form action="{$page.url.pathname}?/delete" method="post">
						<input type="text" name="key" value={rowData.key} class="sr-only" />
						<button type="submit" class="mx-2">
							<svelte:component this={DeleteIcon} />
						</button>
					</form>
				{/if}
				<!-- <a href="{$page.url.toString()}/{rowData.key}">
				<svelte:component this={MoreIcon} />
			</a> -->
			{/each}
		</td>
	</slot>
{:else}
	<td
		class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b
    border-comet {cellSchema.class}"
	>
		{rowData[cellSchema.text || '']}
	</td>
{/if}
