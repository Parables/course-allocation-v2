<script lang="ts">
	import EassyToast from '$lib/components/easy-toast.svelte';
	import Button from '$lib/components/button.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: any;

	let lecturer: typeof data.lecturer;
	let courses: any[] = [];
	let assignedCourses: Record<string, any> = {};

	let availableCourses: any[] = [];
	let selectedCourses: any[] = [];
	let addCourses: any[] = [];
	let strAddCourses: string;

	let removeCourses: any[] = [];
	let strRemoveCourses: string;

	$: {
		({ lecturer, courses } = data);
		assignedCourses = lecturer.assigned_courses ?? {};
		availableCourses = courses.filter((c) => assignedCourses[c.key] === undefined);
		selectedCourses = Object.values(lecturer?.assigned_courses ?? {});
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

<div class="w-full h-full flex flex-col">
	<div class="flex w-full items-center ">
		<a href="/lecturers" class=" rounded border-purple-500 text-purple-500 border mr-4">
			<BackButton />
		</a>
		<h1 class="font-poppins text-2xl font-bold">Lecturer's Profile</h1>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<div
			class="grid grid-cols-1 gap-y-10 gapx-2 md:flex md:items-stretch h-full w-full py-10 overflow-y-auto md:overflow-hidden"
		>
			<!-- Profile -->
			<div class="flex flex-col w-full md:w-4/12 gap-4 px-6 md:overflow-y-auto">
				<h3 class="font-semibold text-base text-gray-400 uppercase">Lecturers Profile</h3>

				<img
					class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
					src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					alt="Extra large avatar"
				/>

				<div class="mt-2">
					<label for="full_name" class="uppercase text-sm text-gray-500 font-medium"
						>Full Name</label
					>
					<p class="text-base">{lecturer.full_name}</p>
				</div>

				<div class="">
					<label for="full_name" class="uppercase text-sm text-gray-500 font-medium">Email</label>
					<p class="text-base">{lecturer.email}</p>
				</div>

				<div class="">
					<label for="full_name" class="uppercase text-sm text-gray-500 font-medium"
						>Phone Number</label
					>
					<p class="text-base">{lecturer.phone_number}</p>
				</div>

				<div class="">
					<label for="full_name" class="uppercase text-sm text-gray-500 font-medium">Degree</label>
					<p class="text-base">{lecturer.degree}</p>
				</div>

				<div class="">
					<label for="full_name" class="uppercase text-sm text-gray-500 font-medium">Masters</label>
					<p class="text-base">{lecturer.masters}</p>
				</div>

				<a href="/lecturers/edit/{$page.params.id}">
					<Button classNames="w-8/12">Edit Profile</Button>
				</a>
				<a href="/lecturers/delete/{$page.params.id}">
					<Button
						classNames=" w-8/12 border-2 border-red-500 bg-transparent text-red-500 hover:ring-red-500 focus:ring-red-500"
						>Delete Profile</Button
					>
				</a>
			</div>

			<!-- assigned courses lecturers -->
			<div class="relative flex flex-col w-full h-full overflow-hidden">
				<p class="my-5 font-semibold text-center uppercase">Assigned Courses</p>

				{#if lecturer !== null}
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
											<div class="inline-flex flex-col ml-4 w-full">
												<p>{course.course_name}</p>
												<p class="text-sm text-gray-400">{course.course_code}</p>
											</div>
										</label>
									</li>
								{/each}
							</ul>

							<form action="/schedules?/addCourses" method="post">
								<input type="text" name="key" id="key" value={lecturer.key} class="sr-only" />
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
											<div class="inline-flex flex-col ml-4 w-full">
												<p>{course.course_name}</p>
												<p class="text-sm text-gray-400">{course.course_code}</p>
											</div>
										</label>
									</li>
								{/each}
							</ul>
							<form action="/schedules?/removeCourses" method="post">
								<input type="text" name="key" id="key" value={lecturer.key} class="sr-only" />
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
	</div>
</div>
