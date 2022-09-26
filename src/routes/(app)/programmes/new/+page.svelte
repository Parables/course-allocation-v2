<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData | any;

	let courses: typeof data.courses = [];

	$: {
		courses = data.courses ?? [];
	}
</script>

<div class="flex flex-col w-full h-full">
	<div>
		<div class="flex items-center w-full ">
			<a href="/programmes" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">Create A Programme</h1>
		</div>
		<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Fill in the data for a Programme</h3>
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add programme form -->
		<form method="POST" use:enhance>
			<div class="grid grid-cols-1 gap-10 md:gap-y-10 mt-[85px] w-full px-10">
				<!-- Programme details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Programme Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">Fill in the details for a programme</h5>

					<div class="flex items-center w-full gap-x-10 gap-y-5">
						<InputField
							id="title"
							name="title"
							label="Programme Title"
							required
							initial={form?.title ?? ''}
							classNames="w-full"
						/>
						<InputField
							id="code"
							name="code"
							label="Programme Code"
							required
							initial={form?.code ?? ''}
							classNames="w-4/12"
						/>
					</div>
				</div>

				<!-- Programme details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-semibold font-poppins">Programme Details</h2>
					<h5 class="mb-8 text-xs font-light font-poppins">Fill in the details for a programme</h5>

					<div class="flex flex-col w-full h-full gap-y-20">
						{#each [1, 2, 3, 4] as y}
							<!-- year y -->
							<summary class="w-full h-full">
								<h2 class="text-sm font-semibold font-poppins">Year {y}</h2>
								<h5 class="mb-8 text-xs font-light font-poppins">
									Select the courses for the programme outline in Year {y}
								</h5>
								<details class="w-full">
									<div class="grid w-full grid-cols-2 gap-10 ">
										{#each [1, 2] as s}
											<!-- semster s -->
											<div class="w-full h-[300px] overflow-y-auto pr-10">
												<h2 class="text-sm font-semibold font-poppins">Semester {s}</h2>

												<div class="grid h-full grid-cols-1 my-4 gap-y-5 gap-x-10">
													{#each courses as course}
														<label
															for="outline.year{y}.sem{s}-{course.key}"
															class="inline-flex items-center p-4 text-sm font-medium rounded-md shadow-md gap-x-4"
														>
															<input
																type="checkbox"
																name="outline.year{y}.sem{s}"
																id="outline.year{y}.sem{s}-{course.key}"
																class="checkbox checkbox-primary checkbox-sm"
																value={course.key}
															/>
															{course.title}
														</label>
													{/each}
													<div class="h-5 " />
												</div>
											</div>
										{/each}
									</div>
								</details>
							</summary>
						{/each}
					</div>
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />

			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
