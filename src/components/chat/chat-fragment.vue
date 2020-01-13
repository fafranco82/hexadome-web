<template>
    <component :is="getFragmentComponent()" :fragment="fragment" />
</template>

<script>
import StringFragment from "./string-fragment";
import PlayerFragment from "./player-fragment";
import CharacterFragment from "./character-fragment";
import CardFragment from "./card-fragment";

const FragmentTypes = {
    player: PlayerFragment,
    character: CharacterFragment,
    card: CardFragment,
};

export default {
    components: {
        StringFragment,
        PlayerFragment,
        CardFragment,
        ArrayFragment: () => import("./array-fragment"),
    },
    props: {
        fragment: {
            type: [Object, Array, String, Number],
            default: function() {
                return "";
            },
        },
    },
    data() {
        return {};
    },
    methods: {
        getFragmentComponent() {
            if (typeof this.fragment === "string") {
                return StringFragment;
            } else if (Array.isArray(this.fragment)) {
                return this.$options.components.ArrayFragment;
            } else if (typeof this.fragment === "object" && this.fragment.arg) {
                let panel = FragmentTypes[this.fragment.arg];
                if (panel) {
                    return panel;
                }
            }

            return StringFragment;
        },
    },
};
</script>
