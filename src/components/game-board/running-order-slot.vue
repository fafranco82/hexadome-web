<template>
    <div class="running-order-slot">
        <div class="img-wrapper">
            <img src="/images/backs/avatar.png" v-if="runningSlot.facedown" />
            <template v-else>
                <img :src="urlAvatar" />
                <div class="initiative">
                    {{ runningSlot.initiative }}
                </div>
            </template>
            <div class="overlay" v-if="!runningSlot.current"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        runningSlot: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    computed: {
        urlAvatar() {
            return `/images/characters/${this.runningSlot.id}/avatar.png`;
        },
    },
};
</script>

<style lang="scss">
.running-order-slot {
    position: relative;
    display: flex;
    margin-left: 4px;
    margin-right: 4px;
}

.img-wrapper {
    position: relative;
    width: 60px;
    height: 60px;

    img {
        border-radius: 8px;
        width: 60px;
        height: 60px;
    }

    .initiative {
        position: absolute;
        bottom: -5px;
        right: 3px;
        font-size: 30px;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
}
</style>
