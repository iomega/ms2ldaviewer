import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pick from '../views/Pick.vue'
import Spectras from '../views/Spectras.vue'
import Spectra from '../views/Spectra.vue'
import Motifs from '../views/Motifs.vue'
import Motif from '../views/Motif.vue'
import Settings from '../views/Settings.vue'
import { store } from '@/store';

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pick',
    name: 'pick',
    component: Pick
  },
  {
    path: '/spectras',
    name: 'spectras',
    component: Spectras
  },
  {
    path: '/spectras/:id',
    name: 'spectra',
    component: Spectra
  },
  {
    path: '/motifs',
    name: 'motifs',
    component: Motifs
  },
  {
    path: '/motifs/:name',
    name: 'motif',
    component: Motif
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.loaded) {
    // most routes require a loaded dataset
    next()
  } else {
    if (to.name === 'pick' || to.name === 'about' || to.name === 'settings') {
      // some routes work without loaded dataset
      next()
    } else {
      next('pick')
    }
  }
})

export default router
