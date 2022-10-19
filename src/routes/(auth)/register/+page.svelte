<script lang="ts">
	import EassyToast from '$lib/components/easy-toast.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import Button from '$lib/components/button.svelte';
	import { applyAction, enhance } from '$app/forms';
	export let errors: any;
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				window.location.href = result.location; // invalidateAll() + goto() will not work
				return;
			}
			applyAction(result);
		};
	}}
>
	<!-- large title -->
	<div class="w-full">
		<h1 class="text-2xl font-bold font-poppins">Register</h1>
		<h3 class="mt-[13px] font-roboto text-sm font-light">Fill in the form to proceed</h3>
	</div>

	<div class="grid grid-cols-1 gap-y-10 my-10 ">
		<!-- Username Input -->
		<InputField
			id="username"
			name="username"
			label="Username"
			type="text"
			autocomplete="username"
			required
		/>

		<!-- Email Input -->
		<InputField id="email" name="email" label="Email" type="email" autocomplete="email" required />

		<!-- Password Input -->
		<InputField
			id="password"
			name="password"
			label="Password"
			type="password"
			autocomplete="new-password"
			required
		/>

		<Button />

		<p class="">
			Already have an Account? <a
				href="/login"
				class="text-purple-500 font-semibold underline p-2  rounded">Login</a
			>
		</p>

		<EassyToast bind:show={errors} message="Something went wrong:" {errors} type="error" />
	</div>
</form>
