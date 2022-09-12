<script lang="ts">
	import type { SvelteComponentDev } from 'svelte/internal';
	import type { Autocomplete } from '.';
	import InputField from './input-field.svelte';

	export let id: string;
	export let name: string;
	export let label: string;
	export let value: string | undefined = undefined;
	export let placeholder: string = 'Placeholder';
	export let classNames: string = 'w-full';
	export let required: boolean = false;
	export let autocomplete: Autocomplete = 'off';
	export let prefixIcon: SvelteComponentDev | string | undefined = undefined;
	export let sufixIcon: SvelteComponentDev | string | undefined = undefined;
	export let datePattern: string = 'do MMMM, yyyy';
	export let multiSelect: boolean = false;
</script>

<!-- input -->
<InputField
	type="date"
	{id}
	{name}
	{label}
	bind:value
	{placeholder}
	{classNames}
	{required}
	{autocomplete}
	{prefixIcon}
	{sufixIcon}
/>
