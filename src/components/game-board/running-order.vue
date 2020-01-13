<template>
    <div class="running-order">
        <RunningOrderSlot
            :runningSlot="runningSlot"
            v-for="runningSlot in player.runningOrder"
            :key="runningSlot.uuid"
        />
    </div>
</template>

<script>
import RunningOrderSlot from "@/components/game-board/running-order-slot";

export default {
    components: {
        RunningOrderSlot,
    },
    props: {
        player: {
            type: Object,
            default: function() {
                return {
                    runningOrder: [],
                };
            },
        },
    },
};
</script>

<style lang="scss">
.running-order {
    position: relative;
    display: flex;
    flex-direction: row nowrap;
    justify-content: center;
}
</style>
