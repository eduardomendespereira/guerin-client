<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos > Aplicações de Vacinas</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa fa-syringe"> Aplicações Ativas</i></p>
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
                <router-link to="/eventos/aplicacoes-de-vacinas/cadastrar">
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
            ref="vaccineApplicationTable"
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
            <span v-if="props.column.field == 'note'">
              <span>{{ props.row.note }}</span>
            </span>
            <span v-else-if="props.column.field == 'vaccine'">
              <span>{{props.row.vaccine?.name}}</span>
            </span>
            <span v-else-if="props.column.field == 'cattle'">
              <span>{{props.row.cattle?.earring}}</span>
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span>{{props.row.date}}</span>
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
                    @click="disableVaccineApplication(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="enableVaccineApplication(props.row.id)"
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
import VaccineApplicationClient from "@/client/vaccine-application.client";
import { Options, Vue } from "vue-class-component";
import {VaccineApplication} from "@/model/vaccine-application.model";
import {Cattle} from "@/model/cattle.model";

export default class VaccineApplicationList extends Vue {
  columns = [
    {
      label: "Descrição",
      field: "note",
    },
    {
      label: "Vacina",
      field: "vaccine",
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
    console.log(id);
    this.$router.push({ name: "vaccine-application-update", params: { id: id } });
  }
  public listAll(): void {
    VaccineApplicationClient.findByAll()
        .then((response: any) => {
          this.rows = response.data;
          this.count = response.data.filter((t) => !t.inactive).length;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
  }
  public disableVaccineApplication(id: number): void {
    if (confirm("Deseja mesmo desabilitar esta vacina?")) {
      VaccineApplicationClient.disable(id)
          .then((response: any) => {
            window.alert("Aplicação de Vacina desabilitada com sucesso!");
            this.listAll();
            console.log(response);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }
  }
  public enableVaccineApplication(id: number): void {
    if (confirm("Deseja mesmo habilitar esta aplicação vacina?")) {
      VaccineApplicationClient.enable(id)
          .then((response: any) => {
            window.alert("Aplicação de Vacina habilitada com sucesso!");
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
