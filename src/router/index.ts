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
        path: "/eventos/vacinas",
        name: "vaccine",
        component: () => import("../views/Vaccine/VaccineList.vue"),
      },
      {
        path: "/eventos/aplicacoes-de-vacinas",
        name: "list-vaccine-applicarion",
        component: () => import("../views/VaccineApplication/VaccineApplicationList.vue"),
      },
      {
        path: "/eventos/vacinas/:id",
        name: "vaccine-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
      },
      {
        path: "/gados",
        name: "cattle",
        component: () => import("../views/Cattle/CattleList.vue"),
      },
      {
        path: '/gados/:earring',
        name: 'cattle-detail',
        props: (router) => ({ earring: router.params.earring}),
        component: () => import("../views/Cattle/CattleDetail.vue")
      },
      {
        path: '/gados/cadastrar',
        name: 'cattle-insert',
        component: () => import("../views/Cattle/CattleInsertForm.vue")
      },
      {
        path: "/eventos/vacinas/cadastrar",
        name: "vaccine-insert",
        component: () => import("../views/Vaccine/VaccineInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/especie",
        name: "specie",
        component: () => import("../views/Specie/SpecieView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("../views/User/UserList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos",
        name: "events",
        component: () => import("../views/Events/EventView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/pesagem",
        name: "weight",
        component: () => import("../views/Weighing/WeighingListView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/pesagem/:id",
        name: "weight-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Weighing/WeighingDetailView.vue"),
      },
      {
        path: "/eventos/pesagem/desativar/:id",
        name: "weight-inactivated",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Weighing/WeighingInactivatedView.vue"),
      },
      {
        path: "/fazendas",
        name: "farm",
        component: () => import("../views/Farm/FarmList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
