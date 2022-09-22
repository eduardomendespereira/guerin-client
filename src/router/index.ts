import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router' 
import Login from '@/views/Login.vue'
import Home from '@/views/HomeView.vue'
import Guard from '../middleware/middleware'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: Guard.auth,   
  }, 
  {
    path: '/cattle',
    name: 'cattle',
    component: () => import("../views/Cattle/CattleList.vue")
  },
  {
    path: '/vaccine',
    name: 'vaccine',
    component: () => import("../views/Vaccine/VaccineList.vue"),
    beforeEnter: Guard.auth,   
  },
  {
    path: '/vaccine/insert',
    name: 'vaccine-insert',
    component: () => import("../views/Vaccine/VaccineInsertForm.vue"),
    beforeEnter: Guard.auth,   
  },
  {
    path: '/specie',
    name: 'specie',
    component: () => import("../views/Specie/SpecieView.vue"),
    beforeEnter: Guard.auth,   
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
