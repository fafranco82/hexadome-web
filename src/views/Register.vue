<template>
    <div class="card mx-auto" style="max-width: 30rem;">
        <div class="card-header">
            {{ $t("forms.register") }}
        </div>
        <div class="card-body">
            <b-form @submit.prevent="register">
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
                    id="emailGroup"
                    label-cols="5"
                    :label="$t('forms.email')"
                    label-for="emailInput"
                    :invalid-feedback="errors.first('email')"
                    :state="true"
                >
                    <b-form-input
                        id="emailInput"
                        ref="email"
                        v-model="email"
                        v-validate="'required|email'"
                        type="email"
                        name="email"
                        :data-vv-as="$t('forms.email')"
                        :state="emailState"
                        :placeholder="$t('forms.email')"
                    />
                </b-form-group>

                <b-form-group
                    id="email2Group"
                    label-cols="5"
                    :label="$t('forms.confirmEmail')"
                    label-for="email2Input"
                    :invalid-feedback="errors.first('email2')"
                    :state="true"
                >
                    <b-form-input
                        id="email2Input"
                        v-model="email2"
                        v-validate="'required|email|confirmed:email'"
                        type="email"
                        name="email2"
                        :data-vv-as="$t('forms.email')"
                        :state="email2State"
                        :placeholder="$t('forms.confirmEmail')"
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
                        ref="password"
                        v-model="password"
                        v-validate="'required'"
                        type="password"
                        name="password"
                        :data-vv-as="$t('forms.password')"
                        :state="passwordState"
                        :placeholder="$t('forms.password')"
                    />
                </b-form-group>

                <b-form-group
                    id="password2Group"
                    label-cols="5"
                    :label="$t('forms.confirmPassword')"
                    label-for="password2Input"
                    :invalid-feedback="errors.first('password2')"
                    :state="true"
                >
                    <b-form-input
                        id="password2Input"
                        v-model="password2"
                        v-validate="'required|confirmed:password'"
                        type="password"
                        name="password2"
                        :data-vv-as="$t('forms.password')"
                        :state="password2State"
                        :placeholder="$t('forms.confirmPassword')"
                    />
                </b-form-group>

                <b-button type="submit" block variant="primary" :disabled="errors.any()">
                    {{ $t("forms.register") }}
                </b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            email2: "",
            password: "",
            password2: "",
        };
    },
    computed: {
        usernameState() {
            let field = this.fields.username;
            return field && field.dirty ? field.valid : null;
        },
        emailState() {
            let field = this.fields.email;
            return field && field.dirty ? field.valid : null;
        },
        email2State() {
            let field = this.fields.email2;
            return field && field.dirty ? field.valid : null;
        },
        passwordState() {
            let field = this.fields.password;
            return field && field.dirty ? field.valid : null;
        },
        password2State() {
            let field = this.fields.password2;
            return field && field.dirty ? field.valid : null;
        },
    },
    methods: {
        register: function() {
            this.$validator.validate().then(result => {
                if (result) {
                    let data = {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    };

                    this.$store
                        .dispatch("register", data)
                        .then(() => {
                            this.$notify({
                                group: "auth",
                                type: "success",
                                text: this.$t("messages.register", {name: this.username}),
                            });
                            this.$router.push({name: "home"});
                        })
                        .catch(err =>
                            this.$notify({
                                group: "auth",
                                type: "error",
                                text: err,
                            })
                        );
                } else {
                    alert("no");
                }
            });
        },
    },
};
</script>
