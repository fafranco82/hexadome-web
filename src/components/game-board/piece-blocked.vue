<template>
    <HexImage url="/images/blocked/hex.png" :hex="hex" />
</template>

<script>
import HexImage from "@/components/game-board/hex-image";

export default {
    components: {
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
};
</script>
