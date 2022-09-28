import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/HomeView.vue";
import Guard from "../middleware/middleware";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: Guard.auth,
    children: [
      {
        path: "/vacina",
        name: "vaccine",
        component: () => import("../views/Vaccine/VaccineList.vue"),
      },
      {
        path: "/vacina/:id",
        name: "vaccine-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
      },
      {
        path: "/aplicacao-vacina",
        name: "vaccine-application",
        component: () => import("../views/VaccineApplication/VaccineApplicationList.vue"),
      },
      {
        path: "/cattle",
        name: "cattle",
        component: () => import("../views/Cattle/CattleList.vue"),
      },
      {
        path: '/cattle/:earring',
        name: 'cattle-detail',
        props: (router) => ({ earring: router.params.earring}),
        component: () => import("../views/Cattle/CattleDetail.vue")
      },
      {
        path: '/cattle/insert',
        name: 'cattle-insert',
        component: () => import("../views/Cattle/CattleInsertForm.vue")
      },
      {
        path: "/vacina/cadastrar",
        name: "vaccine-insert",
        component: () => import("../views/Vaccine/VaccineInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/specie",
        name: "specie",
        component: () => import("../views/Specie/SpecieView.vue"),
        beforeEnter: Guard.auth,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
