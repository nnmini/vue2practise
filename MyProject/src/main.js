import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import your Vuex store
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})
const app = createApp(App);

app.config.productionTip = false;


app.use(Vuetify);


app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app');
