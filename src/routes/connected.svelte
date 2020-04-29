<script>
    import {
        joinGroup,
        setGroup,
        playAudio,
        setMute,
        getJoined,
        getMuted,
        getAudio
    } from "./../components/AudioChat.svelte";
    import { onMount } from "svelte";
    import { stores } from "@sapper/app";
    const { page } = stores();
    onMount(async () => {
        if ($page.query.group) {
            let group = parseInt($page.query.group);
            setGroup(group);
        }
        let joined = await getJoined();
        if (!joined) {
            await joinGroup();
        }
    });
</script>

<style>
    h3 {
        font-size: 1.6rem;
        color: #000050;
        text-transform: uppercase;
        display: inline-block;
        vertical-align: middle;
    }

    p {
        font-weight: 300;
        color: #001400;
        line-height: 1.8rem;
        margin-top: 0%;
    }

    /* grid container*/
    .grid-container-welcome {
        width: 100vw;
        height: 100vh;
        margin: 0;
        background-color: #fff8ff;
        z-index: 2;
        display: grid;
        grid-template-columns: 10% 1fr 1fr 1fr 10%;
        grid-template-rows: 1fr 90% 1fr;
        gap: 1px 1px;
        grid-template-areas: ". . up . ." "left content_text content_text content_text right" "mute map down . about";
    }

    /* content welcome*/
    .content_welcome {
        display: grid;
        grid-template-columns: 0.3fr 1.7fr 1fr;
        grid-template-rows: 0.5fr 1.5fr;
        gap: 1px 1px;
        grid-template-areas: "welcome_icon title title" ". text text";
        grid-area: content_text;
        background-color: rgba(255, 248, 255, 0.9);
    }

    /* classes for welcome*/
    .welcome_icon {
        grid-area: welcome_icon;
        display: flex;
        width: 100%;
        height: 75%;
        margin-top: -3%;
        z-index: 2;
    }

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
        width: 100%;
        height: 75%;
        align-items: center;
        padding-left: 1%;
    }

    .button_box {
        display: flex;
        grid-area: text;
        margin-top: 18%;
        margin-right: 10%;
        width: 70%;
        height: 100%;
        align-items: flex-start;
        justify-content: center;
        justify-self: center;
        z-index: 99;
    }

    .button_size {
        height: 35%;
        width: 25%;
        display: flex;
        background-image: url(/images/button.svg);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        color: #001400;
        font-weight: 700;
    }

    .button_size:hover {
        color: #ff00ff;
    }
</style>

<svelte:head>
    <title>Du bist nun verbunden</title>
</svelte:head>
<div class="grid-container-welcome">
    <div class="content_welcome">
        <div
            class="welcome_icon"
            style="background:center / contain no-repeat url(/images/logo.svg);" />
        <div class="welcome_title">
            <h3 style="color: #48957e;">Yeah.</h3>
        </div>
        <div class="welcome_text">
            <p>
                Du bist nun im Museum. Viel Spass beim Durchklicken und Verweilen!
            </p>

        </div>
        <div class="button_box">
            <a rel="prefetch" class="button_size" href="/spanish-flu/7">
                Los geht's!
            </a>
        </div>
    </div>
</div>
