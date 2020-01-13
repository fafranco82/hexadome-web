<template>
    <div id="app">
        <Menu></Menu>
        <b-container id="container" class="pt-4">
            <router-view />
        </b-container>
        <notifications group="auth" position="top center" :speed="500" />
    </div>
</template>

<script>
import Menu from "@/components/menu.vue";

export default {
    components: {
        Menu,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
body {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/bg.jpg);
    //background-size: cover;
}

#container {
    padding-top: 5px;
}
</style>
