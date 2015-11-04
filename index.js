import Vue from "vue";
import Marker from "./components/marker.vue";

Vue.config.debug = true;

var vm = new Vue({
  el: document.getElementsByTagName('body')[0],
  components: {
    marker: Marker,
  },
});
