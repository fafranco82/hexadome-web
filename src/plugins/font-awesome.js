import Vue from "vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faCircle,
    faCheckCircle,
    faInfoCircle,
    faExclamationTriangle,
    faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faCircle);
library.add(faCheckCircle);
library.add(faInfoCircle);
library.add(faExclamationTriangle);
library.add(faAngleDoubleRight);

Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
