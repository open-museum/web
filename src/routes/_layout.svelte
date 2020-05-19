<script>
    import AudioChat from "./../components/AudioChat.svelte";
    import Matomo, { matomo } from '@dexlib/svelte-matomo'
    import { stores } from "@sapper/app";
    import { onMount } from "svelte";

    const { page } = stores();

    const url = "https://analytics.open-museum.ch";
    const siteId = 2;

    $: if ($page) matomo.trackPageView();

    onMount(() => {
        matomo.trackPageView();
    });
</script>

<slot />
<Matomo {url} {siteId} />
<AudioChat />
