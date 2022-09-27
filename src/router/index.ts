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
    path: "/home",
    name: "home",
    component: Home,
    beforeEnter: Guard.auth,
    children: [
      {
        path: "/vaccine",
        name: "Vaccine",
        component: () => import("../views/Vaccine/VaccineList.vue"),
      },
      {
        path: "/vaccine/:model/:id",
        name: "vaccineDetail",
        props: (router) => ({ id: router.params.id, model: router.params.model }),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
      },
      {
        path: "/vaccine-application",
        name: "VaccineApplication",
        component: () => import("../views/VaccineApplication/VaccineApplicationList.vue"),
      },
      {
        path: "/cattle",
        name: "cattle",
        component: () => import("../views/Cattle/CattleList.vue"),
      },
      {
        path: "/vaccine/insert",
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
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: Guard.auth,
    children: [
      {
        path: "/vaccine",
        name: "Vaccine",
        component: () => import("../views/Vaccine/VaccineList.vue"),
      },
      {
        path: "/vaccine-application",
        name: "VaccineApplication",
        component: () => import("../views/VaccineApplication/VaccineApplicationList.vue"),
      },
      {
        path: "/vaccine/:model/:id",
        name: "vaccineDetail",
        props: (router) => ({ id: router.params.id, model: router.params.model }),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
      },
      {
        path: "/cattle",
        name: "cattle",
        component: () => import("../views/Cattle/CattleList.vue"),
      },
      {
        path: "/farm",
        name: "farm",
        component: () => import("../views/Farm/FarmList.vue"),
      },
      {
        path: "/vaccine/insert",
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
      {
        path: "/eventos",
        name: "eventos",
        component: () => import("../views/Events/EventView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/pesagem",
        name: "pesagem",
        component: () => import("../views/Weighing/WeighingList.vue"),
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
