<template>
    <div v-if="player.prompt.active" class="prompt">
        <b-card header-class="p-2" body-class="p-2">
            <template v-if="player.prompt.promptTitle" v-slot:header>
                <ChatFragments :fragments="player.prompt.promptTitle" />
            </template>
            <div>
                <ChatFragments :fragments="player.prompt.menuTitle" />
            </div>
            <div>
                <b-btn
                    v-for="(button, i) in player.prompt.buttons"
                    :key="i"
                    block
                    @click="clickedPrompt(button)"
                    class="mt-2"
                >
                    <ChatFragments :fragments="button.text" />
                </b-btn>
            </div>
        </b-card>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import ChatFragments from "@/components/chat/chat-fragments";

export default {
    components: {
        ChatFragments,
    },
    props: {
        player: {
            prompt: {
                type: Object,
                default: function() {
                    return {
                        active: false,
                    };
                },
            },
        },
    },
    methods: {
        ...mapActions(["sendGameCommand"]),
        clickedPrompt(button) {
            let args = Array.isArray(button.arg) ? button.arg : [button.arg];
            this.sendGameCommand({command: button.command, args: args});
        },
    },
};
</script>

<style lang="scss">
div.prompt {
    width: 300px;
    //filter: opacity(90%);
}
</style>
