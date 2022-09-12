<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let lecturerCount = 0;
	let courseCount = 0;

	$: {
		({ lecturerCount, courseCount } = data);
	}
</script>

<!-- app bar -->
<h1 class="text-xl font-semibold font-poppins">Dashboard</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4 w-full">
	<a href="/lecturers">
		<div class="flex items-center p-4 rounded-xl shadow-lg bg-white">
			<div
				class="flex items-center justify-center bg-orange-50 h-12 w-12 rounded-full border border-orange-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-orange-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			</div>

			<div class="ml-4">
				<h2 class="font-semibold">{lecturerCount} Lectures</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
			</div>
		</div>
	</a>

	<a href="/courses">
		<div class="flex items-center p-4 rounded-xl shadow-lg bg-white">
			<div
				class="flex items-center justify-center bg-indigo-50 h-12 w-12 rounded-full border border-indigo-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-indigo-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
					/>
				</svg>
			</div>

			<div class="ml-4">
				<h2 class="font-semibold">{courseCount} Courses</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>
</div>
