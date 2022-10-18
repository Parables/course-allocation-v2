<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import EasyToast from '$lib/components/easy-toast.svelte';
	import InputField from '$lib/components/input-fields/input-field.svelte';
	import Button from '$lib/components/button.svelte';

	export let form: any;
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
		<h1 class="text-2xl font-bold font-poppins">Login</h1>
		<h3 class="mt-[13px] font-roboto text-sm font-light">Fill in the form to proceed</h3>
	</div>

	<div class="grid grid-cols-1 gap-y-10 my-10 ">
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
			Don't have an Account? <a
				href="/register"
				class="text-purple-500 font-semibold underline p-2  rounded">Register</a
			>
		</p>
		<EasyToast
			show={form?.error?.message}
			message={form?.error?.message ?? 'Something went wrong'}
			type="error"
		/>
	</div>
</form>
