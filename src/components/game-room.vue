<template>
    <div v-if="gameState">
        <div class="gamezone">
            <PlayerBox :player="topPlayer" />
            <PlayerBox :player="bottomPlayer" />
            <div class="game-board-wrapper panel">
                <GameBoard ref="gameBoard" />
            </div>
            <div class="game-chat-wrapper panel">
                <ChatPanel :messages="gameState.messages" @chat="chat" />
            </div>
        </div>

        <div class="prompt-wrapper" v-draggable="draggable.prompt">
            <PlayerPrompt :player="bottomPlayer" />
        </div>

        <div class="dice-tray-wrapper" v-draggable="draggable.dicetray">
            <DiceTray :topPlayer="topPlayer" :bottomPlayer="bottomPlayer" />
        </div>
    </div>
    <div v-else>
        No game
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

import {Draggable} from "draggable-vue-directive";

import PlayerBox from "@/components/game-board/player-box";
import PlayerPrompt from "@/components/game-board/player-prompt";
import DiceTray from "@/components/game-board/dice-tray";
import GameBoard from "@/components/game-board/game-board";

import ChatPanel from "@/components/chat-panel";

export default {
    components: {
        PlayerBox,
        PlayerPrompt,
        DiceTray,
        GameBoard,
        ChatPanel,
    },
    directives: {
        Draggable,
    },
    data() {
        return {
            draggable: {
                prompt: {
                    initialPosition: {
                        top: 100,
                        left: 100,
                    },
                },
                dicetray: {
                    initialPosition: {
                        top: 100,
                        left: 400,
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters(["user", "gameState"]),
        bottomPlayer() {
            return this.gameState.players[this.user.username] || this.gameState.players[this.gameState.owner];
        },
        topPlayer() {
            let opponents = Object.keys(this.gameState.players).filter(n => n !== this.bottomPlayer.name);
            if (opponents.length == 0) {
                return;
            }
            return this.gameState.players[opponents[0]];
        },
    },
    methods: {
        ...mapActions(["sendGameCommand"]),
        chat(message) {
            this.sendGameCommand({command: "chat", args: [message]});
        },
    },
};
</script>

<style lang="scss">
.gamezone {
    color: white;
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: grid;
    grid-template-columns: 425px 1fr 300px;
    grid-template-rows: 1fr 1fr;

    .panel {
        position: relative;
    }

    .game-board-wrapper {
        grid-column: 2 / span 1;
        grid-row: 1 / span 2;
        overflow: hidden;
    }

    .game-chat-wrapper {
        grid-column: 3 / span 1;
        grid-row: 1 / span 2;
    }
}
</style>
