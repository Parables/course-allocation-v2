<script lang="ts">
	import EasyToast from '$lib/components/easy-toast.svelte';
	import Button from '$lib/components/button.svelte';
	import Grid from 'gridjs-svelte';
	import type { UserConfig } from 'gridjs';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import printIcon from '$lib/assets/icons/printer.svg?raw';
	import type { PageData } from './$types';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { CourseType } from '$lib/data/types/course';
	import { suffixWith } from '$lib/utils';
	import { escape } from 'svelte/internal';

	import { getUser } from 'lucia-sveltekit/client';

	const user = getUser();

	export let data: PageData;

	let lecturer: typeof data.lecturer;
	let assignedCourses: typeof data.assignedCourses;

	$: {
		({ lecturer, assignedCourses } = data);
	}

	let printEl: HTMLDivElement | undefined;

	// const handlePrint = () => {
	// 	// html2pdf(printEl);
	// };
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
		integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
</svelte:head>
<div class="w-full h-full flex flex-col">
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center w-full ">
			<a href="/" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Lecturer's Profile</h1>
		</div>
		<!-- print button -->
		<a href="{$page.url.toString()}/print">
			<Button classNames="w-auto inline-flex items-center gap-x-2">{@html printIcon} Print</Button>
		</a>
	</div>

	<div id="html2pdf" bind:this={printEl} class="overflow-y-hidden flex-1 mb-10">
		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-2  h-full w-full py-10 overflow-y-auto md:overflow-hidden"
		>
			<!-- Profile -->

			<ul class="grid grid-cols-1 gap-y-5 w-full  gap-x-4 px-6 md:overflow-y-auto">
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

				<li>
					<a href="/lecturers/edit/{lecturer.key}">
						<Button classNames="w-8/12">Edit Profile</Button>
					</a>
				</li>
			</ul>

			<div class="w-full h-full grid grid-cols-1 gap-y-16  px-10 overflow-y-auto overflow-x-hidden">
				<!-- assigned courses lecturers -->

				<div>
					<a
						href="/schedules?lecturer={lecturer.key}"
						class="py-4 text-base font-semibold text-center uppercase flex w-full items-center gap-x-5 link link-hover"
						>Assigned Courses {@html editIcon}</a
					>

					<ul>
						{#each assignedCourses as course}
							<li class="border-0 border-b-2">
								<p>Course Title: {course.title}</p>
								<p class="">Course Code:{course.code}</p>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
