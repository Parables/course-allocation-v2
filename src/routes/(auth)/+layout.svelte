<script lang="ts">
	import presentationImage from '$lib/assets/illustrations/presentation.svg?raw';
</script>

<div class="w-full h-full flex flex-row items-stretch  bg-[#3E3859] p-5 md:p-0">
	<div class="hidden place-items-center w-full md:grid">
		{@html presentationImage}
	</div>
	<div class="grid place-items-center w-full bg-white rounded-lg wrapper md:w-2/5 md:rounded-none">
		<!-- content -->
		<main class="flex flex-col w-[70%] md:w-[60%]">
			<slot />
		</main>
	</div>
</div>
