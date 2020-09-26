import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

//------------------------------------------------------------------------
//Adding globally available functions for all Vue components

import GlobalMixin from './GlobalMixin.js'
Vue.use(GlobalMixin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
