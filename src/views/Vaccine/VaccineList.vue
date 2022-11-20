<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos > Vacinas</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">

              <p class="title"><i class="fa fa-syringe"> Vacinas Ativas</i></p>
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
                <router-link to="/eventos/vacinas/cadastrar">
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
            ref="vaccinetable"
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
            <span v-if="props.column.field == 'name'">
              <span>{{ props.row.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'required'">
              <span v-if="props.row.required == true" class="tag is-success"
              >Sim</span
              >
              <span v-else-if="props.row.required == false" class="tag is-warning"
              >Não</span
              >
              <span v-else>{{ props.row.required }}</span>
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
                    @click="disableVaccine(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="enableVaccine(props.row.id)"
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
import VaccineClient from "@/client/vaccine.client";
import { Options, Vue } from "vue-class-component";

export default class VaccineList extends Vue {
  columns = [
    {
      label: "Detalhar",
      field: "detail"
    },
    {
      label: "Nome",
      field: "name",
    },
    {
      label: "Obrigatória",
      field: "required",
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
    this.$router.push({ name: "vaccine-update", params: { id: id } });
  }

  public onClickPageDetail(id: number) {
    this.$router.push({ name: "vaccine-detail", params: { id: id } });
  }

  public listAll(): void {
    VaccineClient.findAll()
        .then((response: any) => {
          this.rows = response.data;
          this.count = response.data.filter((t) => !t.inactive).length;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
  }
  public disableVaccine(id: number): void {
    if (confirm("Deseja mesmo desabilitar esta vacina?")) {
      VaccineClient.disable(id)
          .then((response: any) => {
            window.alert("Vacina desabilitada com sucesso!");
            this.listAll();
            console.log(response);
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }
  }
  public enableVaccine(id: number): void {
    if (confirm("Deseja mesmo habilitar este vacina?")) {
      VaccineClient.enable(id)
          .then((response: any) => {
            window.alert("Vacina habilitada com sucesso!");
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
