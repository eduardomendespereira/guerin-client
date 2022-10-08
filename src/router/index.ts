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
        path: "/eventos/vacinas/:id",
        name: "vaccine-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
      },
      {
        path: "/eventos/vacinas/cadastrar",
        name: "vaccine-insert",
        component: () => import("../views/Vaccine/VaccineInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/vacinas/desativar/:id",
        name: "vaccine-disable",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Vaccine/VaccineDisable.vue"),
      },
      {
        path: "/eventos/vacinas/atualizar/:id",
        name: "vaccine-update",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Vaccine/VaccineUpdateForm.vue"),
      },
      {
        path: "/eventos/aplicacoes-de-vacinas",
        name: "list-vaccine-application",
        component: () => import("../views/VaccineApplication/VaccineApplicationList.vue"),
      },
      {
        path: "/eventos/aplicacoes-de-vacinas/:id",
        name: "vaccine-application-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/VaccineApplication/VaccineApplicationDetail.vue"),
      },
      {
        path: "/eventos/aplicacoes-de-vacinas/cadastrar",
        name: "insert-vaccine-application",
        component: () => import("../views/VaccineApplication/VaccineApplicationInsertForm.vue"),
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
        path: '/gados/editar/:earring',
        name: 'cattle-edit',
        props: (router) => ({ earring: router.params.earring}),
        component: () => import("../views/Cattle/CattleEditForm.vue")
      },
      {
        path: '/gados/desativar/:earring',
        name: 'cattle-inactive',
        props: (router) => ({ earring: router.params.earring}),
        component: () => import("../views/Cattle/CattleInactive.vue")
      },
      {
        path: "/fazendas",
        name: "farm",
        component: () => import("../views/Farm/FarmList.vue"),
      },
      {
        path: "/fazendas/:id",
        name: "farm-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Farm/FarmDetail.vue"),
      },
      {
        path: "/fazendas/cadastrar",
        name: "farm-insert",
        component: () => import("../views/Farm/FarmInsertForm.vue"),
      },
      {
        path: "/fazendas/editar/:id",
        name: "farm-edit",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Farm/FarmEditForm.vue"),
      },
      {
        path: "/fazendas/desativar/:id",
        name: "farm-inactive",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Farm/FarmInactive.vue"),
      },
      {
        path: "/especie",
        name: "specie",
        component: () => import("../views/Specie/SpecieView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/especie/:id",
        name: "specie-detail",
        props: (router) => ({ id: router.params.id}),
        component: () => import("../views/Specie/SpecieDetail.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
