<template>
    <div>
        <h1 v-if="!isLoggedIn">Please, log in</h1>
        <h1 v-if="isLoggedIn">Welcome, {{ user.username }}!</h1>
        <h3>Users list:</h3>
        <ul>
            <li v-for="user in userslist" :key="user._id">{{ user.username }}</li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isLoggedIn", "user", "userslist"]),
    },
};
</script>
