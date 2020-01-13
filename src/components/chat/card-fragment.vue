<template>
    <span class="cardfragment" @mouseover="setPreview(fragment.id)" @mouseleave="clearPreview()">
        {{ name }}
    </span>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
    props: {
        fragment: {
            type: Object,
            default: function() {
                return {
                    id: "00000",
                    doubleSided: false,
                };
            },
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["user", "cards"]),
        card() {
            return this.cards[this.fragment.id].locales[this.user.locale] || {};
        },
        name() {
            if (this.fragment.doubleSided) {
                return this.card[`label${this.fragment.side}`];
            }
            return this.card.label;
        },
    },
    methods: {
        ...mapMutations({
            setPreview: "set_preview",
            clearPreview: "clear_preview",
        }),
    },
};
</script>

<style>
.cardfragment {
    font-weight: bold;
    cursor: pointer;
    color: olive;
}
</style>
