import { createRouter, createWebHistory } from 'vue-router'
import RootView from '../views/RootView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: RootView
    },
    {
      path: '/audio',
      name: 'audio',
      component: () => import('../views/AudioView.vue')
    },
    {
      path: '/video',
      name: 'video',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/document',
      name: 'document',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DocumentView.vue')
    }
  ]
})

export default router
