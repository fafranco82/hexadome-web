<template>
    <span>
        <span v-for="(subfragment, index) in fragment" :key="index">
            <ChatFragment :fragment="subfragment" />
            <span v-if="fragment.length > 2 && index < fragment.length - 2">, </span>
            <span v-else-if="fragment.length > 1 && index == fragment.length - 2"> y </span>
        </span>
    </span>
</template>

<script>
import ChatFragment from "./chat-fragment";

export default {
    components: {
        ChatFragment,
    },
    props: {
        fragment: {
            type: [Object, Array, String],
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
