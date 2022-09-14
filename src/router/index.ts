import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import("../components/Login.vue")
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/HomeView.vue")
  },
  {
    path: '/vaccine',
    name: 'vaccine',
    component: () => import("../views/Vaccine/VaccineList.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
