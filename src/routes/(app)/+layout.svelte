<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	let navigation: typeof data['navigation'];

	$: {
		({ navigation } = data);
	}
</script>

<div class="w-full h-full bg-[#BEBDC0] md:p-10">
	<div
		class="wrapper md:bg-[#E7E7E7] md:rounded-3xl h-full relative overflow-hidden w-full flex items-stretch"
	>
		<!-- side bar -->
		<nav class="w-[272px] bg-[#3E3859] hidden md:block">
			<div class="flex overflow-hidden pt-20 pb-5 flex-col h-full w-full">
				<div class="overflow-y-auto h-full flex-1">
					<ul class="pl-10 w-full flex flex-col gap-y-6">
						{#each navigation as menu, i (menu.href)}
							{#if menu.href === '/settings'}
								<li class="py-4">
									<hr class=" bg-white opacity-30 w-[80%]  justify-center" />
								</li>
							{/if}
							<li class="" title={menu.title}>
								<a
									href={menu.href}
									class="flex items-center pl-6 {(i === 0 && $page.url.pathname === '/') ||
									(i > 0 && $page.url.pathname !== '/' && $page.url.pathname.startsWith(menu.href))
										? 'bg-[#E7E7E7] rounded-l-full py-4 text-black'
										: ' text-[#959BA5] py-1'}"
								>
									<svelte:component this={menu.icon} />
									<span class="ml-3 text-base font-medium font-poppins">{menu.label}</span>
								</a>
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
			<slot />
		</main>
	</div>
</div>
