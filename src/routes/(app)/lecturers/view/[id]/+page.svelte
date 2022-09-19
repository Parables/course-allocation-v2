<script lang="ts">
	import EassyToast from '$lib/components/easy-toast.svelte';
	import Button from '$lib/components/button.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/assets/icons/chevron-left.svg';
	import type { PageData } from './$types';

	export let data: PageData;

	let lecturer: typeof data.lecturer;
	let courses: typeof data.courses;
	// TODO: Use alaSQL to select * courses where course.lecturer = lecturer.key
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
			<h3 class="font-semibold text-base text-gray-400 uppercase">Lecturers Profile</h3>

			<dl class="flex flex-col w-full md:w-4/12 gap-x-4 px-6 md:overflow-y-auto">
				<dt class="sr-only">Profile Picture</dt>

				<dd class="mb-2">
					<img
						class="w-36 h-36 ring-4 ring-purple-300 ring-offset-4 object-cover rounded-md"
						src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						alt="Extra large avatar"
					/>
				</dd>

				<dt class="uppercase text-sm text-gray-500 font-medium">Full Name</dt>
				<dd class="text-base mb-4">{lecturer.fullName}</dd>

				<dt class="uppercase text-sm text-gray-500 font-medium">Email</dt>
				<dd class="text-base mb-4">{lecturer?.email}</dd>

				<dt class="uppercase text-sm text-gray-500 font-medium">Phone Number</dt>
				<dd class="text-base mb-4">{lecturer.phoneNumber}</dd>

				<dt class="uppercase text-sm text-gray-500 font-medium">Degree</dt>
				<dd class="text-base mb-4">{lecturer.degree}</dd>

				<dt class="uppercase text-sm text-gray-500 font-medium">Masters</dt>
				<dd class="text-base mb-4">{lecturer.masters}</dd>

				<dt class="sr-only">Edit Profile</dt>
				<dd>
					<a href="/lecturers/edit/{$page.params.id}">
						<Button classNames="w-8/12">Edit Profile</Button>
					</a>
				</dd>

				<dt class="sr-only">Delete Profile</dt>
				<dd>
					<a href="/lecturers/delete/{$page.params.id}">
						<Button
							classNames=" w-8/12 border-2 border-red-500 bg-transparent text-red-500 hover:ring-red-500 focus:ring-red-500"
							>Delete Profile</Button
						>
					</a>
				</dd>
			</dl>

			<!-- assigned courses lecturers -->
			<!-- TODO: A 2-col grid layout for all courses assigned to lecturer-->
		</div>
	</div>
</div>
