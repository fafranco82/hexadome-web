<template>
    <v-group>
        <HexShape :hex="hex" :fill="hexFill" />
        <GamePiece v-for="piece in hex.content" :key="piece.uuid" :piece="piece" :hex="hex" />
        <HexShape v-if="overlay" :hex="hex" :fill="overlay" />
    </v-group>
</template>

<script>
import HexShape from "@/components/game-board/hex-shape";
import GamePiece from "@/components/game-board/game-piece";

export default {
    components: {
        HexShape,
        GamePiece,
    },
    props: {
        hex: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    computed: {
        hexFill() {
            if (this.hex.activeScoring) return "darkred";
            else if (this.hex.scoring) return "salmon";
            else return "gray";
        },
        overlay() {
            if (this.hex.unselectable || this.hex.content.some(piece => piece.unselectable))
                return "rgba(0, 0, 0, 0.6)";
            else if (this.hex.selected || this.hex.content.some(piece => piece.selected)) return "rgba(255, 0, 0, 0.1)";
            else if (this.hex.selectable || this.hex.content.some(piece => piece.selectable))
                return "rgba(255, 215, 0, 0.4)";
            else return false;
        },
    },
};
</script>
