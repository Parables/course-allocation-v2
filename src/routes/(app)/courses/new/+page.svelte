<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;

	$: {
		console.log('form:-->', form);
	}
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/courses" class=" rounded border-purple-500 text-purple-500 border mr-4">
				<BackButton />
			</a>
			<h1 class="font-poppins text-2xl font-bold">Create A Course</h1>
		</div>
		<h3 class="mt-3 ml-10 font-roboto text-sm font-light">Fill in the data for a Course</h3>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add course form -->
		<form method="post" use:enhance>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Personal details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Course Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">Fill in the details for a course</h5>
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
				<!-- Contanct details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Other Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8 invisible">
						Fill in other details of the course
					</h5>
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
						<option value="evening" />
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
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
