<script lang="ts">
	import Button from '$lib/components/button.svelte';

	import { page } from '$app/stores';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import printIcon from '$lib/assets/icons/printer.svg?raw';
	import type { PageData } from './$types';
	import { getUser } from 'lucia-sveltekit/client';

	export let data: PageData;

	const user = getUser();

	let lecturer: typeof data.lecturer;
	let assignedCourses: typeof data.assignedCourses;

	$: {
		({ lecturer, assignedCourses } = data);
	}
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex items-center justify-between w-full print:hidden">
		<div class="flex items-center w-full ">
			<a
				href={user?.lecturerKey ? '/' : `/lecturers/view/${$page.params.id}`}
				class="mr-4 text-purple-500 border border-purple-500 rounded "
			>
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Lecturer's Profile</h1>
		</div>
		<!-- print button -->
		<!-- <a href="{$page.url.toString()}/print"> -->
		<Button on:click={() => window.print()} classNames="w-auto inline-flex items-center gap-x-2"
			>{@html printIcon} Print</Button
		>
		<!-- </a> -->
	</div>

	<div class="flex-1 mb-10 overflow-y-auto md:overflow-y-hidden">
		<div
			class="grid w-full grid-cols-1 py-10 overflow-y-auto md:grid-cols-3 print:grid-cols-1 gap-y-10 gap-x-2 md:overflow-hidden print:overflow-hidden"
		>
			<!-- Profile -->

			<ul
				class="grid w-full grid-cols-1 px-6 gap-y-5 gap-x-4 md:overflow-y-auto print:overflow-hidden"
			>
				<li>
					<h3 class="text-base font-semibold text-gray-400 uppercase">Lecturers Profile</h3>
				</li>

				<li class="mb-2">
					<img
						class="object-cover rounded-md w-36 h-36 ring-4 ring-purple-300 ring-offset-4"
						src="{$page.url.origin}/api/drives/photos/lecturers%2F{lecturer.key}.png"
						alt="Extra large avatar"
					/>
				</li>

				<li>
					<p class="text-sm font-medium text-gray-500 uppercase">Staff ID</p>
					<p class="mb-4 text-base">{lecturer.staffID ?? 'N/A'}</p>
				</li>

				<li>
					<p class="text-sm font-medium text-gray-500 uppercase">Full Name</p>
					<p class="mb-4 text-base">{lecturer.fullName}</p>
				</li>

				<li>
					<p class="text-sm font-medium text-gray-500 uppercase">Gender</p>
					<p class="mb-4 text-base">{lecturer.gender}</p>
				</li>

				<li>
					<p class="text-sm font-medium text-gray-500 uppercase">Email</p>
					<p class="mb-4 text-base">{lecturer?.email}</p>
				</li>

				<li>
					<p class="text-sm font-medium text-gray-500 uppercase">Phone Number</p>
					<p class="mb-4 text-base">{lecturer.phoneNumber}</p>
				</li>

				<li class="print:hidden">
					<a href="/lecturers/edit/{lecturer.key}">
						<Button classNames="w-8/12">Edit Profile</Button>
					</a>
				</li>
			</ul>

			<div
				class="flex flex-col px-10 overflow-hidden md:col-span-2 md:overflow-y-auto print:overflow-hidden"
			>
				<!-- assigned courses lecturers -->

				<a
					href="/schedules?lecturer={lecturer.key}"
					class="flex items-center w-full py-4 text-base font-semibold text-center uppercase print:hidden gap-x-5 link link-hover"
					>Assigned Courses {@html editIcon}</a
				>

				<ul
					class="grid w-full grid-cols-1 px-6 gap-y-5 gap-x-4 md:overflow-y-auto print:overflow-hidden"
				>
					{#each assignedCourses as course}
						<li class="grid grid-cols-1 border-b-2 md:border-b-0 md:grid-cols-12 gap-x-4">
							<div class="col-span-6">
								<p class="text-sm font-medium text-gray-500 uppercase">Course Title</p>
								<p class="mb-4 text-base">{course.title ?? 'N/A'}</p>
							</div>

							<div class="col-span-6">
								<p class="text-sm font-medium text-gray-500 uppercase ">Course Code</p>
								<p class="mb-4 text-base">{course.code ?? 'N/A'}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
