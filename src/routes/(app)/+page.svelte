<script lang="ts">
	import type { PageData } from './$types';
	import { getUser, signOut } from 'lucia-sveltekit/client';
	import { useRef } from 'gridjs';
	export let data: PageData;
	import HomeIcon from '$lib/assets/icons/home.svg';
	import AccountIcon from '$lib/assets/icons/shield.svg';
	import UserIcon from '$lib/assets/icons/user.svg';
	import LecturerIcon from '$lib/assets/icons/users.svg';
	import ProgrammeIcon from '$lib/assets/icons/grid.svg';
	import CourseIcon from '$lib/assets/icons/airplay.svg';
	import ScheduleIcon from '$lib/assets/icons/calendar.svg';
	import SettingIcon from '$lib/assets/icons/settings.svg';
	import LogoutIcon from '$lib/assets/icons/log-out.svg';
	import AllocationIcon from '$lib/assets/icons/user-check.svg';
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

<div class="grid w-full grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	<!-- manage user accounts -->
	{#if user?.role === 'admin'}
		<a href="/accounts">
			<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
				<div
					class="flex items-center justify-center w-12 h-12 border border-green-100 rounded-full bg-green-50"
				>
					<AccountIcon class="text-green-400" />
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
		<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
			<div
				class="flex items-center justify-center w-12 h-12 border border-purple-100 rounded-full bg-purple-50"
			>
				<AllocationIcon class="text-purple-400" />
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
			<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
				<div
					class="flex items-center justify-center w-12 h-12 border rounded-full border-amber-100 bg-amber-50"
				>
					<ScheduleIcon class="text-amber-400" />
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
			<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
				<!-- lecturer stats -->

				<div
					class="flex items-center justify-center w-12 h-12 border border-orange-100 rounded-full bg-orange-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6 text-orange-400"
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
		<a href="/profile/{user?.lecturerKey}">
			<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
				<div
					class="flex items-center justify-center w-12 h-12 border rounded-full border-rose-100 bg-rose-50"
				>
					<UserIcon class="text-rose-400" />
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
		<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
			<div
				class="flex items-center justify-center w-12 h-12 border border-green-100 rounded-full bg-green-50"
			>
				<CourseIcon class="text-green-400" />
			</div>

			<div class="ml-4">
				<h2 class="font-semibold">All Courses: {courses}</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>

	<!-- programmes stats -->
	<a href="/programmes">
		<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
			<div
				class="flex items-center justify-center w-12 h-12 border border-blue-100 rounded-full bg-blue-50"
			>
				<ProgrammeIcon class="text-blue-400" />
			</div>

			<div class="ml-4">
				<h2 class="font-semibold">All Programmes: {programmes}</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>

	<!-- logout -->
	<a href="/logout" on:click|preventDefault={() => signOut('/login')}>
		<div class="flex items-center p-4 bg-white shadow-lg rounded-xl">
			<div
				class="flex items-center justify-center w-12 h-12 border border-red-100 rounded-full bg-red-50"
			>
				<LogoutIcon class="text-red-400" />
			</div>

			<div class="ml-4">
				<h2 class="font-semibold">Logout</h2>
				<!-- <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p> -->
			</div>
		</div>
	</a>
</div>
