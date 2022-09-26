<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import EassyToast from '$lib/components/easy-toast.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import downloadIcon from '$lib/assets/icons/download-cloud.svg?raw';
	import type { PageData } from './$types';
	import { navigating, page } from '$app/stores';
	import alasql from 'alasql';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import NavigatingIndicator from '$lib/components/navigating-indicator.svelte';

	export let data: PageData;
	export let form: any;

	let allLecturers: typeof data.allLecturers = [];
	let allCourses: typeof data.allCourses = [];
	let unassignedCourses: typeof data.unassignedCourses = [];
	let assignedCourses: typeof data.unassignedCourses = [];

	let selectedLecturer: string;
	let goingAway = false;

	$: {
		({ allLecturers, selectedLecturer, allCourses, unassignedCourses, assignedCourses } = data);
	}

	$: {
		if (browser) {
			document
				.getElementById(`lecturer-${selectedLecturer}`)
				?.scrollTo({ top: 60, behavior: 'smooth' });
		}
	}

	$: goingAway = $navigating?.to?.routeId !== '(app)/schedules';
</script>

<div class="flex items-center justify-between w-full">
	<div class="flex items-center w-full ">
		<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
			{@html backIcon}
		</a>
		<h1 class="text-2xl font-bold font-poppins">Course Schedules</h1>
	</div>

	<a href="api/schedules/">
		<Button classNames="inline-flex w-max items-center gap-x-2"
			>{@html downloadIcon}
			<p class="text-center">Export To Excel</p>
		</Button>
	</a>
</div>

<div class="flex items-stretch w-full h-full gap-5 pb-10 overflow-hidden">
	<!-- all lecturers -->
	<div class="flex flex-col w-2/5 h-full overflow-hidden ">
		<p class="my-5 font-semibold text-center uppercase">Select a Lecturer</p>
		<ul class="flex flex-col w-full h-full gap-5 px-10 pb-10 overflow-y-auto">
			{#each allLecturers as lecturer, i (lecturer.key)}
				<li id="lecturer-{lecturer.key}">
					<a
						href="/schedules?lecturer={lecturer.key}"
						class="w-full group flex flex-col  px-5 py-3 bg-white border-2 rounded-lg group-hover:border-purple-500 border-gray-50 {selectedLecturer?.includes(
							lecturer.key
						)
							? 'active-lecturer'
							: ''}"
					>
						<p>{lecturer.fullName}</p>
						<p class="text-sm">{lecturer.email}</p>
						<p class="text-sm">{lecturer.phoneNumber}</p>
					</a>
				</li>
			{:else}
				<a href="/lecturers/new" class="grid w-full h-full place-items-center">Create Lecturer</a>
			{/each}
		</ul>
	</div>

	<!-- assigned courses lecturers -->
	<div class="relative flex flex-col w-full h-full overflow-hidden">
		<p class="my-5 font-semibold text-center uppercase">Assign Courses</p>

		<NavigatingIndicator show={!goingAway}>
			<div class="flex items-stretch w-full h-full overflow-hidden justify-evenly">
				<!-- unassigned courses -->
				<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
					<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">
						Unassigned Courses
					</p>

					<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
						{#each unassignedCourses as course, i (`add-course-key-${course.key}`)}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label
									for={`add-course-input-${course.key}`}
									class="flex items-center w-full px-5 py-3 cursor-pointer"
								>
									<input
										id={`add-course-input-${course.key}`}
										name="courses"
										form="add-course-form"
										value={course.key}
										type="checkbox"
										class="checkbox checkbox-primary"
									/>
									<div class="inline-flex flex-col w-full ml-4">
										<p>{course.title}</p>
										<p class="text-sm text-gray-400">{course.code}</p>
									</div>
								</label>
							</li>
						{/each}
					</ul>

					<form id="add-course-form" method="POST" use:enhance>
						<input
							type="text"
							name="lecturer"
							id="lecturer"
							value={selectedLecturer}
							class="sr-only"
						/>
						<Button classNames="my-3">Assign Courses</Button>
					</form>
				</div>

				<div class="w-2 h-full bg-gray-500" />

				<!-- selected courses -->
				<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
					<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">
						Assigned Courses
					</p>

					<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
						{#each assignedCourses as course, i (`remove-course-key-${course.key}`)}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label
									for={`remove-course-input-${course.key}`}
									class="flex items-center w-full px-5 py-3 cursor-pointer"
								>
									<input
										id={`remove-course-input-${course.key}`}
										name="courses"
										form="remove-courses-form"
										value={course.key}
										type="checkbox"
										class="checkbox checkbox-primary"
									/>
									<div class="inline-flex flex-col w-full ml-4">
										<p>{course.title}</p>
										<p class="text-sm text-gray-400">{course.code}</p>
									</div>
								</label>
							</li>
						{/each}
					</ul>
					<form id="remove-courses-form" method="POST" use:enhance>
						<!-- no input for the selectedLecturer unsets the selectedLecturer from these courses -->
						<Button classNames="my-3">Remove Courses</Button>
					</form>
				</div>
			</div>
		</NavigatingIndicator>

		{#if form?.error}
			<EassyToast
				show={true}
				message={form.error?.message ?? 'Something went wrong'}
				type="error"
			/>
		{/if}

		{#if form?.success}
			<EassyToast
				show={true}
				message={form.success?.message ?? 'Updated successfully	'}
				type="success"
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
	.active-lecturer {
		@apply shadow-lg bg-purple-500 text-white;
	}
</style>
