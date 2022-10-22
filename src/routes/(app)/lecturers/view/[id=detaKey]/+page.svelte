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

	$: {
		({ lecturer } = data);
	}

	const columnsQualifications: UserConfig['columns'] = [
		{ id: 'university', name: 'University' },
		{ id: 'programme', name: 'Programme' },
		{ id: 'certificate', name: 'Certification' },
		{ id: 'startDate', name: 'Enrooled On' },
		{ id: 'endDate', name: 'Graduated On' }
	];

	const columnsCourses: UserConfig['columns'] = [
		{ id: 'title', name: 'Title' },
		{ id: 'code', name: 'Course Code' },
		{ id: 'creditHours', name: 'Credit Hours' },
		{ id: 'contactHours', name: 'Contact Hours' },
		{ id: 'profile', name: 'Profile' },
		{ id: 'session', name: 'Session' },
		{ id: 'studentCount', name: 'Student Count' }
	];

	const serverCourses: ServerStorageOptions = {
		url: `${$page.url.origin}/api/lecturers/${$page.params.id}/courses`,
		then: (data: CourseType[]) => {
			return data.map((c) => {
				return [
					c.key,
					c.title?.toUpperCase(),
					c.code?.toUpperCase(),
					suffixWith(c.creditHours, 'Hour', 'Hours'),
					suffixWith(c.contactHours, 'Hour', 'Hours'),
					c.profile?.toUpperCase(),
					c.session?.toUpperCase(),
					suffixWith(c.studentCount, 'Student', 'Students')
				];
			});
		}
	};
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
{#if user?.role === 'admin'}
	<div class="w-full h-full flex flex-col">
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center w-full ">
				<a href="/lecturers" class=" rounded border-purple-500 text-purple-500 border mr-4">
					{@html backIcon}
				</a>
				<h1 class="font-poppins text-2xl font-bold">Lecturer's Profile</h1>
			</div>
			<!-- print button -->
			<a href="{$page.url.toString()}/print">
				<Button classNames="w-auto inline-flex items-center gap-x-2">{@html printIcon} Print</Button
				>
			</a>
		</div>

		<div id="html2pdf" bind:this={printEl} class="overflow-y-hidden flex-1 mb-10">
			<div
				class="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-2  h-full w-full py-10 overflow-y-auto md:overflow-hidden"
			>
				<!-- Profile -->

				<ul class="grid grid-cols-1 col-span-3 gap-y-5 w-full  gap-x-4 px-6 md:overflow-y-auto">
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
						<a href="/lecturers/edit/{$page.params.id}">
							<Button classNames="w-8/12">Edit Profile</Button>
						</a>
					</li>

					<li>
						<form action="?/lecturers" method="POST" use:enhance>
							<Button
								classNames=" w-8/12 border-2 border-red-500 bg-transparent text-red-500 hover:ring-red-500 focus:ring-red-500"
								>Delete Profile</Button
							>
						</form>
					</li>
				</ul>

				<div
					class="w-full h-full grid grid-cols-1 gap-y-16 col-span-8 px-10 overflow-y-auto overflow-x-hidden"
				>
					<!-- assigned courses lecturers -->
					<div>
						<a
							href="/lecturers/edit/{lecturer.key}"
							class="py-4 text-base font-semibold text-center uppercase flex w-full items-center gap-x-5 link link-hover"
							>Lecturer's Qualifications {@html editIcon}</a
						>
						<Grid
							columns={columnsQualifications}
							data={Object.values(lecturer.qualifications ?? {})}
							sort
							search={{ ignoreHiddenColumns: false }}
							pagination={{ enabled: true, limit: 10 }}
							fixedHeader
							resizable
							className={{
								table: 'table-auto whitespace-nowrap ',
								td: 'whitespace-nowrap ',
								tr: 'hover:cursor-pointer'
							}}
						/>
					</div>

					<div>
						<a
							href="/schedules?lecturer={lecturer.key}"
							class="py-4 text-base font-semibold text-center uppercase flex w-full items-center gap-x-5 link link-hover"
							>Assigned Courses {@html editIcon}</a
						>
						<Grid
							columns={columnsCourses}
							server={serverCourses}
							sort
							search={{ ignoreHiddenColumns: false }}
							pagination={{ enabled: true, limit: 10 }}
							fixedHeader
							resizable
							className={{
								table: 'table-auto whitespace-nowrap ',
								td: 'whitespace-nowrap ',
								tr: 'hover:cursor-pointer'
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else if user?.role === 'lecturer'}
	<p>Sorry page is not ready</p>
{:else}
	<p>I don't know you... get off</p>
{/if}
