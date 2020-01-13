<template>
    <b-navbar toggeable="md" type="light" variant="light">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/" exact>Hexadome</b-navbar-brand>

            <b-collapse id="nav_collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/play">{{ $t("nav.play") }}</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="isLoggedIn && isPlaying" @click="leaveGame">{{
                        $t("lobby.leavegame")
                    }}</b-nav-item>
                    <b-nav-item v-if="!isLoggedIn" to="/login">{{ $t("nav.login") }}</b-nav-item>
                    <b-nav-item v-if="!isLoggedIn" to="/register">{{ $t("nav.register") }}</b-nav-item>
                    <b-nav-item-dropdown v-if="isLoggedIn" right>
                        <template #button-content>
                            <Gravatar :hash="user.gravatar" :size="24" />
                            {{ $t("nav.username", {name: user.username}) }}
                        </template>
                        <b-dropdown-item @click.prevent="logout">{{ $t("nav.logout") }}</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <span class="lang-sm" :lang="$i18n.locale"></span>
                        </template>
                        <b-dropdown-item v-for="lang in langs" :key="lang" @click.prevent="changeLocale(lang)">
                            <span :lang="lang" class="lang-sm lang-lbl lang-lbl-full"></span>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    data() {
        return {
            langs: ["en", "es"],
        };
    },
    created: function() {
        if (this.user.locale) {
            this.changeLocale(this.user.locale);
        }
    },
    computed: {
        ...mapGetters(["isLoggedIn", "user", "isPlaying"]),
    },
    watch: {
        isLoggedIn: function(val) {
            if (val) {
                this.changeLocale(this.user.locale);
            }
        },
    },
    methods: {
        ...mapActions(["sendGameCommand"]),
        changeLocale(locale) {
            this.$i18n.locale = locale;
            this.$moment.locale(locale);
        },
        logout() {
            let name = this.$store.state.user.username;
            this.$store.dispatch("logout").then(() => {
                this.$notify({
                    group: "auth",
                    type: "success",
                    text: this.$t("messages.logout", {name}),
                });
                this.$router.push("/login");
            });
        },
        leaveGame: function() {
            this.sendGameCommand({command: "leavegame", args: []});
        },
    },
};
</script>

<style scoped>
nav.navbar {
    padding: 0px;
}
</style>
