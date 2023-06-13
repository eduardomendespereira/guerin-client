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
        path: "/eventos/eventos-gados",
        name: "cattle-event",
        component: () => import("../views/CattleEvent/CattleEventList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/eventos-gados/cadastrar",
        name: "cattle-event-insert",
        component: () =>
          import("../views/CattleEvent/CattleEventInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/eventos-gados/:id",
        name: "cattle-event-detail",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/CattleEvent/CattleEventDetail.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/eventos-gados/atualizar/:id",
        name: "cattle-event-update",
        props: (router) => ({ id: router.params.id }),
        component: () =>
          import("../views/CattleEvent/CattleEventUpdateForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/vacinas",
        name: "vaccine",
        component: () => import("../views/Vaccine/VaccineList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/vacinas/:id",
        name: "vaccine-detail",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Vaccine/VaccineDetail.vue"),
        beforeEnter: Guard.auth,
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
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Vaccine/VaccineDisable.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/vacinas/atualizar/:id",
        name: "vaccine-update",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Vaccine/VaccineUpdateForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/aplicacoes-de-vacinas",
        name: "list-vaccine-application",
        component: () =>
          import("../views/VaccineApplication/VaccineApplicationList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/aplicacoes-de-vacinas/:id",
        name: "vaccine-application-detail",
        props: (router) => ({ id: router.params.id }),
        component: () =>
          import("../views/VaccineApplication/VaccineApplicationDetail.vue"),
      },
      {
        path: "/eventos/aplicacoes-de-vacinas/atualizar/:id",
        name: "vaccine-application-update",
        props: (router) => ({ id: router.params.id }),
        component: () =>
          import(
            "../views/VaccineApplication/VaccineApplicationUpdateForm.vue"
          ),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/aplicacoes-de-vacinas/cadastrar",
        name: "insert-vaccine-application",
        component: () =>
          import(
            "../views/VaccineApplication/VaccineApplicationInsertForm.vue"
          ),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/inseminacoes",
        name: "list-insemination",
        component: () =>
            import("../views/Insemination/InseminationList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/inseminacoes/cadastrar",
        name: "insert-insemination",
        component: () =>
            import(
                "../views/Insemination/InseminationInsertForm.vue"
                ),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/inseminacoes/atualizar/:id",
        name: "insemination-update",
        props: (router) => ({ id: router.params.id }),
        component: () =>
            import(
                "../views/Insemination/InseminationUpdateForm.vue"
                ),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/inseminacoes/:id",
        name: "insemination-detail",
        props: (router) => ({ id: router.params.id }),
        component: () =>
            import(
                "../views/Insemination/InseminationDetail.vue"
                ),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados",
        name: "cattle",
        component: () => import("../views/Cattle/CattleList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados/:earring",
        name: "cattle-detail",
        props: (router) => ({ earring: router.params.earring }),
        component: () => import("../views/Cattle/CattleDetail.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados/cadastrar",
        name: "cattle-insert",
        component: () => import("../views/Cattle/CattleInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados/editar/:earring",
        name: "cattle-edit",
        props: (router) => ({ earring: router.params.earring }),
        component: () => import("../views/Cattle/CattleEditForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados/desativar/:earring",
        name: "cattle-inactive",
        props: (router) => ({ earring: router.params.earring }),
        component: () => import("../views/Cattle/CattleInactive.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/gados/ativar/:earring",
        name: "cattle-active",
        props: (router) => ({ earring: router.params.earring }),
        component: () => import("../views/Cattle/CattleActive.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/fazendas",
        name: "farm",
        component: () => import("../views/Farm/FarmList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/fazendas/:id",
        name: "farm-detail",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Farm/FarmDetail.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/fazendas/cadastrar",
        name: "farm-insert",
        component: () => import("../views/Farm/FarmInsertForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/fazendas/editar/:id",
        name: "farm-edit",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Farm/FarmEditForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/fazendas/desativar/:id",
        name: "farm-inactive",
        beforeEnter: Guard.auth,
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Farm/FarmInactive.vue"),
      },
      {
        path: "/fazendas/ativar/:id",
        name: "farm-active",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Farm/FarmActive.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/tipo-de-evento",
        name: "eventType",
        component: () => import("../views/EventType/EventTypeView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/tipo-de-evento/:id",
        name: "eventType-detail",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/EventType/EventTypeViewDetail.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/tipo-de-evento/edit/:id",
        name: "eventType-edit",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/EventType/EventTypeViewUpdate.vue"),
        beforeEnter: Guard.auth,
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
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Specie/SpecieDetail.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/especie/editar/:id",
        name: "specie-edit",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Specie/SpecieUpdateForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/usuarios",
        name: "usuarios",
        component: () => import("../views/User/UserList.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/usuarios/cadastrar",
        name: "user-form",
        component: () => import("../views/User/UserForm.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/usuarios/editar/:userId",
        name: "user-edit",
        props: (router) => ({ userId: router.params.userId }),
        component: () => import("../views/User/UserEdit.vue"),
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
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Weighing/WeighingDetailView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/eventos/pesagem/editar/:id",
        name: "weight-update",
        props: (router) => ({ id: router.params.id }),
        component: () => import("../views/Weighing/WeighingUpdateView.vue"),
        beforeEnter: Guard.auth,
      },
      {
        path: "/lactacoes",
        name: "list-lactating",
        component: () =>
            import("../views/Lactating/LactatingList.vue"),
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
