<template>
    <div>
        <b-alert v-if="isAlert" show class="my-1 mx-0 p-2" :class="className" :variant="message.type.variant">
            <fa-icon :icon="alertIcon" class="mr-1" />
            <ChatFragment v-for="(fragment, index) in message.message" :key="index" :fragment="fragment" />
        </b-alert>
        <div v-else :class="className">
            <ChatFragment v-for="(fragment, index) in message.message" :key="index" :fragment="fragment" />
        </div>
    </div>
</template>

<script>
import ChatFragment from "./chat-fragment";

let AlertTypes = {
    success: "check-circle",
    info: "info-circle",
    warning: "exclamation-triangle",
};

export default {
    components: {
        ChatFragment,
    },
    props: {
        message: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    computed: {
        isAlert: function() {
            return !!AlertTypes[this.message.type.variant];
        },
        alertIcon: function() {
            if (this.isAlert) {
                return AlertTypes[this.message.type.variant];
            } else {
                return "";
            }
        },
        className: function() {
            return "chatalert chatalert-" + (this.message.type.variant || "default");
        },
    },
};
</script>

<style lang="scss">
.chatalert {
    font-size: 0.9rem;

    &.chatalert-phasestart {
        font-weight: bold;
        text-transform: uppercase;
        border-width: 1px 0px 1px 0px;
        border-style: solid;
    }

    &.chatalert-turnbegin {
        font-weight: bold;
        border-width: 0px 0px 0px 5px;
        border-style: solid;
        padding-left: 4px;
    }

    &.chatalert-roundstarted {
        font-weight: bold;
        font-size: 1.1rem;
        border-width: 4px;
        padding: 4px;
        border-style: solid;
    }
}
</style>
