<script lang="ts">
	import type { SvelteComponentDev } from 'svelte/internal';
	import type { Autocomplete } from '.';

	export let type: string = 'text';
	export let id: string;
	export let name: string;
	export let label: string;
	export let errorText: string | undefined = undefined;
	export let initial: string | undefined = '';
	export let value: any = initial;
	export let placeholder: string = 'Placeholder';
	export let classNames: string = 'w-full';
	export let required: boolean = false;
	export let autocomplete: Autocomplete = 'off';
	export let prefixIcon: any = undefined;
	export let sufixIcon: any = undefined;
</script>

<!-- input -->
<div class="flex items-center w-full selection:bg-[#3E3859] selection:text-white mt-3 {classNames}">
	{#if prefixIcon}
		<svelte:component this={prefixIcon} class="w-4 h-4" />
	{/if}
	<span class="relative w-full">
		<slot>
			<input
				{id}
				{name}
				{label}
				{type}
				{placeholder}
				{autocomplete}
				{required}
				{...$$restProps}
				value={initial}
				class="peer w-full placeholder-transparent input-bordered input input-md ${$$restProps.class}"
				on:input={(e) => {
					value = e.currentTarget.value;
				}}
			/>
		</slot>
		<label
			for={id}
			class="absolute left-3 -top-3.5 px-2 bg-white  text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
