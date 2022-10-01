<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	let lecturer: typeof data.lecturer;

	$: ({ lecturer } = data);
</script>

<div class="w-full h-full grid place-items-center  overflow-hidden">
	<div class="rounded-md w-8/12 shadow-md">
		<!-- header -->
		<div class="flex items-center gap-10">
			<img
				class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
				src="{$page.url.origin}/api/drives/photos/lecturers%2F{lecturer.key}.png"
				alt="Extra large avatar"
			/>

			<div class="flex flex-col w-full">
				<p class="text-4xl font-semibold mb-4">{lecturer.fullName}</p>
			</div>
		</div>
	</div>
</div>
