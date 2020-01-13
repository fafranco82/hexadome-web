<template>
    <div class="chat">
        <div v-chat-scroll class="messages panel">
            <div>
                <div v-for="(message, index) in messages" :key="index" class="message">
                    <component :is="getMessageDisplay(message)" :message="message" />
                </div>
            </div>
        </div>
        <b-form @submit.prevent>
            <b-form-input v-model="chatmessage" :placeholder="'Chat...'" @keyup.enter.prevent="chat" />
        </b-form>
    </div>
</template>

<script>
import DefaultMessage from "@/components/chat/default-message";
import ChatMessage from "@/components/chat/chat-message";
import AlertMessage from "@/components/chat/alert-message";

const MessageTypes = {
    default: DefaultMessage,
    chat: ChatMessage,
    alert: AlertMessage,
};

export default {
    components: {
        DefaultMessage,
        ChatMessage,
    },
    props: {
        messages: {
            type: Array,
            default: function() {
                return [];
            },
        },
    },
    data() {
        return {
            chatmessage: "",
        };
    },
    methods: {
        getMessageDisplay(message) {
            let panel = MessageTypes[message.type.main];
            if (panel) {
                return panel;
            } else {
                return DefaultMessage;
            }
        },
        chat() {
            if (this.chatmessage) {
                this.$emit("chat", this.chatmessage);
                this.chatmessage = "";
            }
        },
    },
};
</script>

<style lang="scss">
.chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    form {
        margin-left: 5px;
        margin-right: 5px;
    }

    .messages {
        position: relative;
        margin: 5px;
        //border: 1px solid rgba(71,58,56,.65);
        //border-radius: 0 0 5px 5px;
        padding: 5px;
        height: 100%;
        //margin: 0;
        font-size: 12px;
        overflow-y: auto;
        flex: 1;
        display: flex;

        .message {
            margin-bottom: 8px;
            word-wrap: break-word;
            line-height: 1.2;
        }
    }
}
</style>
