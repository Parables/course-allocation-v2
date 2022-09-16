<script>
	import { page } from '$app/stores';
	import Grid from 'gridjs-svelte';

	const columns = [
		{
			name: 'Title',
			sort: false
		}
		// {
		// 	name: 'Date',
		// 	formatter: (cell) => {
		// 		return new Date(cell).toLocaleString('en-US', {
		// 			month: 'short',
		// 			year: 'numeric'
		// 		});
		// 	}
		// }
	];
</script>

<Grid
	{columns}
	sort
	search
	pagination={{ enabled: true, limit: 3 }}
	server={{
		url: `${$page.url.origin}/api/courses`,
		then: (data) => {
			console.log('data', data);
			return data.map((course) => {
				return [course.course_name, course.course_code];
			});
		}
	}}
/>
