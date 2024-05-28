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
    },
    {
      path: '/test2',
      component:() => import('@/views/test/testPage2.vue')
    }
  ]
})
router.beforeEach((to, from, next) =>{
  let token = localStorage.getItem("token")
  if(to.path === '/'){
    if(!token){
      next({path: 'login'})
    }
    else next({path: 'chat'})
  }
  next();
})
export default router
