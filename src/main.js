import Vue from 'vue'
import store from './store/store'
import App from './App.vue'
import ImageUploader from "vue-image-upload-resize";
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(ImageUploader);

const vm = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})

export { vm }
