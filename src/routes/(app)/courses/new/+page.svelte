<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
</script>

<div class="flex flex-col w-full h-full">
	<div>
		<div class="flex items-center w-full ">
			<a href="/courses" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Create A Course</h1>
		</div>
		<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Fill in the data for a Course</h3>
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add course form -->
		<form method="POST" use:enhance>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Course details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Course Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">Fill in the details for a course</h5>
					<InputField
						id="title"
						name="title"
						label="Course Title"
						required
						initial={form?.title ?? ''}
					/>
					<InputField
						id="code"
						name="code"
						label="Course Code"
						required
						initial={form?.code ?? ''}
					/>
					<InputField
						id="creditHours"
						name="creditHours"
						label="Credit Hours"
						required
						initial={form?.creditHours ?? ''}
						type="number"
					/>
					<InputField
						id="contactHours"
						name="contactHours"
						label="Contact Hours"
						required
						type="number"
						initial={form?.contactHours ?? ''}
					/>
				</div>
				<!-- Other details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Other Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">Fill in other details of the course</h5>
					<InputField
						id="profile"
						name="profile"
						label="Course Profile"
						list="profile-choices"
						type="text"
						required
						initial={form?.profile ?? ''}
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
						initial={form?.session ?? ''}
					/>

					<datalist id="course-sessions">
						<option value="regular" />
						<option value="regular & evening" />
						<option value="weekend" />
					</datalist>

					<InputField
						id="studentCount"
						name="studentCount"
						label="Number of Students"
						type="number"
						required
						initial={form?.studentCount ?? ''}
					/>
				</div>

				<!-- Contanct extra details -->
				<div class="flex flex-col w-full gap-y-5">
					<div>
						<h2 class="text-sm font-semibold font-poppins">Other Details</h2>
						<h5 class="text-xs font-light font-poppins">Fill in other details of the course</h5>
					</div>
					<InputField id="objectives" name="objectives" label="Course Objectives">
						<textarea
							name="objectives"
							id="objectives"
							cols="40"
							rows="5"
							class="textarea textarea-bordered">{form?.objectives ?? ''}</textarea
						>
					</InputField>

					<InputField id="description" name="description" label="Course Description">
						<textarea
							name="description"
							id="description"
							cols="40"
							rows="5"
							class="textarea textarea-bordered">{form?.description ?? ''}</textarea
						>
					</InputField>

					<InputField id="content" name="content" label="Course Content">
						<textarea
							name="content"
							id="content"
							cols="40"
							rows="5"
							class="textarea textarea-bordered">{form?.content ?? ''}</textarea
						>
					</InputField>
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
