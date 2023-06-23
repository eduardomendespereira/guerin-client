<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Usuarios</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa fa-users"> Usuarios Ativos</i></p>
              <p class="subtitle" style="float: right">
                <span style="font-size: 12pt" class="tag is-info">{{
                  count
                }}</span>
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-flex">
      <div class="is-size-12 pt-5 pl-5" style="width: 100%">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="buttons">
                <router-link to="/usuarios/cadastrar">
                  <button class="button is-success">Cadastrar</button>
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-flex">
      <div class="is-size-12 pt-5 pl-5" style="width: 100%">
        <vue-good-table
          ref="usertable"
          :columns="columns"
          :rows="rows"
          :search-options="{
            enabled: true,
            placeholder: 'Buscar...',
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            rowsPerPageLabel: 'Resultados por pagina',
            nextLabel: 'Proximo',
            prevLabel: 'Anterior',
            ofLabel: 'de',
            allLabel: 'Todos',
          }"
          theme="polar-bear"
        >
          <template #table-row="props">
            <span v-if="props.column.field == 'name'">
              <span>{{ props.row.firstName }} {{ props.row.lastName }}</span>
            </span>
            <span v-else-if="props.column.field == 'role'">
              <span v-if="props.row.role == 'admin'" class="tag is-danger"
                >Admin</span
              >
              <span v-else-if="props.row.role == 'user'" class="tag is-warning"
                >Usuario</span
              >
              <span v-else>{{ props.row.role }}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success"
                >Ativo</span
              >
              <span v-else-if="props.row.inactive" class="tag is-danger"
                >Inativo</span
              >
              <span v-else>{{ props.row.role }}</span>
            </span>
            <span v-else-if="props.column.field == 'actions'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageUpdate(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  v-if="!props.row.inactive"
                  class="button is-danger is-outlined"
                  @click="deleteUser(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                  v-else-if="props.row.inactive"
                  class="button is-success is-outlined"
                  @click="enableUser(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import UserClient from "@/client/user.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { User } from "@/model/user.model";
import { PropType } from "vue";
import { Options, Vue } from "vue-class-component";

export default class UserList extends Vue {
  columns = [
    {
      label: "Nome",
      field: "name",
    },
    {
      label: "Usuario",
      field: "username",
    },
    {
      label: "Email",
      field: "email",
    },
    {
      label: "Ativo",
      field: "inactive",
    },
    {
      label: "Role",
      field: "role",
    },
    {
      label: "Ações",
      field: "actions",
      html: true,
    },
  ];
  rows = [];
  count = 0;

  public mounted(): void {
    this.listAll();
  }
  public onClickPageUpdate(id: number) {
    this.$router.push({ name: "user-edit", params: { userId: id } });
  }
  public listAll(): void {
    UserClient.findAll()
      .then((response: any) => {
        this.rows = response.data;
        this.count = response.data.filter((t) => !t.inactive).length;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  public deleteUser(id: number): void {
    if (confirm("Deseja mesmo desabilitar este usuario?")) {
      UserClient.disable(id)
        .then((response: any) => {
          window.alert("Usuario inativado com sucesso!");
          this.listAll();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
  public enableUser(id: number): void {
    if (confirm("Deseja mesmo reabilitar este usuario?")) {
      UserClient.enable(id)
        .then((response: any) => {
          window.alert("Usuario reabilitado com sucesso!");
          this.listAll();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
}
</script>
