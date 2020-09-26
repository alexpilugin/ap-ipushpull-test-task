import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Homepage.vue';
import Main from './views/MainPage.vue';
import NotFound from './views/NotFound.vue';
import store from '../store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Aboutpage.vue')
  },
  {
    path: '/domain/:domain_id/page/:page_id',
    name: 'main',
    props: true, /* activate props */
    component: Main
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '*',
    name: 'NotFound',
    //redirect: '/404', //windows reloading -> prevent loosing data in Vuex Store
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// Nav Guard
router.beforeEach((to, from, next) => {
  console.log("Before Each Route..."); 
  if(!store.state.values) store.dispatch('loadData');
  // Proceed to route
  next();
})

export default router
