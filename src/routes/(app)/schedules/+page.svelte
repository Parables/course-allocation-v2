<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import EassyToast from '$lib/components/easy-toast.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import downloadIcon from '$lib/assets/icons/download-cloud.svg?raw';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import alasql from 'alasql';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	export let form: any;

	let allLecturers: typeof data.allLecturers = [];
	let allCourses: typeof data.allCourses = [];
	let unassignedCourses: typeof data.unassignedCourses = [];
	let assignedCourses: typeof data.unassignedCourses = [];

	let selectedLecturer: string;
	let addCourses: string[] = [];
	let removeCourses: string[] = [];

	$: {
		({ allLecturers, allCourses, unassignedCourses } = data);
	}

	$: {
		selectedLecturer = $page.url.searchParams.get('lecturer') ?? allLecturers[0].key;
		if (browser) {
			document
				.getElementById(`lecturer-${selectedLecturer}`)
				?.scrollTo({ top: 60, behavior: 'smooth' });
		}
		assignedCourses = alasql('SELECT * FROM ? WHERE lecturer = ? ', [allCourses, selectedLecturer]);
	}
</script>

<div class="flex items-center justify-between w-full">
	<div class="flex items-center w-full ">
		<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
			{@html backIcon}
		</a>
		<h1 class="text-2xl font-bold font-poppins">Course Schedules</h1>
	</div>

	<a href="api/schedules/">
		<Button classNames="w-auto inline-flex items-center gap-x-2"
			>{@html downloadIcon} Export To EXcel</Button
		>
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
				<a href="/lecturers/new" class="h-full grid place-items-center w-full">Create Lecturer</a>
			{/each}
		</ul>
	</div>

	<!-- assigned courses lecturers -->
	<div class="relative flex flex-col w-full h-full overflow-hidden">
		<p class="my-5 font-semibold text-center uppercase">Assign Courses</p>

		<div class="flex items-stretch w-full h-full overflow-hidden justify-evenly">
			<!-- unassigned courses -->
			<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
				<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">
					Unassigned Courses
				</p>

				<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
					{#each unassignedCourses as course, i}
						<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
							<label
								for={`addCourse-${course.key}`}
								class="flex items-center w-full px-5 py-3 cursor-pointer"
							>
								<input
									type="checkbox"
									class="checkbox checkbox-primary"
									name="addCourses"
									form="addCourseForm"
									value={course.key}
									bind:group={addCourses}
									id={`addCourse-${course.key}`}
								/>
								<div class="inline-flex flex-col w-full ml-4">
									<p>{course.title}</p>
									<p class="text-sm text-gray-400">{course.code}</p>
								</div>
							</label>
						</li>
					{/each}
				</ul>

				<form
					id="addCourseForm"
					action="?/addCourses&redirectTo=/schedules?lecturer={selectedLecturer}"
					method="POST"
					use:enhance
				>
					<input
						type="text"
						name="lecturer"
						id="lecturer"
						value={selectedLecturer}
						class="sr-only"
					/>
					<Button>Assign Courses</Button>
				</form>
			</div>

			<div class="w-2 h-full bg-gray-500" />

			<!-- selected courses -->
			<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
				<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">Assigned Courses</p>

				<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
					{#each assignedCourses as course, i}
						<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
							<label
								for={`removed-${course.key}`}
								class="flex items-center w-full px-5 py-3 cursor-pointer"
							>
								<input
									type="checkbox"
									class="checkbox checkbox-primary"
									name="removeCourses"
									form="removeCoursesForm"
									value={course.key}
									bind:group={removeCourses}
									id={`removed-${course.key}`}
								/>
								<div class="inline-flex flex-col w-full ml-4">
									<p>{course.title}</p>
									<p class="text-sm text-gray-400">{course.code}</p>
								</div>
							</label>
						</li>
					{/each}
				</ul>
				<form
					id="removeCoursesForm"
					action="?/removeCourses&redirectTo=/schedules?lecturer={selectedLecturer}"
					method="POST"
					use:enhance
				>
					<input
						type="text"
						name="lecturer"
						id="lecturer"
						value={selectedLecturer}
						class="sr-only"
					/>
					<Button>Remove Courses</Button>
				</form>
			</div>
		</div>

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
