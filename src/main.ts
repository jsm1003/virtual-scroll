import Vue from 'vue';
import app from './app';
import router from './router';
import * as components from './components';

import '@/styles/base.scss';

Vue.config.productionTip = false;

Object.entries(components).forEach(([name, comp]) => {
  Vue.component(name, comp);
});

new Vue({
  router,
  render: h => h(app),
}).$mount('#app');
