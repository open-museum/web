<script context="module">
    let janus;
    let mixer;
    let webrtcUp = false;
    let showConsentDialog = false;
    let muted = true;
    let audio;
    let paused = true;
    let group = 1234;
    let joined = false;

    // Groups
    export function setGroup(new_number) {
        if (new_number > 0 && new_number <= 999999)
            group = parseInt(new_number);
    }
    export function getGroup() {
        return group;
    }
    export function createRoom(new_group) {
        let content = { request: "create", room: new_group };
        mixer.send({ message: content });
    }
    export function joinGroup() {
        let content = {
            request: "join",
            room: group
        };
        mixer.send({ message: content });
    }
    export function getJoined() {
        return joined;
    }
    export function leaveGroup() {
        let content = {
            request: "leave",
            room: group
        };
        mixer.send({ message: content });
    }

    // Helper functions
    export function numberOfParticipants(room) {
        let content = { request: "listparticipants", room: room };
        mixer.send({ message: content });
    }
    export function destroyJanus() {
        janus.destroy();
    }

    // Audio
    export async function setMute(state) {
        muted = state;
        let mute = { request: "configure", muted: muted };
        await mixer.send({ message: mute });
    }
    export async function getMuted() {
        return muted;
    }
    export async function getAudio() {
        return audio;
    }
    export async function playAudio() {
        if (paused) {
            let startPlayPromise = audio.play();
            if (startPlayPromise !== undefined) {
                startPlayPromise
                    .then(() => {
                        paused = false;
                    })
                    .catch(error => {
                        if (error.name === "NotAllowedError") {
                            alert(
                                "Autoplay ist blockiert. Du kannst die anderen Besucher*innen nicht hören."
                            );
                        } else {
                            // Handle a load or playback error
                        }
                    });
            }
        }
    }
    export async function pauseAudio() {
        if (!paused) {
            audio.pause();
            paused = true;
        }
    }
</script>

