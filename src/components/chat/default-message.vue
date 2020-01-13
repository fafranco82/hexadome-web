<template>
    <ChatFragments :fragments="message.message" />
</template>

<script>
import ChatFragments from "./chat-fragments";

export default {
    components: {
        ChatFragments,
    },
    props: {
        message: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
};
</script>
