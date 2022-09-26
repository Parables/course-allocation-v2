<script>
	import { navigating } from '$app/stores';
	export let show = true;
</script>

{#if show && $navigating}
	<div class="grid w-full h-full place-items-center">
		<div>
			<progress class="w-11/12 mx-auto progress" />
			<p class="mt-5 text-lg font-semibold text-center">Fetching data... Please wait</p>
		</div>
	</div>
{:else}
	<slot />
{/if}
