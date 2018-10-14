// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuetify from "vuetify";
import FAQEditor from "./components/FAQEditor";

import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.component("faqEditor", FAQEditor);

Vue.config.productionTip = false;

new Vue({
  el: "#faqEditor",
  components: {
    FAQEditor
  },
  template: `<FAQEditor/>`
});
