<script>
	import AudioChat from './../components/AudioChat.svelte';
	import Matomo, { matomo } from '@dexlib/svelte-matomo';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const url = 'https://analytics.open-museum.ch';
	const siteId = 2;

	$: if ($page) matomo.trackPageView();

	onMount(() => {
		matomo.trackPageView();
	});
</script>

<slot />
<Matomo {url} {siteId} />
<AudioChat />
