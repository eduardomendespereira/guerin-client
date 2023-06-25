<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5"><b>Usuários</b></p>
      <div class="activates p-2">
        <div class="icon-activates">
          <img
            style="width: 40px"
            src="../../assets/userIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Usuários Ativos
        </h1>

        <div>
          <h1
            class="is-size-5 is-flex is-justify-content-flex-end pr-2"
            style="color: #004aad"
            span
          >
            {{ count }}
          </h1>
        </div>
      </div>
    </div>
    <div class="columns is-flex">
      <div class="is-size-12 pt-5" style="width: 100%">
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
      <div class="is-size-12 pt-5 pl-5" style="
          width: 100%;
          text-align: center;
          padding: 0px !important;
          margin: 20px 0px;
        ">
        <vue-good-table
          ref="usertable"
          :columns="columns"
          :rows="rows"
          styleClass="vgt-table striped"
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

<style scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 0px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  border-radius: 10px;
  width: 280px;
}

.icon-activates {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 60px;
  border-radius: 20px;
  background-color: #3c00ff;
}

.text-activates {
  margin-left: 70px;
}
</style>
