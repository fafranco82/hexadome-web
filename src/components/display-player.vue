<template>
    <span>
        <Gravatar :hash="player.gravatar" :size="24" />
        {{ player.name }}
    </span>
</template>

<script>
export default {
    props: {
        player: {
            type: Object,
            default: function() {
                return {name: "(undefined)"};
            },
        },
    },
    data() {
        return {};
    },
};
</script>
