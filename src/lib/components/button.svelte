<script>
	export let classNames = '';
</script>

<button
	on:click
	class="w-full bg-[#3E3859] px-10 py-3 text-white rounded-lg hover:ring-4 hover:ring-purple-500 focus:ring-4 focus:ring-purple-500 outline-none shadow-fuchsia-500 {classNames}"
>
	<slot>Submit</slot>
</button>
