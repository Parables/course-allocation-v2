<script lang="ts">
	export let show: boolean = false;
	export let message: string;
	export let errors: Record<string, string> | string[] = [];
	export let type: 'primary' | 'error' | 'success' | 'warning' = 'error';
	export let classNames = 'w-full';

	let errorList: string[] = [];
	$: {
		if (!Array.isArray(errors)) {
			errorList = Object.values(errors);
		} else {
			errorList = [...errors];
		}

		if (show) {
			setTimeout(() => {
				show = false;
			}, 4000);
		}
	}
</script>

{#if show}
	<div
		on:click={() => (show = false)}
		id="error-alert"
		class="cursor-pointer p-4 border rounded-md text-sm font-semibold {show
			? 'flex flex-col'
			: 'hidden'} {classNames}"
		class:primary={type === 'primary'}
		class:success={type === 'success'}
		class:error={type === 'error'}
		class:warning={type === 'warning'}
	>
		<div class="flex justify-between items-center mb-2">
			<strong> {message} </strong>
			<button class="grid place-items-center w-5 h-5 rounded-full hover:bg-white"> &times; </button>
		</div>

		{#if errors}
			<ul>
				{#each errorList as error}
					<li class="ml-5 list-disc">{error}</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style>
	.error {
		@apply border-red-500  bg-red-50 text-red-500;
	}

	.success {
		@apply border-green-500  bg-green-50 text-green-500;
	}

	.warning {
		@apply border-yellow-500  bg-yellow-50 text-yellow-500;
	}

	.bottom-center {
		@apply bottom-5 md:bottom-10 mx-auto left-[50%] translate-x-[-50%];
	}
</style>
