<script lang="ts">
	import type { SvelteComponentDev } from 'svelte/internal';

	export let name: string;
	export let value: string | undefined = undefined;
	export let placeholder: string;
	export let classNames: string = '';
	export let options: Record<string, string> = {};
</script>

<!-- input -->
<div
	class="mt-[23px] py-2 px-1 w-full md:w-[295.53px] border-b border-[#E2E4E5] flex flex-row items-center {classNames}"
>
	<slot />
	<select
		{name}
		bind:value
		class="ml-3 appearance-none outline-none w-full bg-transparent font-roboto font-normal text-sm text-[#242426]"
		{placeholder}
	>
		<option class="font-roboto font-normal text-sm text-[#242426]" disabled
			>Select {placeholder}</option
		>
		{#each Object.entries(options) as [key, value], i (key)}
			<option class="font-roboto font-normal text-sm text-[#242426]" {value}>{key}</option>
		{/each}
	</select>
</div>
