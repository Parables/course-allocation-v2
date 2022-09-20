<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/lecturers" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Create A Lecturer</h1>
		</div>
		<h3 class="mt-3 ml-10 font-roboto text-sm font-light">Fill in the data for a Lecturer</h3>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add lecturer form -->
		<form method="POST" use:enhance>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Personal details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Personal Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">
						Fill in personal details of the lecturer
					</h5>
					<InputField
						id="fullName"
						name="fullName"
						label="Full Name"
						autocomplete="name"
						required
						initial={form?.fullName ?? ''}
					/>
					<InputField
						id="gender"
						name="gender"
						label="Gender"
						list="gender-options"
						required
						initial={form?.gender ?? ''}
					/>

					<datalist id="gender-options">
						<option value="male" />
						<option value="female" />
					</datalist>
				</div>

				<!-- Contanct details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Contact Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">
						Fill in contact details of the lecturer
					</h5>
					<InputField
						id="email"
						name="email"
						label="Email"
						type="email"
						autocomplete="email"
						required
						initial={form?.email ?? ''}
					/>
					<InputField
						id="phoneNumber"
						name="phoneNumber"
						label="Phone Number"
						autocomplete="tel"
						required
						initial={form?.phoneNumber ?? ''}
					/>
				</div>
				<!-- Qualification details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Qualification Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">
						Fill in qualification details of the lecturer
					</h5>
					<InputField id="degree" name="degree" label="Degree" initial={form?.degree ?? ''} />
					<InputField id="masters" name="masters" label="Masters" initial={form?.masters ?? ''} />
					<InputField id="PhD" name="PhD" label="PhD" initial={form?.PhD ?? ''} />
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
