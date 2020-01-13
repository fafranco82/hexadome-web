import Vue from "vue";
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";

import store from "./store";
import config from "./config";

const socket = io(config.API, {
    query: {
        token: store.state.token,
    },
});

Vue.use(VueSocketio, socket, {store});

export default socket;
