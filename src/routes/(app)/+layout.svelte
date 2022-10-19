<script lang="ts">
	import { navigating, page } from '$app/stores';
	import NavigatingIndicator from '$lib/components/navigating-indicator.svelte';
	import type { LayoutData } from './$types';
	import { signOut, getUser } from 'lucia-sveltekit/client';

	export let data: LayoutData;

	let navigation: typeof data['navigation'];
	let fromAway = false;
	let queryChange = false;

	$: {
		({ navigation } = data);
	}

	$: {
		console.log($navigating);
	}

	$: {
		fromAway =
			$navigating?.from?.routeId !== '(app)/schedules' &&
			$navigating?.to?.routeId === '(app)/schedules';
		queryChange =
			!fromAway &&
			$navigating?.from?.url.searchParams.get('lecturer') !==
				$navigating?.to?.url.searchParams.get('lecturer');

		console.log(fromAway, queryChange);
	}
</script>

<div class="w-full h-full bg-[#BEBDC0] md:p-10">
	<div
		class="wrapper md:bg-[#E7E7E7] md:rounded-3xl h-full relative overflow-hidden w-full flex items-stretch"
	>
		<!-- side bar -->
		<nav class="w-[272px] bg-[#3E3859] hidden md:block">
			<div class="flex flex-col w-full h-full pt-20 pb-5 overflow-hidden">
				<div class="flex-1 h-full overflow-y-auto">
					<ul class="flex flex-col w-full pl-10 gap-y-6">
						{#each navigation as menu, i (menu.href)}
							{#if menu.href === '/logout'}
								<li class="py-4">
									<hr class=" bg-white opacity-30 w-[80%]  justify-center" />
								</li>
							{/if}
							<li class="" title={menu.title}>
								{#if menu.href === '/logout'}
									<a
										on:click|preventDefault={() => signOut('/login')}
										href={menu.href}
										class="flex items-center pl-6  text-[#959BA5] py-1"
									>
										{@html menu.icon}
										<span class="ml-3 text-base font-medium font-poppins">{menu.label}</span>
									</a>
								{:else}
									<a
										href={menu.href}
										class="flex items-center pl-6 {(i === 0 && $page.url.pathname === '/') ||
										(i > 0 &&
											$page.url.pathname !== '/' &&
											$page.url.pathname.startsWith(menu.href))
											? 'bg-[#E7E7E7] rounded-l-full py-4 text-black'
											: ' text-[#959BA5] py-1'}"
									>
										{@html menu.icon}
										<span class="ml-3 text-base font-medium font-poppins">{menu.label}</span>
									</a>
								{/if}
							</li>
						{/each}
					</ul>
				</div>

				<!-- frame -->
				<div class="w-[70%] h-[138px] rounded-2xl mx-auto bg-[#584E60]" />
			</div>
		</nav>
		<!-- content -->
		<main class=" bg-[#FFFFFF] px-6 py-10 overflow-hidden w-full h-full">
			<NavigatingIndicator show={fromAway && !queryChange}><slot /></NavigatingIndicator>
		</main>
	</div>
</div>
