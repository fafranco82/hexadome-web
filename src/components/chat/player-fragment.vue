<template>
    <span class="player-name" :class="[fragment.team]">{{ fragment.name }}</span>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props: {
        fragment: {
            type: Object,
            default: function() {
                return {name: "unknown"};
            },
        },
    },
    computed: {
        ...mapGetters(["user"]),
    },
};
</script>

<style lang="scss">
.player-name {
    font-weight: bold;

    &.orange {
        color: orange;
    }

    &.green {
        color: green;
    }

    .chatalert & {
        color: inherit;
    }

    .prompt & {
        color: inherit;
    }
}
</style>
