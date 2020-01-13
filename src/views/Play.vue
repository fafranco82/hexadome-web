<template>
    <keep-alive>
        <component :is="currentComponent"></component>
    </keep-alive>
</template>

<script>
import {mapGetters} from "vuex";

import GameLobby from "@/components/game-lobby";
import GameRoom from "@/components/game-room";

export default {
    components: {
        GameLobby,
        GameRoom,
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isPlaying"]),
        currentComponent() {
            return this.isPlaying ? GameRoom : GameLobby;
        },
    },
    methods: {},
};
</script>
