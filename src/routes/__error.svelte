<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(async () => {
		console.log(status + error.message);
		goto('/');
	});
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
