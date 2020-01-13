<template>
    <div>
        <ChatFragment v-for="(fragment, index) in fragments" :key="index" :fragment="fragment" />
    </div>
</template>

<script>
import ChatFragment from "./chat-fragment";

export default {
    components: {
        ChatFragment,
    },
    props: {
        fragments: {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
};
</script>
