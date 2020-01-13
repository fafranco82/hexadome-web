<template>
    <div>
        <b-card :header="$t('lobby.currentgames')">
            <b-btn v-if="isLoggedIn && !isWaitingGame" v-b-modal.newgame>
                {{ $t("lobby.newgame") }}
            </b-btn>
            <b-card v-for="game in gamelist" :key="game.id" class="my-2">
                <template v-slot:header>
                    {{ game.name }}
                </template>
                <b-row class="my-2">
                    <b-col v-for="player in game.players" :key="player.name">
                        <DisplayPlayer :player="player" />
                    </b-col>
                </b-row>
                <b-row class="my-2">
                    <b-col>
                        <b-btn
                            v-if="isLoggedIn && !isWaitingGame && !game.started"
                            class="mr-2"
                            @click="joinGame(game.id)"
                        >
                            {{ $t("lobby.join") }}
                        </b-btn>
                        <b-btn
                            v-if="isLoggedIn && !isWaitingGame && game.allowSpectators"
                            class="mr-2"
                            @click="watchGame(game.id)"
                        >
                            {{ $t("lobby.watch") }}
                        </b-btn>
                    </b-col>
                </b-row>
            </b-card>
        </b-card>

        <b-modal
            id="newgame"
            :title="$t('lobby.newgame')"
            :ok-title="$t('lobby.newgame')"
            :cancel-title="$t('forms.cancel')"
            size="lg"
            @ok="createGame"
            @show="showNewGame"
            @hidden="clearNewGameForm"
        >
            <b-form>
                <b-form-row>
                    <b-col>
                        <b-form-group label-cols="2" label-align="right" :label="$t('lobby.name')">
                            <b-form-input v-model="gameDetails.name" required />
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group label-cols="2">
                            <b-form-checkbox v-model="gameDetails.allowSpectators">
                                {{ $t("lobby.allowspectators") }}
                            </b-form-checkbox>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-modal>

        <b-modal
            v-if="isWaitingGame"
            id="pendingGame"
            :visible="isWaitingGame"
            :title="pendingGame.name"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
            size="xl"
            :ok-title="$t('lobby.startgame')"
            :ok-disabled="!canStartGame"
            :cancel-title="$t('lobby.leavegame')"
            @ok.prevent="startGame"
            @cancel="leaveGame"
        >
            <b-row>
                <b-col>
                    <b-card class="mb-4" :header="$t('lobby.players')" body-class="py-1">
                        <div v-for="player in pendingGame.players" :key="player.name" class="my-2">
                            <DisplayPlayer class="mr-2" :player="player" />
                            <b-btn v-b-modal.selectdeck variant="secondary" :disabled="player.name !== user.username">
                                {{ $t("lobby.selectdeck") }}
                            </b-btn>
                        </div>
                    </b-card>
                    <b-card class="mb-4" :header="$t('lobby.spectators')" body-class="py-1">
                        <DisplayPlayer
                            v-for="player in pendingGame.spectators"
                            :key="player.name"
                            class="my-2"
                            :player="player"
                        />
                    </b-card>
                </b-col>
                <b-col>
                    <b-card :header="$t('lobby.chat')" body-class="p-0 py-2 px-1">
                        <ChatPanel :messages="pendingGame.messages" @chat="chat" />
                    </b-card>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import DisplayPlayer from "@/components/display-player";
import ChatPanel from "@/components/chat-panel";

export default {
    components: {
        DisplayPlayer,
        ChatPanel,
    },
    data() {
        return {
            gameDetails: {
                name: "",
                allowSpectators: true,
            },
        };
    },
    computed: {
        ...mapGetters(["user", "isLoggedIn", "gamelist", "isWaitingGame", "pendingGame"]),
        canStartGame() {
            if (!this.user || !this.pendingGame) return false;
            //if (this._.some(this.pendingGame.players, p => !p.deck || !p.deck.selected)) return false;
            return this.user.username === this.pendingGame.owner;
        },
    },
    methods: {
        showNewGame() {
            this.gameDetails.name = this.$t("lobby.newgamename", {name: this.user.username});
        },
        clearNewGameForm() {},
        createGame() {
            this.$socket.emit("newgame", this.gameDetails);
        },
        joinGame(gameId) {
            this.$socket.emit("joingame", gameId);
        },
        startGame() {
            this.$socket.emit("startgame", this.pendingGame.id);
        },
        watchGame(gameId) {
            this.$socket.emit("watchgame", gameId);
        },
        leaveGame() {
            this.$socket.emit("leavegame", this.pendingGame.id);
        },
        chat(message) {
            this.$socket.emit("gamechat", message);
        },
    },
};
</script>
