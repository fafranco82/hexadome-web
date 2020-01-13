<template>
    <v-group>
        <HexShape :hex="hex" fill="yellow" v-if="piece.active" />
        <HexImage :url="teamHex" :hex="hex" :gap="6" />
        <HexImage :url="characterHex" :hex="hex" :gap="6" />
    </v-group>
</template>

<script>
import HexShape from "@/components/game-board/hex-shape";
import HexImage from "@/components/game-board/hex-image";

export default {
    components: {
        HexShape,
        HexImage,
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
        return {
            image: null,
        };
    },
    computed: {
        characterHex() {
            return `/images/characters/${this.piece.id}/hex.png`;
        },
        teamHex() {
            return `/images/teams/${this.piece.player.team}.png`;
        },
        config() {
            const pos = this.hex.toPoint();
            return {
                points: this.hex
                    .corners()
                    .map(({x, y}) => [x + pos.x, y + pos.y])
                    .reduce((a, p) => a.concat(p), []),
                closed: true,
                fill: "white",
                stroke: "black",
                strokeWidth: 4,
            };
        },
    },
};
</script>
