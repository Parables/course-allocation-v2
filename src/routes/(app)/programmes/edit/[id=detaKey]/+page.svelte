<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import { enhance } from '$app/forms';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData | any;

	let programme: typeof data.programme;
	let courses: typeof data.courses = [];

	$: {
		programme = data.programme;
		courses = data.courses ?? [];
	}
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/programmes" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Edit A Programme</h1>
		</div>
		<h3 class="mt-3 ml-10 font-roboto text-sm font-light">Fill in the data for a Programme</h3>
	</div>

	<div class="overflow-y-auto flex-1 mb-10">
		<!-- top divider -->
		<hr class="mt-6" />

		<!-- add programme form -->
		<form method="POST" use:enhance>
			<div class="grid grid-cols-1 gap-10 md:gap-y-10 mt-[85px] w-full px-10">
				<!-- Programme details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Programme Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">Fill in the details for a programme</h5>

					<div class="flex items-center gap-x-10 gap-y-5 w-full">
						<InputField
							id="key"
							name="key"
							label="key"
							required
							classNames="sr-only"
							initial={programme?.key}
						/>
						<InputField
							id="title"
							name="title"
							label="Programme Title"
							required
							initial={form?.title ?? programme?.title ?? ''}
							classNames="w-full"
						/>
						<InputField
							id="code"
							name="code"
							label="Programme Code"
							required
							initial={form?.code ?? programme?.code ?? ''}
							classNames="w-4/12"
						/>
					</div>
				</div>

				<!-- Programme details -->
				<div class="flex flex-col w-full">
					<h2 class="text-sm font-poppins font-semibold">Programme Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">Fill in the details for a programme</h5>

					<div class="flex flex-col gap-y-20 w-full h-full">
						{#each [1, 2, 3, 4] as y}
							<!-- year y -->
							<summary class="w-full h-full">
								<h2 class="text-sm font-poppins font-semibold">Year {y}</h2>
								<h5 class="text-xs font-poppins font-light mb-8">
									Select the courses for the programme outline in Year {y}
								</h5>
								<details class="w-full">
									<div class="grid grid-cols-2 gap-10 w-full ">
										{#each [1, 2] as s}
											<!-- semster s -->
											<div class="w-full h-[300px] overflow-y-auto pr-10">
												<h2 class="text-sm font-poppins font-semibold">Semester {s}</h2>

												<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
													{#each courses as course}
														<label
															for="outline.year{y}.sem{s}-{course.key}"
															class="text-sm font-medium shadow-md rounded-md p-4 inline-flex items-center gap-x-4"
														>
															<input
																type="checkbox"
																name="outline.year{y}.sem{s}"
																id="outline.year{y}.sem{s}-{course.key}"
																class="checkbox checkbox-primary checkbox-sm"
																value={course.key}
																checked={programme?.outline?.[`year${y}`]?.[`sem${s}`]?.includes(
																	course.key
																)}
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
