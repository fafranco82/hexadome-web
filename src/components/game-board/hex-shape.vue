<template>
    <v-line :config="config" />
</template>

<script>
import config from "@/config";

export default {
    props: {
        hex: {
            type: Object,
            default: function() {
                return {};
            },
        },
        fill: {
            type: String,
            default: function() {
                return "gray";
            },
        },
        stroke: {
            type: String,
            default: function() {
                return "black";
            },
        },
    },
    computed: {
        config() {
            const pos = this.hex.toPoint();
            return {
                points: this.hex
                    .corners()
                    .map(({x, y}) => [x + pos.x, y + pos.y])
                    .reduce((a, p) => a.concat(p), []),
                closed: true,
                fill: this.fill,
                stroke: this.stroke,
                strokeWidth: config.grid.border,
            };
        },
    },
};
</script>
