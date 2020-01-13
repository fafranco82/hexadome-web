<template>
    <v-image :config="imageConfig" />
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
        url: {
            type: String,
            default: function() {
                return "";
            },
        },
        gap: {
            type: Number,
            default: function() {
                return 0;
            },
        },
    },
    data() {
        return {
            image: null,
        };
    },
    computed: {
        imageConfig() {
            const pos = this.hex.toPoint();
            return {
                image: this.image,
                x: pos.x + (config.grid.border * (this.gap + 1)) / 2,
                y: pos.y + (config.grid.border * (this.gap + 1)) / 2,
                width: config.grid.size * 2 - config.grid.border * (this.gap + 1),
                height: config.grid.size * Math.sqrt(3) - config.grid.border * (this.gap + 1),
            };
        },
    },
    mounted() {
        const image = new window.Image();
        image.src = this.url;
        image.onload = () => {
            this.image = image;
        };
    },
};
</script>
