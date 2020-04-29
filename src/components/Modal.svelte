<script>
    import { createEventDispatcher, onDestroy } from "svelte";

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    let modal;

    const handle_keydown = e => {
        if (e.key === "Escape") {
            close();
            return;
        }

        if (e.key === "Tab") {
            // trap focus
            const nodes = modal.querySelectorAll("*");
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
    };

    const previously_focused =
        typeof document !== "undefined" && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }

    export let background;
</script>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #001400;
        z-index: 9;
    }
    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(100vw - 8em);
        height: calc(100vh - 2em);
        transform: translate(-50%, -50%);
        border-radius: 0.2em;
        background: #fff8ff;
        z-index: 10;
    }

    .modal .close-button {
        position: absolute;
        z-index: 11;
        top: 10px;
        right: 20px;
        color: #ff00ff;
        padding: 5px 5px;
        font-size: 1.8rem;
        font-weight: 700;
        background-color: transparent;
        border: none;
    }
</style>

<svelte:window on:keydown={handle_keydown} />
<div class="modal-background" />
<div
    class="modal"
    style="background-image: url({background});background-repeat:
    no-repeat;background-size:contain;background-position:center;">
    <button class="close-button" on:click={close}>x</button>
</div>
