import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import your Vuex store
import 'bootstrap/dist/css/bootstrap.min.css';
import VueToastification from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS file for Vue Toastification
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

// Use Vue Toastification as a Vue plugin
Vue.use(VueToastification);
Vue.use(Vuetify);
const vuetify = new Vuetify();

new Vue({
  router,
  store, // Provide the Vuex store to your Vue instance
  vuetify,
  render: h => h(App)
}).$mount('#app');
