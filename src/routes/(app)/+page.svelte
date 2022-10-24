<script lang="ts">
	import type { PageData } from './$types';
	import { getUser } from 'lucia-sveltekit/client';
	import { useRef } from 'gridjs';
	export let data: PageData;

	const user = getUser();

	let lecturers = 0;
	let courses = 0;
	let programmes = 0;

	$: {
		({ lecturers, courses, programmes } = data.stats);
	}
</script>

<!-- app bar -->
<h1 class="text-xl font-semibold font-poppins">Dashboard</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4 w-full">
	<!-- manage user accounts -->
	{#if user?.role === 'admin'}
		<a href="/accounts">
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
					<h2 class="font-semibold">Manage User accounts</h2>
					<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
				</div>
			</div>
		</a>
	{/if}

	<!-- view allocations -->
	<a href="/allocations">
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
				<h2 class="font-semibold">View Course Allocation</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
			</div>
		</div>
	</a>

	<!-- view schedules -->
	{#if user?.role === 'admin'}
		<a href="/schedules">
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
					<h2 class="font-semibold">View Schedules</h2>
					<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
				</div>
			</div>
		</a>
	{/if}

	<!-- all lecturers stats -->
	{#if user?.role === 'admin'}
		<a href="/lecturers">
			<div class="flex items-center p-4 rounded-xl shadow-lg bg-white">
				<!-- lecturer stats -->

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
					<h2 class="font-semibold">All Lectures: {lecturers}</h2>
					<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
				</div>
			</div>
		</a>
	{:else}
		<!-- lecturer profile -->
		<a href="/profile">
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
					<h2 class="font-semibold">View Profile</h2>
					<!-- <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p> -->
				</div>
			</div>
		</a>
	{/if}

	<!-- course stats -->
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
				<h2 class="font-semibold">All Courses: {courses}</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>

	<!-- programmes stats -->
	<a href="/programmes">
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
				<h2 class="font-semibold">All Programmes: {programmes}</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>
</div>
