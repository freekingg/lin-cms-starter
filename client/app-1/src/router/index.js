import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      // 指向首页home
      redirect: '/home',
      component: () => import('../views/index.vue'),
      children:[
        {
          path: '',
          name: 'home',
          component: () => import('../views/home.vue')
        },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
  ]
})



export default router
