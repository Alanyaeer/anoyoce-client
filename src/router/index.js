import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue')
    },
    {
      path: '/chat',
      component: () => import('@/views/chat/chatMainPage.vue')
    },
    {
      path: '/test',
      component:() => import('@/views/test/testPage.vue')
    }
  ]
})

export default router
