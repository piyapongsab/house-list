import Vue from 'vue';
import VueRouter from 'vue-router'
import menu from '../views/Request.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'menu',
    component: menu,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
