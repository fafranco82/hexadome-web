import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import SocketIO from "socket.io-client";
import $socket from "./socket";
import $router from "./router";
import config from "@/config";
import {Grid} from "@/grid";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        cards: {},
        characters: {},
        userslist: [],
        gamelist: [],
        previewCard: undefined,
        pendingGame: undefined,
        gameNode: undefined,
        gameSocket: undefined,
        gameState: undefined,
        grid: undefined,
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
        cards: state => state.cards,
        characters: state => state.characters,
        userslist: state => state.userslist,
        gamelist: state => state.gamelist,
        previewCard: state => state.previewCard,
        pendingGame: state => state.pendingGame,
        gameState: state => state.gameState,
        isWaitingGame: state => !!state.pendingGame,
        isPlaying: state => !!state.gameNode,
        grid: state => Grid(JSON.parse(state.gameState.board)),
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },

        auth_success(state, {token, user}) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },

        auth_error(state) {
            state.status = "error";
        },

        logout(state) {
            state.status = "";
            state.token = "";
            state.user = {};
        },

        cards(state, cards) {
            state.cards = cards;
        },

        characters(state, characters) {
            state.characters = characters;
        },

        set_preview(state, code) {
            state.previewCard = code;
        },

        clear_preview(state) {
            state.previewCard = undefined;
        },

        game_node(state, gameNode) {
            state.gameNode = gameNode;
            state.pendingGame = undefined;
        },

        game_socket(state, socket) {
            state.gameSocket = socket;
        },

        game_state(state, gameState) {
            state.gameState = gameState;
        },

        clear_game_state(state) {
            state.gameNode = undefined;
            state.gameSocket = undefined;
            state.gameState = undefined;
        },

        //SOCKET MUTATIONS
        SOCKET_USERS(state, users) {
            state.userslist = users;
        },

        SOCKET_GAMES(state, games) {
            state.gamelist = games;
        },

        SOCKET_GAMESTATE(state, game) {
            state.pendingGame = game;
        },

        SOCKET_CLEARGAMESTATE(state) {
            state.pendingGame = undefined;
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: config.API + "/account/login",
                    data: user,
                    method: "POST",
                })
                    .then(resp => {
                        if (resp.data.success) {
                            const token = resp.data.token;
                            const user = resp.data.user;
                            localStorage.setItem("token", token);
                            localStorage.setItem("user", JSON.stringify(user));
                            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                            commit("auth_success", {token, user});
                            $socket.emit("authenticate", token);
                            resolve(resp);
                        } else {
                            reject(resp.data.message);
                        }
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },

        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: config.API + "/account/register",
                    data: user,
                    method: "POST",
                })
                    .then(resp => {
                        if (resp.data.success) {
                            const token = resp.data.token;
                            const user = resp.data.user;
                            localStorage.setItem("token", token);
                            localStorage.setItem("user", JSON.stringify("user"));
                            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                            commit("auth_success", {token, user});
                            $socket.emit("authenticate", token);
                            resolve(resp);
                        } else {
                            reject(resp.data.message);
                        }
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },

        logout({commit}) {
            return new Promise(resolve => {
                commit("logout");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },

        fetchCards({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get(config.API + "/cards")
                    .then(resp => {
                        if (resp.data.success) {
                            commit("cards", resp.data.cards);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        fetchCharacters({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get(config.API + "/characters")
                    .then(resp => {
                        if (resp.data.success) {
                            commit("characters", resp.data.characters);
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        sendGameCommand({state}, {command, args}) {
            state.gameSocket.emit("game", command, ...args);
        },

        //SOCKET ACTIONS
        socket_authfailed({dispatch}) {
            return dispatch("logout").then(() => {
                $router.push({name: "login"});
            });
        },

        socket_handoff({commit}, gameNode) {
            commit("game_node", gameNode);
            let socket = SocketIO(`${gameNode.protocol}://${gameNode.address}:${gameNode.port}`, {
                path: `/${gameNode.name}/socket.io`,
                query: {
                    token: gameNode.authToken,
                },
            });
            socket.on("gamestate", gameState => {
                commit("game_state", gameState);
            });
            socket.on("cleargamestate", () => {
                socket.close();
                commit("clear_game_state");
            });
            commit("game_socket", socket);
        },
    },
});
