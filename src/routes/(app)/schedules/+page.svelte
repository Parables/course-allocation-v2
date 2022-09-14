<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import EassyToast from '$lib/components/easy-toast.svelte';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: any;

	let lecturers: any[] = [];
	let courses: any[] = [];
	let assignedCourses: Record<string, any> = {};
	let selectedLecturer: string | null = null;

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
		selectedLecturer = $page.url.hash.replace('#', '');
	}

	$: {
		if (selectedLecturer) {
			selectedCourses = [];
			assignedCourses = lecturers.find((l) => l.key === selectedLecturer)?.assigned_courses ?? {};
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
	<a href="/" class="mr-4 text-purple-500 border border-purple-500 rounded ">
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
				<a href="#{lecturer.key}">
					<li
						class="w-full group flex flex-col  px-5 py-3 bg-white border-2 rounded-lg group-hover:border-purple-500 border-gray-50 {selectedLecturer?.includes(
							lecturer.key
						)
							? 'active-lecturer'
							: ''}"
					>
						<p>{lecturer.full_name}</p>
						<p class="text-sm text-gray-400">{lecturer.phone_number}</p>
					</li>
				</a>
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
						{#each availableCourses as course, i}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label
									for={`addCourse-${course.key}`}
									class="flex items-center w-full px-5 py-3 cursor-pointer"
								>
									<input
										type="checkbox"
										class="checkbox checkbox-primary"
										bind:group={addCourses}
										name="addCourses"
										value={course}
										id={`addCourse-${course.key}`}
									/>
									<div class="inline-flex flex-col w-full ml-4">
										<p>{course.course_name}</p>
										<p class="text-sm text-gray-400">{course.course_code}</p>
									</div>
								</label>
							</li>
						{/each}
					</ul>

					<form action="?/addCourses&redirectTo=/schedules#{selectedLecturer}" method="post">
						<input type="text" name="key" id="key" value={selectedLecturer} class="sr-only" />
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
						{#each selectedCourses as course, i}
							<li class="border border-gray-100 rounded-md group group-hover:shadow-md">
								<label
									for={`removed-${course.key}`}
									class="flex items-center w-full px-5 py-3 cursor-pointer"
								>
									<input
										type="checkbox"
										class="checkbox checkbox-primary"
										bind:group={removeCourses}
										name="removeCourses"
										value={course}
										id={`removed-${course.key}`}
									/>
									<div class="inline-flex flex-col w-full ml-4">
										<p>{course.course_name}</p>
										<p class="text-sm text-gray-400">{course.course_code}</p>
									</div>
								</label>
							</li>
						{/each}
					</ul>
					<form action="?/removeCourses&redirectTo=/schedules#{selectedLecturer}" method="post">
						<input type="text" name="key" id="key" value={selectedLecturer} class="sr-only" />
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

<style lang="postcss">
	.active-lecturer {
		@apply shadow-lg bg-purple-500 text-white;
	}
</style>
