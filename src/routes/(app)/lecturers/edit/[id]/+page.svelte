<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let lecturer: typeof data.lecturer;

	$: {
		({ lecturer } = data);
		console.log('form:-->', form, 'data:-->', data);
	}
</script>

<div class="flex flex-col w-full h-full">
	<div>
		<div class="flex items-center w-full ">
			<a href="/lecturers" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				<BackButton />
			</a>
			<h1 class="text-2xl font-bold font-poppins">Edit Lecturer's Profile</h1>
		</div>
		<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Fill in the data for a Lecturer</h3>
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<hr class="mt-6" />

		<form method="post">
			<input
				type="text"
				id="key"
				name="key"
				label="key"
				required
				class="sr-only"
				bind:value={data.lecturer.key}
			/>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
				<!-- Personal details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Personal Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">
						Fill in personal details of the lecturer
					</h5>

					<InputField
						id="fullName"
						name="fullName"
						label="Name"
						required
						initial={form?.fullName ?? lecturer?.fullName ?? ''}
					/>
					<InputField
						id="gender"
						name="gender"
						label="Gender"
						required
						initial={form?.gender ?? lecturer?.gender ?? ''}
					/>
				</div>
				<!-- Contanct details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Contact Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">
						Fill in contact details of the lecturer
					</h5>
					<InputField
						id="email"
						name="email"
						label="Email"
						type="email"
						autocomplete="email"
						required
						initial={form?.email ?? lecturer?.email ?? ''}
					/>
					<InputField
						id="phoneNumber"
						name="phoneNumber"
						label="Phone Number"
						autocomplete="tel"
						required
						initial={form?.phoneNumber ?? lecturer?.phoneNumber ?? ''}
					/>
				</div>
				<!-- Qualification details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Qualification Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">
						Fill in qualification details of the lecturer
					</h5>
					<InputField
						id="degree"
						name="degree"
						label="Degree"
						initial={form?.degree ?? lecturer?.degree ?? ''}
					/>
					<InputField
						id="masters"
						name="masters"
						label="Masters"
						initial={form?.masters ?? lecturer?.masters ?? ''}
					/>
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
