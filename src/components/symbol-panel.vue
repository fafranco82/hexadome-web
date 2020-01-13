<template>
    <icon :data="icon" v-if="symbol"></icon>
</template>

<script>
import successIcon from "@/assets/svg/success.svg";
import blockIcon from "@/assets/svg/block.svg";
import specialIcon from "@/assets/svg/special.svg";
import criticalSuccessIcon from "@/assets/svg/criticalSuccess.svg";
import criticalBlockIcon from "@/assets/svg/criticalBlock.svg";

const ICONS = {
    success: successIcon,
    block: blockIcon,
    special: specialIcon,
    criticalSuccess: criticalSuccessIcon,
    criticalBlock: criticalBlockIcon,
};

export default {
    props: {
        symbol: {
            type: String,
            default: function() {
                return "";
            },
        },
    },
    computed: {
        icon() {
            return ICONS[this.symbol];
        },
    },
};
</script>
