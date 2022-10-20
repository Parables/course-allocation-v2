<script lang="ts">
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';
	import { html, type UserConfig } from 'gridjs';
	import Button from '$lib/components/button.svelte';
	import backIcon from '$lib/assets/icons/chevron-left.svg?raw';
	import sendIcon from '$lib/assets/icons/send.svg?raw';
	import plusIcon from '$lib/assets/icons/plus.svg?raw';
	import viewIcon from '$lib/assets/icons/eye.svg?raw';
	import editIcon from '$lib/assets/icons/edit.svg?raw';
	import deleteIcon from '$lib/assets/icons/trash.svg?raw';
	import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
	import type { LecturerType } from '$lib/data/types/lecturer';
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/input-fields/input-field.svelte';
</script>

<div class="flex flex-col w-full h-full">
	<div>
		<div class="flex items-center w-full ">
			<a href="/courses" class="mr-4 text-purple-500 border border-purple-500 rounded ">
				{@html backIcon}
			</a>
			<h1 class="text-2xl font-bold font-poppins">User Accounts</h1>
		</div>
		<h3 class="mt-3 ml-10 text-sm font-light font-roboto">Manage all Users</h3>
	</div>

	<div class="flex-1 mb-10 overflow-y-auto">
		<!-- top divider -->
		<hr class="mt-6" />

		<div class="flex flex-col w-full mt-6 px-4">
			<div>
				<h2 class="text-sm font-semibold font-poppins">Pending Invitations</h2>
				<h5 class="mb-8 text-xs font-light font-poppins">
					Grant access to a Lecturer by sending an email invitation
				</h5>
			</div>
			<form method="POST" class="grid grid-cols-12 gap-10">
				<InputField
					id="email"
					name="email"
					label="Select Email"
					list="pending-invites"
					required
					classNames="col-span-6 w-auto"
				/>
				<datalist id="pending-invites">
					<!-- {#each pendingInvites as invitee}
					<option value={invitee.email}>{invitee.fullName}</option>
				{/each} -->
				</datalist>

				<Button classNames=" w-auto md:ml-10 col-span-3 items-center flex gap-x-5 justify-center"
					>{@html sendIcon}Send Invitation</Button
				>
			</form>
		</div>
	</div>
</div>
