import Vue from "vue";
import VeeValidate from "vee-validate";
import i18n from "../i18n";

import validationMessagesEn from "vee-validate/dist/locale/en";
import validationMessagesEs from "vee-validate/dist/locale/es";
import validationMessagesJa from "vee-validate/dist/locale/ja";

Vue.use(VeeValidate, {
    i18nRootKey: "validations",
    i18n,
    dictionary: {
        en: validationMessagesEn,
        es: validationMessagesEs,
        ja: validationMessagesJa,
    },
});
