<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';

	import BackButton from '$lib/assets/icons/chevron-left.svg';

	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/courses" class=" rounded border-purple-500 text-purple-500 border mr-4">
				<BackButton />
			</a>
			<h1 class="font-poppins text-2xl font-bold">Edit A Course</h1>
		</div>
		<h3 class="mt-3 ml-10 font-roboto text-sm font-light">Fill in the data for a Course</h3>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<!-- top divider -->
		<hr class="mt-6" />
		<!-- edit course form -->
		<form action="/courses?/update" method="post" use:enhance>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Personal details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Course Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">Fill in the details for a course</h5>
					<InputField
						id="key"
						name="key"
						label="key"
						required
						classNames="sr-only"
						bind:initial={data.course.key}
					/>
					<InputField
						id="course_name"
						name="course_name"
						label="Course Name"
						required
						bind:initial={data.course.course_name}
					/>
					<InputField
						id="course_code"
						name="course_code"
						label="Course Code"
						required
						bind:initial={data.course.course_code}
					/>
					<InputField
						id="year_group"
						name="year_group"
						label="Year Group"
						required
						bind:initial={data.course.year_group}
					/>
				</div>
				<!-- Contanct details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Other Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8 invisible">
						Fill in other details of the course
					</h5>
					<InputField
						id="course_type"
						name="course_type"
						label="Course Type"
						type="text"
						required
						bind:initial={data.course.course_type}
					/>
					<InputField
						id="student_count"
						name="student_count"
						label="Number of Students"
						required
						bind:initial={data.course.student_count}
					/>
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
