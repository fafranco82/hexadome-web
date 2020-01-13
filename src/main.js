import Vue from "vue";
import Axios from "axios";

import "./plugins/bootstrap-vue";
import "./plugins/font-awesome";
import "./plugins/validation";
import "./plugins/notifications";
import "./plugins/gravatar";
import "./plugins/moment";
import "./plugins/chat-scroll";
import "./plugins/lodash";
import "./plugins/konva";
import "./plugins/panzoom";
import "./plugins/icons";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "./socket.js";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = "Bearer " + token;
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            return next();
        }
        next({
            name: "login",
            params: {
                nextUrl: to.fullPath,
            },
        });
    } else {
        next();
    }
});

new Vue({
    router,
    i18n,
    store,
    created: function() {
        //this.$store.dispatch("fetchCards");
        this.$store.dispatch("fetchCharacters");
    },
    render: h => h(App),
}).$mount("#app");
