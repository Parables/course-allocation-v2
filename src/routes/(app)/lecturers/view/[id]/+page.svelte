<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { PageData } from './$types';
	import Select from '$lib/components/input-fields/select.svelte';

	export let data: PageData;
	let lecturer: typeof data.lecturer;
	let courses: any[] /*typeof data.courses*/ = [];
	let availableCourses: typeof courses = [];
	let assignedCourses: typeof courses = [];
	// let selectedCourses: typeof courses = [];

	$: {
		({ lecturer, courses } = data);
		if (lecturer.assignedCourses) {
			assignedCourses = lecturer.assignedCourses;
		}

		availableCourses = courses.filter(
			(c) => assignedCourses.find((a) => a.key === c.key) === undefined
		);
	}

	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = ['Cookies and cream', 'Mint choc chip', 'Raspberry ripple'];

	function join(flavours: string[]) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}

	$: {
		console.log(
			'Falvours',
			flavours,
			'assignedCourses',
			assignedCourses,
			'avaCount',
			availableCourses.length
		);
	}

	function addCourses() {}
	function removeCourses() {}
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

			<!-- assigned course -->
			<div class="flex flex-col w-full md:pr-20">
				<h3 class="font-semibold text-base text-gray-400 uppercase">Course Allocation</h3>

				<div class="grid grid-cols-2 md:gap-10 gap-5 mt-4 h-full overflow-y-auto">
					<!-- available courses -->
					<div class="">
						<p class="text-gray-500 uppercase text-center mb-5 text-sm font-medium">
							Available Courses
						</p>

						<ul class="grid grid-cols-1 gap-5">
							{#each availableCourses as course, i (course.key)}
								<li class="group group-hover:shadow-md rounded-md border border-gray-100">
									<label
										for={course.key}
										class="items-center flex w-full  py-3 px-5 cursor-pointer"
									>
										<input
											type="checkbox"
											class="appearance-none checked:bg-purple-500 checked:ring-offset-2 mr-4 w-4 h-4 rounded checked:ring-purple-500 checked:ring-2 border-gray-500 border"
											bind:group={assignedCourses}
											name="assignedCourses"
											value={course}
											id={course.key}
										/>
										{course.course_name}
									</label>
								</li>
							{/each}
						</ul>
					</div>

					<!-- selected courses -->
					<div class="">
						<p class="text-gray-500 uppercase text-center mb-5 text-sm font-medium">
							Assigned Courses
						</p>

						<ul class="grid grid-cols-1 gap-5">
							{#each assignedCourses as course, i (course.key)}
								<li class="group group-hover:shadow-md rounded-md border border-gray-100">
									<label
										for={course.key}
										class="items-center flex w-full  py-3 px-5 cursor-pointer"
									>
										<input
											type="checkbox"
											class="appearance-none checked:bg-purple-500 checked:ring-offset-2 mr-4 w-4 h-4 rounded checked:ring-purple-500 checked:ring-2 border-gray-500 border"
											bind:group={assignedCourses}
											name="assignedCourses"
											value={course}
											id={course.key}
										/>
										{course.course_name}
									</label>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<Button on:click={addCourses} classNames="my-5 w-full "
					>Assign {assignedCourses.length} Courses to {lecturer.full_name}</Button
				>
			</div>
		</div>
	</div>
</div>
