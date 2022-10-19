<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import saveIcon from '$lib/assets/icons/save.svg?raw';
	import type { ActionData, PageData } from './$types';
	import { QualificationSchema } from '$lib/data/types/lecturer';
	import type { LecturerType } from '$lib/data/types/lecturer';
	import { ValidationError } from 'myzod';
	import { assets } from '$app/paths';
	import EasyToast from '$lib/components/easy-toast.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: ActionData;

	let lecturer: typeof data.lecturer;
	let qualifications: LecturerType['qualifications'] = {};
	let q: Record<string, any> = {};
	let qError: string | undefined = undefined;
	let files: FileList | null | undefined = undefined;
	let src: string | null | ArrayBuffer = null;
	let profilePicture: string | undefined = undefined;
	let strQ: string;

	$: {
		({ lecturer } = data);
		qualifications = { ...lecturer.qualifications };
		src = `${$page.url.origin}/api/drives/photos/lecturers%2F${lecturer.key}.png`;
	}

	$: {
		strQ = JSON.stringify(qualifications ?? {});
	}

	$: qCount = Object.keys(qualifications).length;

	$: {
		if (files && files[0]) {
			let image = files[0];
			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				src = e?.target?.result ?? null;
				if (typeof src === 'string') {
					profilePicture = src?.split(',')[1];
				}
			};
		}
	}

	const addQ = () => {
		const validated = QualificationSchema.try(q);
		if (validated instanceof ValidationError) {
			return (qError = validated.message);
		}

		qError = undefined;
		qualifications = { ...qualifications, [new Date().valueOf()]: validated };
	};

	const removeQ = (k: string) => {
		const d = { ...qualifications };
		delete d[k];
		qualifications = { ...d };
	};
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/lecturers" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Edit A Lecturer</h1>
		</div>
		<h3 class="mt-3 ml-10 font-roboto text-sm font-light">Fill in the data for a Lecturer</h3>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add lecturer form -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-32 mt-[85px] w-full px-10">
			<!-- Personal details -->
			<div class="flex flex-col gap-y-5 w-full">
				<div>
					<h2 class="text-sm font-poppins font-semibold">Personal Details</h2>
					<h5 class="text-xs font-poppins font-light ">Fill in personal details of the lecturer</h5>
				</div>

				<label for="imagePicker" class="cursor-pointer">
					<img
						class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
						src={typeof src === 'string' ? src : `${assets}/img-placeholder.png`}
						alt="Lecturer's Profile Pic"
					/>
					<input type="file" name="imagePicker" id="imagePicker" class="sr-only" bind:files />
					<input
						type="text"
						name="profilePicture"
						id="profilePicture"
						class="sr-only"
						bind:value={profilePicture}
						form="lecturerForm"
					/>
				</label>

				<InputField
					id="staffID"
					name="staffID"
					label="Staff ID"
					required
					initial={form?.staffID ?? lecturer?.staffID ?? ''}
					form="lecturerForm"
				/>
				<InputField
					id="fullName"
					name="fullName"
					label="Full Name"
					autocomplete="name"
					required
					initial={form?.fullName ?? lecturer?.fullName ?? ''}
					form="lecturerForm"
				/>

				<select
					id="gender"
					name="gender"
					label="Gender"
					list="gender-options"
					required
					value={form?.gender ?? lecturer?.gender ?? ''}
					class="select select-bordered "
					form="lecturerForm"
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
					initial={form?.email ?? lecturer?.email ?? ''}
					form="lecturerForm"
				/>
				<InputField
					id="phoneNumber"
					name="phoneNumber"
					label="Phone Number"
					autocomplete="tel"
					required
					initial={form?.phoneNumber ?? lecturer?.phoneNumber ?? ''}
					form="lecturerForm"
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

				<div class="flex w-full items-center gap-5">
					<div class="dropdown dropdown-end">
						<span tabindex="0" class="btn btn-outline gap-x-5">
							<p>{qCount} Qualifications Added</p>
							{@html viewIcon}</span
						>

						<ul
							tabindex="0"
							class="mt-4 rounded-md shadow-md menu dropdown-content bg-base-100 w-96 h-80 overflow-y-auto p-5"
						>
							<li class="text-sm py-2 font-semibold">Click on an item to remove it</li>
							{#each Object.entries(qualifications) as [k, v], i (k)}
								<li class="hover-bordered my-4" on:click={() => removeQ(k)}>
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

					<InputField
						id="qualifications"
						name="qualifications"
						label="Qualifications*"
						classNames="sr-only"
						required
						form="lecturerForm"
						value={strQ}
						initial={strQ}
					/>
				</div>
				<div class="btn btn-outline capitalize gap-4 inline-flex" on:click={addQ}>
					{@html saveIcon} Save Qualifications
				</div>
			</div>
		</div>
		<EasyToast
			show={form?.error?.message}
			message={form?.error?.message ?? 'Something went wrong'}
			type="error"
		/>

		<EasyToast
			show={form?.success?.message}
			message={form?.success?.message ?? 'Updated successfully	'}
			type="success"
		/>
		<!-- bottom divider -->
		<hr class="my-10" />
		<form method="POST" id="lecturerForm" use:enhance>
			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
