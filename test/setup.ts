import Vue from "vue";

Vue.config.productionTip = false;
Vue.config.devtools = false;

process.on("unhandledRejection", (uncaughtRejection) => {
  throw uncaughtRejection;
});
