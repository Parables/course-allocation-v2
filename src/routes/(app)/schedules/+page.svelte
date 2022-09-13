<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import EassyToast from '$lib/components/easy-toast.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let form: any;

	let lecturers: any[] = [];
	let courses: any[] = [];
	let assignedCourses: Record<string, any> = {};
	let selectedLecturer: Record<string, any> | null = null;

	let availableCourses: any[] = [];
	let selectedCourses: any[] = [];

	let addCourses: any[] = [];
	let strAddCourses: string;
	let removeCourses: any[] = [];
	let strRemoveCourses: string;

	$: {
		({ lecturers, courses } = data);
	}

	$: {
		if (selectedLecturer) {
			selectedCourses = [];
			assignedCourses = selectedLecturer.assigned_courses ?? {};
			availableCourses = courses.filter((c) => assignedCourses[c.key] === undefined);
			selectedCourses = [...selectedCourses, ...Object.values(assignedCourses)];
		}
	}

	$: {
		if (addCourses) {
			strAddCourses = JSON.stringify(addCourses);
		}
	}

	$: {
		if (removeCourses) {
			strRemoveCourses = JSON.stringify(removeCourses);
		}
	}
</script>

<div class="flex items-center w-full ">
	<a href="/lecturers" class="mr-4 text-purple-500 border border-purple-500 rounded ">
		<BackButton />
	</a>
	<h1 class="text-2xl font-bold font-poppins">Schedules</h1>
</div>

<div class="flex items-stretch w-full h-full gap-5 pb-10 overflow-hidden">
	<!-- all lecturers -->
	<div class="flex flex-col w-2/5 h-full overflow-hidden ">
		<p class="my-5 font-semibold text-center uppercase">Select a Lecturer</p>
		<ul class="flex flex-col w-full h-full gap-5 px-10 pb-10 overflow-y-auto">
			{#each lecturers as lecturer, i (lecturer.key)}
				<li class="w-full group">
					<input
						type="radio"
						name="selectedLecturer"
						id={lecturer.key}
						bind:group={selectedLecturer}
						value={lecturer}
						class="hidden radio peer"
					/>
					<label
						for={lecturer.key}
						class="flex items-center w-full gap-5 bg-white border-2 rounded-lg group-hover:border-purple-500 peer-checked:shadow-lg border-gray-50 peer-checked:bg-purple-500 peer-checked:text-white"
					>
						<div class="border-0 rounded-lg avatar">
							<div class="w-16 rounded-lg ">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								<img src="https://placeimg.com/192/192/people" alt="profile-picture" />
							</div>
						</div>
						{lecturer.full_name}
					</label>
				</li>
			{:else}
				<a href="/lecturers/new">Create Lecturer</a>
			{/each}
		</ul>
	</div>

	<!-- assigned courses lecturers -->
	<div class="relative flex flex-col w-full h-full overflow-hidden">
		<p class="my-5 font-semibold text-center uppercase">Assigned Courses</p>

		{#if selectedLecturer !== null}
			<div class="flex items-stretch w-full h-full overflow-hidden justify-evenly">
				<!-- available courses -->
				<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
					<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">
						Available Courses
					</p>

					<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
						{#each availableCourses as course, i (course.key)}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label for={course.key} class="flex items-center w-full px-5 py-3 cursor-pointer">
									<input
										type="checkbox"
										class="w-4 h-4 mr-4 border border-gray-500 rounded appearance-none checked:bg-purple-500 checked:ring-offset-2 checked:ring-purple-500 checked:ring-2"
										bind:group={addCourses}
										name="assignedCourses"
										value={course}
										id={course.key}
									/>
									{course.course_name}
								</label>
							</li>
						{/each}
					</ul>

					<form action="?/addCourses" method="post">
						<input type="text" name="key" id="key" value={selectedLecturer.key} class="sr-only" />
						<input
							type="text"
							name="addCourses"
							id="addCourses"
							value={strAddCourses}
							class="sr-only"
						/>
						<Button>Assign Courses</Button>
					</form>
				</div>

				<div class="w-2 h-full bg-gray-500" />

				<!-- selected courses -->
				<div class="flex flex-col flex-1 h-full px-10 overflow-hidden">
					<p class="mb-5 text-sm font-medium text-center text-gray-500 uppercase">
						Assigned Courses
					</p>

					<ul class="flex flex-col w-full h-full gap-5 pb-5 overflow-y-auto">
						{#each selectedCourses as course, i (`assigned-${course.key}`)}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label for={course.key} class="flex items-center w-full px-5 py-3 cursor-pointer">
									<input
										type="checkbox"
										class="w-4 h-4 mr-4 border border-gray-500 rounded appearance-none checked:bg-purple-500 checked:ring-offset-2 checked:ring-purple-500 checked:ring-2"
										bind:group={removeCourses}
										name="assignedCourses"
										value={course}
										id={course.key}
									/>
									{course.course_name}
								</label>
							</li>
						{/each}
					</ul>
					<form action="?/removeCourses" method="post">
						<input type="text" name="key" id="key" value={selectedLecturer.key} class="sr-only" />
						<input
							type="text"
							name="removeCourses"
							id="removeCourses"
							value={strRemoveCourses}
							class="sr-only"
						/>
						<Button>Remove Courses</Button>
					</form>
				</div>
			</div>
		{:else}
			<p class="grid w-full h-full place-items-center">
				Select a Lecturer on the left panel to assign courses to
			</p>
		{/if}

		{#if form?.error}
			<EassyToast show={true} message={form.error ?? 'Something went wrong'} type="error" />
		{/if}

		{#if form?.success}
			<EassyToast show={true} message={form.success ?? 'Something went wrong'} type="success" />
		{/if}
	</div>
</div>
