<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`spanish-flu.json`).then(r => r.json()).then(rooms => {
			return { rooms };
		});
	}
</script>

<script>
	export let rooms;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>spanish-flu</title>
</svelte:head>

<h1>rooms</h1>

<ul>
	{#each rooms as room}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='spanish-flu/{room.id}'>{room.title}</a> (id: {room.id})</li>
	{/each}
</ul>