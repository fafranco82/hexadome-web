<template>
    <div>
        <div class="chat-message">
            <Gravatar :hash="user.gravatar" :size="30" class="align-middle float-left mr-2" />
            <strong>{{ user.name }}</strong>
        </div>
        {{ message.message }}
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            default: function() {
                return {};
            },
        },
    },
    computed: {
        user: function() {
            return this.message.args.user;
        },
    },
};
</script>
