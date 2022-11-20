<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos > Eventos do Gado</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa fa-syringe"> Eventos Ativos</i></p>
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
                <router-link to="/eventos/eventos-gados/cadastrar">
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
            ref="cattleEventTable"
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
            <span v-if="props.column.field == 'cattle'">
              <span>{{ props.row.cattle?.earring }}</span>
            </span>
            <span v-else-if="props.column.field == 'event-type'">
              <span>{{props.row.eventType?.name}}</span>
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span>{{convertDate(props.row.date)}}</span>
            </span>
            <span v-else-if="props.column.field == 'description'">
              <span>{{props.row.description}}</span>
            </span>
            <span v-else-if="props.column.field == 'vaccine-app'">
              <span v-if="!props.row.vaccineApplication" class="tag is-danger"
              >Não</span
              >
              <span v-else-if="props.row.vaccineApplication" class="tag is-success"
              >Sim
              </span>
            </span>
            <span v-else-if="props.column.field == 'weighing'">
              <span v-if="!props.row.weighing" class="tag is-danger"
              >Não</span
              >
              <span v-else-if="props.row.weighing" class="tag is-success"
              >Sim
              </span>
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
                    @click="disableCattleEvent(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="enableCattleEvent(props.row.id)"
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
import CattleEventClient from "@/client/cattle-event.client";
import { Options, Vue } from "vue-class-component";
import {Cattle} from "@/model/cattle.model";

export default class CattleEventList extends Vue {
  columns = [
    {
      label: "Gado",
      field: "cattle",
    },
    {
      label: "Tipo de Evento",
      field: "event-type",
    },
    {
      label: "Data",
      field: "date",
    },
    {
      label: "Descrição",
      field: "description",
    },
    {
      label: "Aplicação de Vacina",
      field: "vaccine-app",
    },
    {
      label: "Pesagem",
      field: "weighing",
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

  public convertDate(data : any ){
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  public mounted(): void {
    this.listAll();
  }
  public onClickPageUpdate(id: number) {
    console.log(id);
    this.$router.push({ name: "cattle-event-update", params: { id: id } });
  }
  public listAll(): void {
    CattleEventClient.findAll()
        .then((response: any) => {
          this.rows = response.data;
          this.count = response.data.filter((t) => !t.inactive).length;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
  }
  public disableCattleEvent(id: number): void {
    if (confirm("Deseja mesmo desabilitar este evento?")) {
      CattleEventClient.disable(id)
          .then((response: any) => {
            window.alert("Evento desabilitado com sucesso!");
            this.listAll();
            console.log(response);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }
  }
  public enableCattleEvent(id: number): void {
    if (confirm("Deseja mesmo habilitar este evento?")) {
      CattleEventClient.enable(id)
          .then((response: any) => {
            window.alert("Evento habilitado com sucesso!");
            this.listAll();
            console.log(response);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }
  }
}
</script>
