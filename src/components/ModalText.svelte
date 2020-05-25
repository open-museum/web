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
</script>

<style>
    h4 {
        font-size: 1.3rem;
        color: #000050;
        text-transform: uppercase;
        vertical-align: middle;
    }
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
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1em;
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

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <button class="close-button" on:click={close}>x</button>
    <h4>About</h4>
    <small>
        Das open-museum ist ein unabhängiges digitales Museum und ist im Rahmen
        des #VersusVirus-Hackathon innerhalb von 48 Stunden entstanden. Es ist
        uns ein Anliegen, dass trotz der Einschränkungen im Rahmen der
        Covid-19-Pandemie Kunst und Kultur gemeinsam entdeckt werden können. Die
        Audiochat-Funktion ermöglicht die Kommunikation mit anderen
        Besucher*innen - fast wie in einem “echten” Museum.
    </small>
    <br />

    <small>
        Unser Museum baut vollständig auf gemeinfreien Inhalten auf.
        <a href="https://collections.open-museum.ch/" target="_blank">Hier</a>
        kannst du in unserer Sammlung stöbern. Kennst du weitere gemeinfreie
        Inhalte (Fotos, Dokumente, Zeugnisse, Videos etc.), die unsere
        Ausstellung zur Spanischen Grippe ergänzen könnten? Schreib uns eine
        E-Mail.
    </small>
    <br />

    <small>
        Der
        <a href="https://github.com/open-museum/open-museum.ch" target="_blank">
            Quellcode
        </a>
        von open-museum ist offen und kann heruntergeladen werden. Angaben zur
        Lizenz und zu den verwendeten Bibliotheken finden sich ebenfalls unter
        dieser Adresse.
    </small>
    <br />

    <small>
        Der Inhalt darf, sofern nicht anders angegeben, unter den Bedingungen
        von
        <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank">
            CC-BY-SA-NC 4.0
        </a>
        weiterverwendet werden.
    </small>
    <br />

    <small>
        Gefällt das open-museum? Wir nehmen
        <a href="https://spenden.open-museum.ch/" target="_blank">Spenden</a>
        entgegen.
    </small>
    <br />

    <small>Konzept: Moritz Mähr, Maja Škrkić, Selina Stuber</small>
    <br />
    <small>Kuration und Redaktion: Maja Škrkić, Selina Stuber</small>
    <br />
    <small>
        Recherche und Texte: Manuela Coldesina, Henrike Hoffmann, Michael Kempf
    </small>
    <br />
    <small>Gestaltung: Aline Mähr, Johanna Ott</small>
    <br />
    <small>Programmierung: Aline Mähr, Moritz Mähr</small>
    <br />

    <h4>Kontakt</h4>

    <small>info@open-museum.ch</small>
    <br />
    <small>open-museum.ch</small>
    <br />

    <h4>Impressum / Urheberrechte</h4>

    <small>Verein open-museum.ch</small>
    <br />
    <small>Stauffacherstrasse 98</small>
    <br />
    <small>CH-8004 Zürich</small>
</div>
