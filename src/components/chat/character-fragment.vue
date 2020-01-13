<template>
    <span class="characterfragment" :class="[fragment.team]">
        {{ name }}
    </span>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props: {
        fragment: {
            type: Object,
            default: function() {
                return {
                    id: "00000",
                };
            },
        },
    },
    computed: {
        ...mapGetters(["user", "characters"]),
        character() {
            return this.characters[this.fragment.id]; //.locales[this.user.locale] || {};
        },
        name() {
            return this.character.name;
        },
    },
};
</script>

<style lang="scss">
.characterfragment {
    font-weight: bold;
    cursor: pointer;

    &.green {
        color: green;
    }

    &.orange {
        color: orange;
    }
}
</style>
