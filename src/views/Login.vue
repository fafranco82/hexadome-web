<template>
    <div class="card mx-auto" style="max-width: 30rem;">
        <div class="card-header">
            {{ $t("forms.login") }}
        </div>
        <div class="card-body">
            <b-form @submit.prevent="login">
                <b-form-group
                    id="usernameGroup"
                    label-cols="5"
                    :label="$t('forms.username')"
                    label-for="usernameInput"
                    :invalid-feedback="errors.first('username')"
                    :state="true"
                >
                    <b-form-input
                        id="usernameInput"
                        v-model="username"
                        v-validate="'required|alpha_dash'"
                        type="text"
                        name="username"
                        :data-vv-as="$t('forms.username')"
                        :state="usernameState"
                        :placeholder="$t('forms.username')"
                    />
                </b-form-group>

                <b-form-group
                    id="passwordGroup"
                    label-cols="5"
                    :label="$t('forms.password')"
                    label-for="passwordInput"
                    :invalid-feedback="errors.first('password')"
                    :state="true"
                >
                    <b-form-input
                        id="passwordInput"
                        v-model="password"
                        v-validate="'required'"
                        type="password"
                        name="password"
                        :data-vv-as="$t('forms.password')"
                        :state="passwordState"
                        :placeholder="$t('forms.password')"
                    />
                </b-form-group>

                <b-form-row>
                    <b-col offset-sm="5">
                        <b-button type="button" variant="secondary">
                            {{ $t("forms.forgotPassword") }}
                        </b-button>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col>&nbsp;</b-col>
                </b-form-row>

                <b-form-row>
                    <b-button type="submit" block variant="primary" :disabled="errors.any()">
                        {{ $t("forms.login") }}
                    </b-button>
                </b-form-row>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    computed: {
        usernameState() {
            let field = this.fields.username;
            return field && field.dirty ? field.valid : null;
        },
        passwordState() {
            let field = this.fields.password;
            return field && field.dirty ? field.valid : null;
        },
    },
    methods: {
        login: function() {
            this.$validator.validate().then(result => {
                if (result) {
                    let username = this.username;
                    let password = this.password;
                    this.$store
                        .dispatch("login", {username, password})
                        .then(() => {
                            this.$notify({
                                group: "auth",
                                type: "success",
                                text: this.$t("messages.login", {name: this.username}),
                            });
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl);
                            } else {
                                this.$router.push({name: "home"});
                            }
                        })
                        .catch(err =>
                            this.$notify({
                                group: "auth",
                                type: "error",
                                text: err,
                            })
                        );
                }
            });
        },
    },
};
</script>
