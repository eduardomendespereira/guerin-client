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
  {
    path: '/vaccine/insert',
    name: 'vaccine-insert',
    component: () => import("../views/Vaccine/VaccineInsertForm.vue")
  },
  {
    path: '/specie',
    name: 'specie',
    component: () => import("../views/Specie/SpecieView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
