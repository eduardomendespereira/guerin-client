<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos > Eventos do Gado</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div class="ativos p-2">
              <div class="icon-ativos">
                <img style="width: 30px;" src="@/assets/eventIcon.png" alt="Guerin"/>
              </div>
              <h1
                  class="text-ativos has-text-weight-bold is-size-5"
                  style="color: black"
              >
                Eventos Ativos
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
            styleClass="vgt-table striped"
            :search-options="{
            enabled: true,
            placeholder: 'Buscar...',
          }"
            :group-options="{
            enabled: true,
            collapsable: true,
            }"
            :pagination-options="{
            enabled: true,
            mode: 'records',
            rowsPerPageLabel: 'Resultados por pagina',
            nextLabel: 'Proximo',
            perPage: 100,
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
            <span v-if="props.column.field == 'cattle'">
              <span>{{ props.row.cattle?.earring }}</span>
            </span>
            <span v-else-if="props.column.field == 'event-type'">
              <span>{{ props.row.eventType?.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span>{{ convertDate(props.row.date) }}</span>
            </span>
            <span v-else-if="props.column.field == 'description'">
              <span>{{ props.row.description }}</span>
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
            <span v-else-if="props.column.field == 'actions' && !props.row.weighing && !props.row.vaccineApplication">
                <p class="buttons" v-if="!props.row.weighing || !props.row.vaccineApplication">
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
import {Options, Vue} from "vue-class-component";
import {Cattle} from "@/model/cattle.model";

export default class CattleEventList extends Vue {
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

  public convertDate(data: any) {
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  public mounted(): void {
    this.listAll();
  }

  public onClickPageUpdate(id: number) {
    console.log(id);
    this.$router.push({name: "cattle-event-update", params: {id: id}});
  }

  public onClickPageDetail(id: number) {
    this.$router.push({name: "cattle-event-detail", params: {id: id}});
  }

  public listAll(): void {
    CattleEventClient.findAllAgrouped()
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

<style scoped>
.ativos {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.text-ativos {
  margin-left: 60px;
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
