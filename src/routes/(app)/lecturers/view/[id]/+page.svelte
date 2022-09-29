<script lang="ts">
	import EasyToast from '$lib/components/easy-toast.svelte';
	import Button from '$lib/components/button.svelte';
	import Grid from 'gridjs-svelte';
	import type { UserConfig } from 'gridjs';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import type { PageData } from './$types';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { CourseType } from '$lib/data/types/course';
	import { suffixWith } from '$lib/utils';

	export let data: PageData;

	let lecturer: typeof data.lecturer;
	let courses: typeof data.courses;
	// TODO: Use alaSQL to select * courses where course.lecturer = lecturer.key

	$: {
		({ lecturer, courses } = data);
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

<div class="w-full h-full flex flex-col">
	<div class="flex w-full items-center ">
		<a href="/lecturers" class=" rounded border-purple-500 text-purple-500 border mr-4">
			{@html backIcon}
		</a>
		<h1 class="font-poppins text-2xl font-bold">Lecturer's Profile</h1>
	</div>

	<div class="overflow-y-hidden flex-1 mb-10">
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
						src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
					<p class="uppercase text-sm text-gray-500 font-medium">Gender/p></p>
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
					<p class="py-4 text-base font-semibold text-center uppercase">
						Lecturer's Qualifications
					</p>
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
					<p class="py-4 text-base font-semibold text-center uppercase">Assigned Courses</p>
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
