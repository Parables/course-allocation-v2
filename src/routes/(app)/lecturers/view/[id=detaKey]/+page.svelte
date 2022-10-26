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
	<div class="flex flex-col w-full h-full">
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center w-full ">
				<a href="/lecturers" class="mr-4 text-purple-500 border border-purple-500 rounded ">
					{@html backIcon}
				</a>
				<h1 class="text-2xl font-bold font-poppins">Lecturer's Profile</h1>
			</div>
			<!-- print button -->
			<a href="/profile/{lecturer.key}">
				<Button classNames="w-auto inline-flex items-center gap-x-2">{@html printIcon} Print</Button
				>
			</a>
		</div>

		<div class="flex-1 mb-10 overflow-y-hidden">
			<div
				class="grid w-full h-full grid-cols-1 py-10 overflow-y-auto print:grid-cols-1 print:overflow-hidden md:grid-cols-12 gap-y-10 gap-x-2 md:overflow-hidden"
			>
				<!-- Profile -->

				<ul
					class="grid w-full grid-cols-1 col-span-3 px-6 gap-y-5 print:overflow-hidden gap-x-4 md:overflow-y-auto"
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
						<a href="/lecturers/edit/{$page.params.id}">
							<Button classNames="w-8/12">Edit Profile</Button>
						</a>
					</li>

					<li class="print:hidden">
						<form action="?/lecturers" method="POST" use:enhance>
							<Button
								classNames=" w-8/12 border-2 border-red-500 bg-transparent text-red-500 hover:ring-red-500 focus:ring-red-500"
								>Delete Profile</Button
							>
						</form>
					</li>
				</ul>

				<div
					class="grid w-full h-full grid-cols-1 col-span-8 px-10 overflow-x-hidden overflow-y-auto gap-y-16"
				>
					<!-- assigned courses lecturers -->
					<div>
						<a
							href="/lecturers/edit/{lecturer.key}"
							class="flex items-center w-full py-4 text-base font-semibold text-center uppercase gap-x-5 link link-hover"
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
							href="/schedules/{lecturer.key}"
							class="flex items-center w-full py-4 text-base font-semibold text-center uppercase gap-x-5 link link-hover"
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