<script>
    import { onMount } from "svelte";
    import { Janus } from "janus-gateway";
    import { goto } from "$app/navigation";

    onMount(async () => {
        await Janus.init({
            // TODO disable debug
            debug: "all",
            dependencies: Janus.useDefaultDependencies(),
            callback: function() {
                if (!Janus.isWebrtcSupported()) {
                    Janus.error("  -- WebRTC not supported ", error);
                    error = encodeURIComponent(
                        "Dein Browser unterstützt kein WebRTC."
                    );
                    goto("/sorry?error=" + error);
                }
                janus = new Janus({
                    server: [
                        "wss://" + window.location.hostname + ":2096",
                        "ws://" + window.location.hostname + ":2095"
                    ],
                    success: function() {
                        Janus.log(" ::: new Janus() successful :::");
                        janus.attach({
                            plugin: "janus.plugin.audiobridge",
                            success: function(pluginHandle) {
                                Janus.debug(" ::: Plugin attached :::");
                                mixer = pluginHandle;
                            },
                            error: function(cause) {
                                Janus.error(
                                    " ::: Got an error while janus.attach() :::",
                                    cause
                                );
                                error = encodeURIComponent(
                                    "Der Audiochat macht Probleme."
                                );
                                goto("/sorry?error=" + error);
                            },
                            consentDialog: function(state) {
                                showConsentDialog = state;
                                Janus.debug(
                                    " ::: showConsentDialog is " +
                                        showConsentDialog +
                                        " :::"
                                );
                            },
                            webrtcState: function(state, description) {
                                if (state) {
                                    Janus.debug(
                                        " ::: webrtc state is true :::"
                                    );
                                } else {
                                    Janus.error(
                                        " ::: webrtc state is false :::",
                                        description
                                    );
                                }
                            },
                            iceState: function(state) {
                                Janus.debug(
                                    " ::: iceState is " + state + " :::"
                                );
                            },
                            mediaState: function(state) {
                                Janus.debug(
                                    " ::: mediaState is " + state + " :::"
                                );
                            },
                            onmessage: function(msg, jsep) {
                                Janus.debug(" ::: Got a message :::");
                                Janus.debug(msg);
                                let event = msg["audiobridge"];
                                Janus.debug("Event: " + event);
                                if (event === "created") {
                                    Janus.debug(" ::: room created :::");
                                    // TODO feedback to group new?
                                }
                                if (event === "joined") {
                                    // Successfully joined, negotiate WebRTC now
                                    if (msg["id"]) {
                                        Janus.log(
                                            "Successfully joined room " +
                                                msg["room"] +
                                                " with ID " +
                                                msg["id"]
                                        );
                                        joined = true;
                                        // Publish our stream
                                        if (!webrtcUp) {
                                            webrtcUp = true;
                                            // Publish our stream
                                            mixer.createOffer({
                                                media: { video: false }, // This is an audio only room
                                                success: function(jsep) {
                                                    Janus.debug("Got SDP!");
                                                    Janus.debug(jsep);
                                                    let publish = {
                                                        request: "configure",
                                                        muted: muted
                                                    };
                                                    mixer.send({
                                                        message: publish,
                                                        jsep: jsep
                                                    });
                                                },
                                                error: async function(error) {
                                                    Janus.error(
                                                        "WebRTC error:",
                                                        error
                                                    );
                                                    error = encodeURIComponent(
                                                        "Wahrscheinlich ist dein Mikrofon nicht freigegeben."
                                                    );
                                                    goto(
                                                        "/sorry?error=" + error
                                                    );
                                                }
                                            });
                                        }
                                    }
                                    if (
                                        msg["participants"] !== undefined &&
                                        msg["participants"] !== null
                                    ) {
                                        var list = msg["participants"];
                                        Janus.debug(
                                            "Got a list of participants:"
                                        );
                                        Janus.debug(list);
                                        if (list.length >= 20) {
                                            if (x >= 1234 && x <= 1253) {
                                                // You need to manually add these room numbers to janus.plugin.audiobridge.jcfg
                                                nextPublicGroup = group + 1;
                                                goto(
                                                    "/connected?group=" +
                                                        nextPublicGroup
                                                );
                                            } else {
                                                alert(
                                                    "Die gewünschte Gruppe " +
                                                        group +
                                                        " hat zuviele Mitglieder. Versuchs doch nochmal."
                                                );
                                                goto("/group_new");
                                            }
                                        }
                                    }
                                }
                                if (event === "roomchanged") {
                                    // The user switched to a different room
                                    Janus.log("Moved to room " + msg["room"]);
                                }
                                if (event === "destroyed") {
                                    // The room has been destroyed
                                    Janus.warn("The room has been destroyed!");
                                    joined = true;
                                    window.location.reload();
                                }
                                if (event === "event") {
                                    if (
                                        msg["participants"] !== undefined &&
                                        msg["participants"] !== null
                                    ) {
                                        var list = msg["participants"];
                                        Janus.debug(
                                            "Got a list of participants:"
                                        );
                                        Janus.debug(list);
                                        if (list.length >= 20) {
                                            // TODO leave
                                            alert(
                                                "Die gewünschte Gruppe " +
                                                    group +
                                                    " hat zuviele Mitglieder. Versuchs doch nochmal."
                                            );
                                            goto("/group_new");
                                        }
                                    } else if (
                                        msg["error"] !== undefined &&
                                        msg["error"] !== null
                                    ) {
                                        if (msg["error_code"] === 485) {
                                            alert(
                                                "Die gewünschte Gruppe " +
                                                    group +
                                                    " ist nicht verfügbar. Versuchs doch nochmal."
                                            );
                                            goto("/group_existing");
                                        } else if (msg["error_code"] === 486) {
                                            alert(
                                                "Die gewünschte Gruppe " +
                                                    group +
                                                    " exitiert bereits. Versuchs doch nochmal."
                                            );
                                            goto("/group_new");
                                        } else if (msg["error_code"] === 487) {
                                            // Not in a room
                                            joinGroup();
                                        } else if (msg["error_code"] === 491) {
                                            // Already joined
                                        } else {
                                            error = encodeURIComponent(
                                                "Ein unbekannter Fehler mit dem Audiochat ist aufgetreten."
                                            );
                                            goto("/sorry?error=" + error);
                                        }
                                        return;
                                    }
                                    // Any new feed to attach to?
                                    if (
                                        msg["leaving"] !== undefined &&
                                        msg["leaving"] !== null
                                    ) {
                                        // One of the participants has gone away?
                                        var leaving = msg["leaving"];
                                        Janus.log(
                                            "Participant left: " +
                                                leaving +
                                                " (we have " +
                                                leaving.length +
                                                " elements with ID #rp" +
                                                leaving +
                                                ")"
                                        );
                                    }
                                }
                                if (jsep !== undefined && jsep !== null) {
                                    Janus.debug("Handling SDP as well...");
                                    Janus.debug(jsep);
                                    mixer.handleRemoteJsep({ jsep: jsep });
                                }
                            },
                            onlocalstream: function(stream) {
                                // We have a local stream (getUserMedia worked!) to display
                                Janus.debug(" ::: Got a local stream :::");
                                Janus.debug(stream);
                                // We're not going to attach the local audio stream
                            },
                            onremotestream: function(stream) {
                                // We have a remote stream (working PeerConnection!) to display
                                Janus.debug(" ::: Got a remote stream :::");
                                Janus.debug(stream);
                                Janus.attachMediaStream(audio, stream);
                                playAudio();
                                setMute(false);
                            },
                            oncleanup: async function() {
                                // PeerConnection with the plugin closed, clean the UI
                                // The plugin handle is still valid so we can create a new one
                                webrtcUp = false;
                                Janus.debug(
                                    " ::: Got a cleanup notification :::"
                                );
                            },
                            detached: async function() {
                                // Connection with the plugin closed, get rid of its features
                                // The plugin handle is not valid anymore
                                mixer = null;
                                Janus.debug(" ::: Plugin detached :::");
                            }
                        });
                    },
                    error: async function(cause) {
                        // Error, can't go on...
                        Janus.error(
                            " ::: Got an error while new Janus() :::",
                            cause
                        );
                        await goto("/sorry");
                    },
                    destroyed: async function() {
                        // I should get rid of this
                        Janus.debug(
                            " ::: Got a destroyed notification :::"
                        );
                        await goto("/");
                    }
                });
            }
        });
    });
</script>

<style>
    .hide {
        display: none;
    }
</style>

<div class="hide">
    <!-- <audio bind:this={audio} bind:paused controls autoplay /> -->
    <audio bind:this={audio} bind:paused controls />
</div>
