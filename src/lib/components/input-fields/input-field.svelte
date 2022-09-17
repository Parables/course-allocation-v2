<script lang="ts">
	import type { SvelteComponentDev } from 'svelte/internal';
	import type { Autocomplete } from '.';

	export let type: string = 'text';
	export let id: string;
	export let name: string;
	export let label: string;
	export let list: string | undefined = undefined;
	export let errorText: string | undefined = undefined;
	export let initial: string | undefined = '';
	export let value: string | undefined = initial;
	export let placeholder: string = 'Placeholder';
	export let classNames: string = 'w-full';
	export let required: boolean = false;
	export let autocomplete: Autocomplete = 'off';
	export let prefixIcon: SvelteComponentDev | string | undefined = undefined;
	export let sufixIcon: SvelteComponentDev | string | undefined = undefined;
</script>

<!-- input -->
<div
	class="flex items-center w-full selection:bg-[#3E3859] selection:text-white mb-10 {classNames}"
>
	{#if prefixIcon}
		<svelte:component this={prefixIcon} class="w-4 h-4" />
	{/if}
	<span class="relative w-full">
		<input
			{id}
			{name}
			{label}
			{type}
			{placeholder}
			{autocomplete}
			{required}
			{list}
			value={initial}
			class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-[#3E3859]"
			on:input={(e) => {
				value = e.currentTarget.value;
			}}
		/>
		<label
			for={id}
			class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
			>{label}</label
		>
	</span>
	{#if sufixIcon}
		<svelte:component this={sufixIcon} class="w-4 h-4" />
	{/if}
</div>
{#if errorText}
	<p class="text-sm text-red-500 font-medium">{errorText}</p>
{/if}
<!-- content here -->
