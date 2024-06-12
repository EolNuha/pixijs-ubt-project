import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(`${import.meta.env.BASE_URL}`),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
