<template>
    <span>{{ fragment }}</span>
</template>

<script>
export default {
    props: {
        fragment: {
            type: [String, Number],
            default: function() {
                return "";
            },
        },
    },
    data() {
        return {};
    },
};
</script>
