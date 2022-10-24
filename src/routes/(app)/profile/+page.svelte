<script lang="ts">
	import Button from '$lib/components/button.svelte';

	import { page } from '$app/stores';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import printIcon from '$lib/assets/icons/printer.svg?raw';
	import type { PageData } from './$types';

	export let data: PageData;

	let lecturer: typeof data.lecturer;
	let assignedCourses: typeof data.assignedCourses;

	$: {
		({ lecturer, assignedCourses } = data);
	}
</script>

<div class="w-full h-full flex flex-col">
	<div class="flex w-full items-center justify-between print:hidden">
		<div class="flex items-center w-full ">
			<a href="/" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Lecturer's Profile</h1>
		</div>
		<!-- print button -->
		<!-- <a href="{$page.url.toString()}/print"> -->
		<Button on:click={() => window.print()} classNames="w-auto inline-flex items-center gap-x-2"
			>{@html printIcon} Print</Button
		>
		<!-- </a> -->
	</div>

	<div class="overflow-y-hidden flex-1 mb-10">
		<div
			class="flex flex-col md:grid grid-cols-1 md:grid-cols-3 print:grid-cols-1 gap-y-10 gap-x-2  h-full w-full py-10 overflow-y-auto md:overflow-hidden print:overflow-hidden"
		>
			<!-- Profile -->

			<ul
				class="grid grid-cols-1 gap-y-5 w-full  gap-x-4 px-6 md:overflow-y-auto print:overflow-hidden"
			>
				<li>
					<h3 class="font-semibold text-base text-gray-400 uppercase">Lecturers Profile</h3>
				</li>

				<li class="mb-2">
					<img
						class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
						src="{$page.url.origin}/api/drives/photos/lecturers%2F{lecturer.key}.png"
						alt="Extra large avatar"
					/>
				</li>

				<li>
					<p class="uppercase text-sm text-gray-500 font-medium">Staff ID</p>
					<p class="text-base mb-4">{lecturer.staffID ?? 'N/A'}</p>
				</li>

				<li>
					<p class="uppercase text-sm text-gray-500 font-medium">Full Name</p>
					<p class="text-base mb-4">{lecturer.fullName}</p>
				</li>

				<li>
					<p class="uppercase text-sm text-gray-500 font-medium">Gender</p>
					<p class="text-base mb-4">{lecturer.gender}</p>
				</li>

				<li>
					<p class="uppercase text-sm text-gray-500 font-medium">Email</p>
					<p class="text-base mb-4">{lecturer?.email}</p>
				</li>

				<li>
					<p class="uppercase text-sm text-gray-500 font-medium">Phone Number</p>
					<p class="text-base mb-4">{lecturer.phoneNumber}</p>
				</li>

				<li class="print:hidden">
					<a href="/lecturers/edit/{lecturer.key}">
						<Button classNames="w-8/12">Edit Profile</Button>
					</a>
				</li>
			</ul>

			<div
				class="w-full h-full grid grid-cols-1 md:col-span-2 gap-y-16  px-10 md:overflow-y-auto overflow-x-hidden"
			>
				<!-- assigned courses lecturers -->

				<div>
					<a
						href="/schedules?lecturer={lecturer.key}"
						class="print:hidden py-4 text-base font-semibold text-center uppercase flex w-full items-center gap-x-5 link link-hover"
						>Assigned Courses {@html editIcon}</a
					>

					<ul
						class="grid grid-cols-1 gap-y-5 w-full  gap-x-4 px-6 md:overflow-y-auto print:overflow-hidden"
					>
						{#each assignedCourses as course}
							<li class="grid grid-cols-12 gap-x-4">
								<div class="col-span-6">
									<p class="uppercase text-sm text-gray-500 font-medium">Course Title</p>
									<p class="text-base mb-4">{course.title ?? 'N/A'}</p>
								</div>

								<div class="col-span-6">
									<p class="uppercase text-sm text-gray-500 font-medium ">Course Code</p>
									<p class="text-base mb-4">{course.code ?? 'N/A'}</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
