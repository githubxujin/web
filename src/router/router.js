import Vue from 'vue';
import Router from 'vue-router';
import Index from './index.js';
import Monitoring from './module/monitoring.js';
import Mine from './module/mine.js';
Vue.use(Router);

export default new Router({
  routes: [...Index, ...Monitoring, ...Mine]
});
