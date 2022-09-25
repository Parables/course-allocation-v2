<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let course: typeof data.course;
	// let lecturers: typeof data.lecturers;

	$: {
		({ course } = data);
	}
</script>

<div class="flex flex-col w-full h-full">
	<div>
		<div class="flex items-center w-full ">
			<a href="/courses" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Edit A Course</h1>
		</div>
		<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Fill in the data for a Course</h3>
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- edit course form -->
		<form method="post" use:enhance>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Personal details -->
				<div class="flex flex-col w-full gap-y-5">
					<div>
						<h2 class="text-sm font-semibold font-poppins">Course Details</h2>
						<h5 class="text-xs font-light font-poppins">Fill in the details for a course</h5>
					</div>

					<InputField
						id="key"
						name="key"
						label="key"
						required
						classNames="sr-only"
						initial={course?.key}
					/>
					<InputField
						id="title"
						name="title"
						label="Course Title"
						required
						initial={form?.title ?? course?.title ?? ''}
					/>
					<InputField
						id="code"
						name="code"
						label="Course Code"
						required
						initial={form?.code ?? course?.code ?? ''}
					/>
					<InputField
						id="creditHours"
						name="creditHours"
						label="Credit Hourse"
						required
						type="number"
						initial={form?.creditHours ?? course?.creditHours ?? ''}
					/>
					<InputField
						id="contactHours"
						name="contactHours"
						label="Contact Hours"
						required
						type="number"
						initial={form?.contactHours ?? course?.contactHours ?? ''}
					/>
				</div>
				<!-- Contanct details -->
				<div class="flex flex-col w-full gap-y-5">
					<div>
						<h2 class="text-sm font-semibold font-poppins">Other Details</h2>
						<h5 class="text-xs font-light font-poppins">Fill in other details of the course</h5>
					</div>
					<InputField
						id="profile"
						name="profile"
						label="Course Profile"
						list="profile-choices"
						type="text"
						required
						initial={form?.profile ?? course?.profile ?? ''}
					/>

					<datalist id="profile-choices">
						<option value="department" />
						<option value="servicing" />
					</datalist>

					<InputField
						id="session"
						name="session"
						label="Session"
						list="course-sessions"
						required
						initial={form?.session ?? course?.session ?? ''}
					/>

					<datalist id="course-sessions">
						<option value="regular" />
						<option value="evening" />
						<option value="weekend" />
					</datalist>

					<InputField
						id="studentCount"
						name="studentCount"
						label="Number of Students"
						type="number"
						required
						initial={form?.studentCount ?? course?.studentCount ?? ''}
					/>

					<!-- {#if lecturers?.length > 0}
						<InputField
							id="lecturer"
							name="lecturer"
							label="Assign Course To"
							type="text"
							list="assigned-lecturer-options"
							required
							initial={form?.lecturer ?? course?.lecturer ?? ''}
						/>

						<datalist id="assigned-lecturer-options">
							<option value="" selected>None</option>
							{#each lecturers as lecturer}
								<option value={lecturer.key}>{lecturer.fullName}</option>
							{/each}
						</datalist>
					{/if} -->
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
