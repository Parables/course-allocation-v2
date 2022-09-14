<script lang="ts">
	import { page } from '$app/stores';
	import HomeIcon from '$lib/assets/icons/home.svg';
	import ChevronForwardIcon from '$lib/assets/icons/chevron-forward.svg';
	let paths: string[] = [];

	$: {
		paths = $page.url.pathname.split('/');
	}
</script>

<div class="bg-white p-4 flex items-center flex-wrap">
	<ul class="flex items-center">
		{#each paths as path, i (path)}
			{#if paths.length > 0 && i === 0}
				<HomeIcon />
			{:else}
				<li class="inline-flex items-center">
					<ChevronForwardIcon />
					<a
						href="{$page.url.origin}{paths.slice(0, i + 1).join('/')}"
						class="text-gray-600 hover:text-blue-500 active:text-blue-500"
					>
						{path}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
