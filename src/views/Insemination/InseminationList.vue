<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Inseminações</b></p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="ativos p-2">
              <div class="icon-ativos">
                <img style="" src="@/assets/inseminationIcon.png"  alt="Guerin" />
              </div>
              <h1
                  class="text-ativos has-text-weight-bold is-size-4"
                  style="color: black"
              >
                Inseminações Ativas
              </h1>
              <div>
                <h1
                    class="is-size-4 is-flex is-justify-content-flex-end pr-2"
                    style="color: #004aad"
                    span
                >
                  {{ count }}
                </h1>
              </div>
            </div>
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
                <router-link to="/eventos/inseminacoes/cadastrar">
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
            ref="inseminationTable"
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
            <span v-if="props.column.field == 'detail'">
              <p class="buttons">
                <button
                    class="button is-info is-outlined"
                    @click="onClickPageDetail(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else-if="props.column.field == 'cattle'">
              <span>{{props.row.cattle?.earring}}</span>
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span>{{convertDate(props.row.date)}}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success"
              >Ativo</span
              >
              <span v-else-if="props.row.inactive" class="tag is-danger"
              >Inativo</span
              >
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
                    @click="disableInsemination(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="enableInsemination(props.row.id)"
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
import { Options, Vue } from "vue-class-component";
import {Insemination} from "@/model/insemination.model";
import {Cattle} from "@/model/cattle.model";
import InseminationClient from "@/client/insemination.client";

export default class InseminationList extends Vue {
  columns = [
    {
      label: "Detalhar",
      field: "detail"
    },
    {
      label: "Gado",
      field: "cattle",
    },
    {
      label: "Data",
      field: "date",
    },
    {
      label: "Ativo",
      field: "inactive",
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
    this.$router.push({ name: "insemination-update", params: { id: id } });
  }

  public onClickPageDetail(id: number) {
    this.$router.push({ name: "insemination-detail", params: { id: id } });
  }

  public convertDate(data : any ){
    let obj = new Date(data)
    return obj.toLocaleString()
  }
  public listAll(): void {
    InseminationClient.findAll()
        .then((response: any) => {
          this.rows = response.data;
          this.count = response.data.filter((t) => !t.inactive).length;
        })
        .catch((e: Error) => {
          console.log(e);
        });
  }
  public disableInsemination(id: number): void {
    if (confirm("Deseja mesmo desabilitar esta inseminação?")) {
      InseminationClient.disable(id)
          .then((response: any) => {
            window.alert("Inseminação desabilitada com sucesso!");
          })
          .catch((e: Error) => {
            console.log(e);
          });
      location.reload();
    }
  }
  public enableInsemination(id: number): void {
    if (confirm("Deseja mesmo habilitar esta inseminação?")) {
      InseminationClient.enable(id)
          .then((response: any) => {
            window.alert("Inseminação habilitada com sucesso!");
          })
          .catch((e: Error) => {
            console.log(e);
          });
      location.reload();
    }

  }
}
</script>

<style scoped>
.ativos {
  background-color: white;
  margin-top: 45px;
  margin-right: 0px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 350px;
}
.text-ativos {
  margin-left: 65px;
}
.icon-ativos {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  border-radius: 20px;
  background-color: green;
}
</style>
