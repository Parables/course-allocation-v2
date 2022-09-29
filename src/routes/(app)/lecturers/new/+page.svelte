<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import saveIcon from '$lib/assets/icons/save.svg?raw';
	import type { ActionData } from './$types';
	import { CreateLecturerSchema, QualificationSchema } from '$lib/data/types/lecturer';
	import type { LecturerType } from '$lib/data/types/lecturer';
	import { ValidationError } from 'myzod';
	import EasyToast from '$lib/components/easy-toast.svelte';
	import { assets } from '$app/paths';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	// export let form: ActionData;
	let formData: Record<string, any> = {};
	$: console.log('formData', formData);

	let qualifications: LecturerType['qualifications'] = {};
	let q: Record<string, any> = {};
	let qCount = 0;
	let qError: string | undefined = undefined;
	// let strQ: string;
	// $: strQ = JSON.stringify(qualifications);
	$: qCount = Object.keys(qualifications).length;

	const saveQualification = () => {
		const validated = QualificationSchema.try(q);
		if (validated instanceof ValidationError) {
			return (qError = validated.message);
		}
		qError = undefined;

		qualifications = { ...qualifications, [qCount]: validated };
		formData.qualifications = { ...qualifications };
		console.log(qualifications);
	};

	const deleteQ = (k: string) => {
		const d = { ...qualifications };
		delete d[k];
		qualifications = { ...d };
	};

	let files: FileList | null | undefined = undefined;

	// let profilePicture: any = null;

	$: {
		if (files) {
			let image = files[0];
			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				formData.profilePicture = e?.target?.result ?? null;
				uploadProfilePicture('cbquvjwxnuci');
			};
		}
	}

	const handleSubmit = async () => {
		const { staffID, fullName, gender, email, phoneNumber, qualifications } = formData;
		const validated = CreateLecturerSchema.try({
			staffID,
			fullName,
			gender,
			email,
			phoneNumber,
			qualifications: JSON.parse(qualifications)
		});

		console.log(validated);
		if (validated instanceof ValidationError) {
			return (formData.error = { message: validated.message });
		}

		const response = await fetch(`${$page.url.origin}/api/lecturers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(validated)
		});

		const result = await response.json();

		if (result.key) {
			uploadProfilePicture(result.key);
			goto('/lecturers');
		}
	};

	async function uploadProfilePicture(key: string) {
		const data: Record<string, any> = {};
		const imgData = formData.profilePicture.split(',');
		data.profilePicture = imgData[1];
		console.log(data);
		await fetch(`${$page.url.origin}/api/lecturers/${key}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
	}
	/* 	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			profilePicture = e?.target?.result ?? null;
		};
	}; */
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
		<!-- <form method="POST"> -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
			<!-- Personal details -->
			<div class="flex flex-col gap-y-5 w-full">
				<div>
					<h2 class="text-sm font-poppins font-semibold">Personal Details</h2>
					<h5 class="text-xs font-poppins font-light ">Fill in personal details of the lecturer</h5>
				</div>

				<!-- TODO: Upoad images of lecturer -->

				<label for="profilePicturePicker" class="cursor-pointer">
					<img
						class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
						src={formData.profilePicture ?? `${assets}/img-placeholder.png`}
						alt="Lecturer's Profile Pic"
					/>
					<input
						type="file"
						name="profilePicturePicker"
						id="profilePicturePicker"
						class="sr-only"
						bind:files
					/>
					<!-- <input
							type="file"
							name="profilePicture"
							id="profilePicture"
							class="sr-only"
							bind:value={profilePicture}
						/> -->
				</label>

				<InputField
					id="staffID"
					name="staffID"
					label="Staff ID"
					required
					initial={formData?.staffID ?? ''}
					bind:value={formData.staffID}
				/>
				<InputField
					id="fullName"
					name="fullName"
					label="Full Name"
					autocomplete="name"
					required
					initial={formData?.fullName ?? ''}
					bind:value={formData.fullName}
				/>

				<select
					id="gender"
					name="gender"
					label="Gender"
					list="gender-options"
					required
					bind:value={formData.gender}
					class="select select-bordered "
				>
					<option value="" disabled>Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>

			<!-- Contanct details -->
			<div class="flex flex-col gap-y-5 w-full">
				<div>
					<h2 class="text-sm font-poppins font-semibold">Contact Details</h2>
					<h5 class="text-xs font-poppins font-light">Fill in contact details of the lecturer</h5>
				</div>
				<InputField
					id="email"
					name="email"
					label="Email"
					type="email"
					autocomplete="email"
					required
					initial={formData?.email ?? ''}
					bind:value={formData.email}
				/>
				<InputField
					id="phoneNumber"
					name="phoneNumber"
					label="Phone Number"
					autocomplete="tel"
					required
					initial={formData?.phoneNumber ?? ''}
					bind:value={formData.phoneNumber}
				/>
			</div>
			<!-- Qualification details -->
			<div class="flex flex-col  gap-y-5 w-full">
				<div>
					<h2 class="text-sm font-poppins font-semibold">Qualification Details</h2>
					<h5 class="text-xs font-poppins font-light">
						Fill in qualification details of the lecturer. All fields marked * are required
					</h5>
				</div>
				<!-- <input name="qualifications" id="qualifications *" class="sr-only" bind:value={strQ} /> -->

				<div class="flex w-full items-center gap-5">
					<div class="dropdown dropdown-end">
						<!-- <label tabindex="0" class="btn btn-ghost rounded-btn">Dropdown</label> -->
						<span tabindex="0" class="btn btn-outline gap-x-5">
							<p>{qCount} Qualifications Added</p>
							{@html viewIcon}</span
						>

						<ul
							tabindex="0"
							class="mt-4 rounded-md shadow-md menu dropdown-content bg-base-100 w-96 h-80 overflow-y-auto p-5"
						>
							<li class="text-sm">Click on an item to remove it</li>
							{#each Object.entries(qualifications) as [k, v], i (k)}
								<li class="hover-bordered my-4" on:click={() => deleteQ(k)}>
									<span class="grid  grid-cols-12 border border-slate-500 rounded pr-4">
										<span class="grid grid-cols-1 text-sm col-span-11">
											<p class="text-left">University: {v.university}</p>
											<p class="text-left">Programme: {v.programme}</p>
											<p class="text-left">Certificate: {v.certificate}</p>
											<p class="text-left">Period: {v.startDate} to {v.endDate}</p>
										</span>
										<span>{@html deleteIcon}</span>
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				{#if qError}
					<p class="text-sm text-red-500 font-semibold">{qError}</p>
				{/if}
				<InputField
					id="university"
					name="university"
					label="University *"
					required
					bind:value={q.university}
				/>
				<InputField
					id="programme"
					name="programme"
					label="Programme *"
					required
					bind:value={q.programme}
				/>
				<InputField
					id="certificate"
					name="certificate"
					label="Certificate *"
					required
					bind:value={q.certificate}
				/>
				<div class="grid w-full grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0 md:gap-x-5 gap-x-0">
					<InputField
						id="startDate"
						name="startDate"
						label="Start Date *"
						type="date"
						required
						bind:value={q.startDate}
					/>
					<InputField
						id="endDate"
						name="endDate"
						label="End Date *"
						type="date"
						required
						bind:value={q.endDate}
					/>
				</div>
				<div
					class="btn btn-outline w-full capitalize gap-4 inline-flex"
					on:click={saveQualification}
				>
					{@html saveIcon} Save Qualifications
				</div>
			</div>
		</div>
		<!-- <EasyToast
			show={formData?.error?.message}
			message={form?.error?.message ?? 'Something went wrong'}
			type="error"
		/>

		<EasyToast
			show={form?.success?.message}
			message={form?.success?.message ?? 'Updated successfully	'}
			type="success"
		/> -->
		<!-- bottom divider -->
		<hr class="my-10" />
		<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		<!-- </form> -->
	</div>
</div>
