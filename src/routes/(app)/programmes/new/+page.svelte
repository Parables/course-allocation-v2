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

<div class="w-full h-full flex flex-col">
	<div>
		<div class="flex w-full items-center ">
			<a href="/programmes" class=" rounded border-purple-500 text-purple-500 border mr-4">
				{@html backIcon}
			</a>
			<h1 class="font-poppins text-2xl font-bold">Create A Programme</h1>
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
					<h2 class="text-sm font-poppins font-semibold">Programme Details</h2>
					<h5 class="text-xs font-poppins font-light mb-8">Fill in the details for a programme</h5>

					<div class="flex flex-col gap-y-20 w-full h-full">
						<!-- year 1 -->
						<summary class="w-full h-full">
							<h2 class="text-sm font-poppins font-semibold">Year 1</h2>
							<h5 class="text-xs font-poppins font-light mb-8">
								Select the courses for the programme outline in Year 1
							</h5>
							<details class="w-full">
								<div class="grid grid-cols-2 gap-10 w-full ">
									<!-- semster 1 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 1</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year1.sem1"
														id="outline.year1.sem1-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>

									<!-- semster 2 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 2</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year1.sem2"
														id="outline.year1.sem2-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>
								</div>
							</details>
						</summary>

						<!-- year 2 -->
						<summary class="w-full h-full">
							<h2 class="text-sm font-poppins font-semibold">Year 2</h2>
							<h5 class="text-xs font-poppins font-light mb-8">
								Select the courses for the programme outline in Year 2
							</h5>
							<details class="w-full">
								<div class="grid grid-cols-2 gap-10 w-full ">
									<!-- semster 1 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 1</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year2.sem1"
														id="outline.year2.sem1-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>

									<!-- semster 2 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 2</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year2.sem2"
														id="outline.year2.sem2-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>
								</div>
							</details>
						</summary>

						<!-- year 3 -->
						<summary class="w-full h-full">
							<h2 class="text-sm font-poppins font-semibold">Year 3</h2>
							<h5 class="text-xs font-poppins font-light mb-8">
								Select the courses for the programme outline in Year 3
							</h5>
							<details class="w-full">
								<div class="grid grid-cols-2 gap-10 mt-3 w-full ">
									<!-- semster 1 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 1</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year3.sem1"
														id="outline.year3.sem1-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>

									<!-- semster 2 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 2</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year3.sem2"
														id="outline.year3.sem2-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>
								</div>
							</details>
						</summary>

						<!-- year 4 -->
						<summary class="w-full h-full">
							<h2 class="text-sm font-poppins font-semibold">Year 4</h2>
							<h5 class="text-xs font-poppins font-light mb-8">
								Select the courses for the programme outline in Year 4
							</h5>
							<details class="w-full">
								<div class="grid grid-cols-2 gap-10 mt-3 w-full ">
									<!-- semster 1 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 1</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year4.sem1"
														id="outline.year4.sem1-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>

									<!-- semster 2 -->
									<div class="w-full h-[300px] overflow-y-auto pr-10">
										<h2 class="text-sm font-poppins font-semibold">Semester 2</h2>

										<div class="grid grid-cols-1 gap-y-5 gap-x-10 h-full my-4">
											{#each courses as course}
												<div class="shadow-md rounded-md p-4 inline-flex items-center gap-x-4">
													<input
														type="checkbox"
														name="outline.year4.sem2"
														id="outline.year4.sem2-{course.key}"
														class="checkbox checkbox-primary checkbox-sm"
														value={course.key}
													/>
													<p class="text-sm font-medium">
														{course.title}
													</p>
												</div>
											{/each}
											<div class="h-5 " />
										</div>
									</div>
								</div>
							</details>
						</summary>
					</div>
				</div>
			</div>
			<!-- bottom divider -->
			<hr class="my-10" />

			<Button classNames=" md:w-auto md:ml-10">Submit</Button>
		</form>
	</div>
</div>
