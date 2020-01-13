<template>
    <component :is="getPieceComponent()" :piece="piece" :hex="hex" />
</template>

<script>
import PieceBlocked from "@/components/game-board/piece-blocked";
import PieceBarrier from "@/components/game-board/piece-barrier";
import PieceCharacter from "@/components/game-board/piece-character";

const PieceTypes = {
    blocked: PieceBlocked,
    barrier: PieceBarrier,
    character: PieceCharacter,
};

export default {
    components: {
        PieceBlocked,
        PieceBarrier,
        PieceCharacter,
    },
    props: {
        hex: {
            type: Object,
            default: function() {
                return {};
            },
        },
        piece: {
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
        getPieceComponent() {
            let panel = PieceTypes[this.piece.type];
            return panel;
        },
    },
};
</script>
