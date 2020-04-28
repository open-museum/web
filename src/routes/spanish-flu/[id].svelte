<script context="module">
    export async function preload({ params, query }) {
        // the `id` parameter is available because
        // this file is called [id].svelte
        const res = await this.fetch(`spanish-flu/${params.id}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return {
                room: data
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import { onMount } from "svelte";
    import {
        setMute,
        getMuted,
        getJoined,
        joinGroup
    } from "./../../components/AudioChat.svelte";

    let muted = false;

    onMount(async () => {
        let joined = await getJoined();
        if (!joined) {
            await toggleMute();
        }
    });

    async function toggleMute() {
        muted = !muted;
        await setMute(muted);
    }

    export let room;

    import Modal from "./../../components/Modal.svelte";
    import ModalText from "./../../components/ModalText.svelte";
    let showAbout = false;
    let showImage1 = false;
    let showImage2 = false;
    let showImageLandscape = false;
    let showMap = false;
</script>

<style>
    /* define font size and colour for header*/

    h3 {
        font-size: 1.6rem;
        color: #000050;
        text-transform: uppercase;
        vertical-align: middle;
    }

    p {
        font-weight: 300;
        color: #001400;
        line-height: 1.8rem;
        margin-top: 0%;
    }

    .small {
        color: #001400;
        font-size: 0.6rem;
        vertical-align: middle;
        line-height: 0.9rem;
    }

    .rights {
        color: #001400;
        font-size: 0.6rem;
        vertical-align: middle;
        line-height: 1.4em;
    }

    .rights_font {
        font-family: "Open Sans", serif;
        font-size: 0.7rem;
        font-style: italic;
        color: #001400;
        line-height: 1.24em;
    }

    /* grid container*/

    .grid-container {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background-color: #fff8ff;
        display: grid;
        grid-template-columns: 10% 1fr 1fr 1fr 10%;
        grid-template-rows: 1fr 75% 1fr;
        gap: 1px 1px;
        grid-template-areas: ". . up . ." "left content_text content_text content_text right" "mute map down . about";
        z-index: 2;
    }

    .grid-container-welcome {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background-color: #fff8ff;
        display: grid;
        grid-template-columns: 10% 1fr 1fr 1fr 10%;
        grid-template-rows: 1fr 90% 1fr;
        gap: 1px 1px;
        grid-template-areas: ". . up . ." "left content_text content_text content_text right" "mute map down . about";
        z-index: 2;
    }

    /* navigation*/

    .up {
        grid-area: up;
        width: 15%;
        height: 100%;
        z-index: 2;
        justify-self: center;
        align-self: start;
    }

    .up_img {
        position: relative;
        width: 100%;
    }

    .up_background {
        grid-area: up;
        width: 100%;
        background-image: url(/images/navi_up.svg);
        background-size: 40%;
        background-repeat: no-repeat;
        background-position: top center;
    }

    .down {
        grid-area: down;
        width: 15%;
        z-index: 2;
        justify-self: center;
        align-self: flex-end;
    }

    .down_img {
        position: relative;
        width: 100%;
    }

    .down_background {
        grid-area: down;
        width: 100%;
        background-image: url(/images/navi_down.svg);
        background-size: 40%;
        background-repeat: no-repeat;
        background-position: bottom center;
    }

    .left {
        grid-area: left;
        width: 100%;
        place-self: center;
        z-index: 2;
    }

    .left_img {
        margin-left: 0;
        position: relative;
        width: 40%;
    }

    .left_background {
        grid-area: left;
        width: 100%;
        background-image: url(/images/navi_left.svg);
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: left center;
    }

    .right {
        grid-area: right;
        width: 100%;
        align-self: center;
        z-index: 2;
    }

    .right_img {
        position: relative;
        margin-right: 0;
        width: 40%;
        left: 60%;
    }

    .right_background {
        grid-area: right;
        width: 100%;
        background-image: url(/images/navi_right.svg);
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: right center;
    }

    .mute {
        grid-area: mute;
        position: relative;
        justify-self: end;
        align-self: center;
        width: 70%;
        left: 15%;
    }

    .mute img {
        width: 75%;
    }

    .map {
        grid-area: map;
        position: relative;
        justify-self: start;
        align-self: center;
        width: 26%;
    }

    .map img {
        width: 80%;
    }

    .about {
        grid-area: about;
        place-self: center;
        width: 85%;
        padding-left: 7%;
    }

    /* icon and title*/

    .icon {
        grid-area: icon;
        display: flex;
        width: 40%;
        place-self: center;
        z-index: 2;
    }

    .icon_background {
        grid-area: icon;
        width: 100%;
        height: 100%;
        /* background-image: url(/images/icon_background.svg); */
        /* background-size: 80%; */
        background-repeat: no-repeat;
        background-position: center;
    }

    .title {
        grid-area: title;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .responsive {
        width: 100%;
        height: auto;
    }

    /* content styles*/

    .content_landscape {
        display: grid;
        grid-template-columns: 0.5fr 1.7fr 0.8fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        padding-top: 2%;
        grid-template-areas: "icon title image1" ". image_landscape rights";
        grid-area: content_text;
        border: 0.5px solid #001400;
        background-color: rgba(255, 248, 255, 0.9);
    }

    .content_mixed {
        display: grid;
        grid-template-columns: 0.5fr 1.7fr 0.8fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        padding-top: 2%;
        grid-template-areas: "icon title image1" ". text rights";
        grid-area: content_text;
        border: 0.5px solid #001400;
        background-color: rgba(255, 248, 255, 0.9);
    }

    .content_text {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr 1fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        padding-top: 2%;
        grid-template-areas: "icon title title" ". text text";
        grid-area: content_text;
        border: 0.5px solid #001400;
        background-color: rgba(255, 248, 255, 0.9);
    }

    .content_welcome {
        display: grid;
        grid-template-columns: 0.3fr 1.7fr 1fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        grid-template-areas: "icon title title" ". text text";
        grid-area: content_text;
        background-color: rgba(255, 248, 255, 0.9);
    }

    /* classes for minigame*/
    .content_embed {
        display: grid;
        grid-template-columns: 0.3fr 1.7fr 1fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        grid-template-areas: "minigame minigame minigame" "minigame minigame minigame";
        grid-area: content_text;
        background-color: rgba(255, 248, 255, 0.9);
    }

    .minigame {
        grid-area: minigame;
        width: 100%;
        height: 100%;
    }

    .minigame embed {
        width: 100%;
        height: 100%;
    }

    /* classes for content_landscape*/

    .caption {
        grid-area: rights;
        display: flex;
        width: 80%;
        height: 45%;
        place-self: start;
        margin-top: 5%;
        margin-left: 15%;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
    }

    .caption p {
        line-height: 1.3rem;
    }

    .image_landscape {
        grid-area: image_landscape;
        width: 100%;
        height: 96%;
        display: flex;
        place-self: start;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .image_landscape:hover {
        opacity: 0.7;
    }

    .image_landscape img {
        object-fit: cover;
        width: 100%;
    }

    /* classes for content_mix*/

    .image1 {
        grid-area: image1;
        width: 80%;
        height: 100%;
        display: flex;
        place-self: end;
        margin-right: 5%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .image1 img {
        object-fit: cover;
        width: 100%;
        height: auto;
    }

    .image1:hover {
        opacity: 0.7;
    }

    .image2 {
        grid-area: rights;
        display: flex;
        width: 80%;
        height: 35%;
        place-self: start;
        margin-top: 5%;
        margin-left: 15%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .image2 img {
        object-fit: cover;
        width: 100%;
    }

    .image2:hover {
        opacity: 0.7;
    }

    .text {
        grid-area: text;
        width: 98%;
        overflow: auto;
    }

    .rights {
        grid-area: rights;
        display: flex;
        flex-direction: column;
        position: relative;
        border: 0.5px solid #ff00ff;
        width: 75%;
        height: 35%;
        place-self: end;
        justify-content: center;
        margin-right: 5%;
        padding-left: 3%;
        padding-top: 1%;
        padding-bottom: 1%;
        margin-block-end: 15%;
        background-color: #fff8ff;
        border-style: dotted;
    }

    /*hover for navigation*/

    .big img {
        transition: 0.7s ease;
    }

    .big img:hover {
        -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
        transition: 0.7s ease;
    }

    /* classes for welcome*/

    .welcome_text {
        grid-area: text;
        width: 90%;
        height: 90%;
        display: flex;
        z-index: 2;
        margin-top: -3%;
        padding-left: 1%;
    }

    .welcome_text p {
        font-size: 1rem;
        line-height: 1.5rem;
    }

    .welcome_title {
        grid-area: title;
        display: flex;
        align-items: center;
        width: 100%;
        height: 75%;
        padding-left: 1%;
    }

    .button_box {
        grid-area: text;
        display: flexbox;
        align-self: center;
        justify-self: center;
        width: 70%;
        height: 40%;
        margin-top: 5%;
        margin-right: 10%;
    }

    .hand {
        position: relative;
        align-self: flex-start;
        width: 25%;
        height: 80%;
        align-items: center;
    }

    .hand img {
        width: 100%;
    }

    .button1 {
        position: relative;
        border: 3px solid #ff00ff;
        border-style: dotted;
        border-radius: 10%;
        width: 25%;
        height: 20%;
    }

    .hands {
        position: relative;
        width: 25%;
        height: 80%;
        align-items: center;
        left: 75%;
        bottom: 104%;
    }

    .hands img {
        width: 100%;
    }

    .button2 {
        position: relative;
        border: 3px solid #ff00ff;
        border-style: dotted;
        border-radius: 10%;
        width: 25%;
        height: 20%;
        left: 75%;
        bottom: 104%;
    }
</style>

<svelte:head>
    <title>{room.title}</title>
</svelte:head>
{#if showAbout}
    <ModalText on:close={() => (showAbout = false)} />
{:else if showImage1}
    <Modal
        on:close={() => (showImage1 = false)}
        background="/images/objects/{room.image1}.jpg" />
{:else if showImage2}
    <Modal
        on:close={() => (showImage2 = false)}
        background="/images/objects/{room.image2}.jpg" />
{:else if showImageLandscape}
    <Modal
        on:close={() => (showImageLandscape = false)}
        background="/images/objects/{room.image_landscape}.jpg" />
{:else if showMap}
    <Modal
        on:close={() => (showMap = false)}
        background="/images/floormap.png" />
{:else}
    <div
        class="grid-container"
        style="background-image: url(/images/{room.background});background-repeat:
        no-repeat;background-size:cover;">
        {#if room.up}
            <div class="up big">
                <a rel="prefetch" href="/spanish-flu/{room.up}">
                    <img
                        class="up_img"
                        src="/images/icons/{room.up}.svg"
                        alt="" />
                </a>
            </div>
            <div class="up_background" />
        {/if}
        {#if room.down}
            <div class="down big">
                <a rel="prefetch" href="/spanish-flu/{room.down}">
                    <img
                        class="down_img"
                        src="/images/icons/{room.down}.svg"
                        alt="" />
                </a>
            </div>
            <div class="down_background" />
        {/if}
        {#if room.left}
            <div class="left big">
                <a rel="prefetch" href="/spanish-flu/{room.left}">
                    <img
                        class="left_img"
                        src="/images/icons/{room.left}.svg"
                        alt="" />
                </a>
            </div>
            <div class="left_background" />
        {/if}
        {#if room.right}
            <div class="right big">
                <a rel="prefetch" href="/spanish-flu/{room.right}">
                    <img
                        class="right_img"
                        src="/images/icons/{room.right}.svg"
                        alt="" />
                </a>
            </div>
            <div class="right_background" />
        {/if}
        <div class="mute big">
            {#if muted}
                <img
                    id="toggleaudio"
                    src="images/unmute.svg"
                    alt=""
                    on:click={toggleMute} />
            {:else}
                <img
                    id="toggleaudio"
                    src="images/mute.svg"
                    alt=""
                    on:click={toggleMute} />
            {/if}
        </div>
        <div class="map big">
            <img
                src="images/map.svg"
                alt=""
                on:click={() => (showMap = true)} />
        </div>
        <div class="about big">
            <img
                class="about"
                src="images/logo.svg"
                alt=""
                on:click={() => (showAbout = true)} />
        </div>
        <div class={room.layout}>
            <!-- Icon-->
            {#if room.icon}
                <div
                    class="icon_background"
                    style="background-image:url(/images/icons/{room.icon}.svg),
                    url(/images/icon_background.svg); background-size: 40%,80%;" />
            {:else}
                <div
                    class="icon_background"
                    style="background-image:url(/images/icon_background.svg);" />
            {/if}
            <!-- Titel-->
            {#if room.title}
                <div class="title">
                    <h3>{room.title}</h3>
                </div>
            {/if}
            {#if room.image1}
                <div
                    class="image1 responsive"
                    style="background-image: url(/images/objects/{room.image1}.jpg);background-repeat:
                    no-repeat;background-size:cover;background-position:center;"
                    on:click={() => (showImage1 = true)} />
            {/if}
            {#if room.image2}
                <div
                    class="image2 responsive"
                    style="background-image: url(/images/objects/{room.image2}.jpg);background-repeat:
                    no-repeat;background-size:cover;background-position:center;"
                    on:click={() => (showImage2 = true)} />
            {/if}
            <!-- Text-->
            {#if room.text}
                <div class="text">
                    <p>{room.text}</p>
                </div>
            {/if}
            {#if room.rights && room.rightsowner}
                <div class="rights">
                    <div class="rights_font">Rechteinhaber:</div>
                    <div class="small">{room.rightsowner}</div>
                    <div class="rights_font">
                        <br />
                        Rechte:
                    </div>
                    <div class="small">{room.rights}</div>
                </div>
            {/if}
            {#if room.image_landscape}
                <div
                    class="image_landscape responsive"
                    style="background-image: url(/images/objects/{room.image_landscape}.jpg);background-repeat:
                    no-repeat;background-size:cover;background-position:center;"
                    on:click={() => (showImageLandscape = true)} />
            {/if}
            {#if room.caption}
                <div class="caption">{room.caption}</div>
            {/if}
            {#if room.id == 33}
                <div class="minigame">
                    <embed src="https://minigame.open-museum.ch" />
                </div>
            {/if}
        </div>
    </div>
{/if}
