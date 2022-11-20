<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Fazendas</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa "> &#128668; Fazendas Ativas</i></p>
              <p class="subtitle" style="float: right">
                <span style="font-size: 12pt; color:#004aad">{{
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
                <router-link to="/fazendas/cadastrar">
                  <button class="button is-success">Inserir Fazenda</button>
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
                  @click="onClickPageFarmDetail(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else-if="props.column.field == 'name'">
              <span>{{ props.row.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'address'">
              <span>{{ props.row.address }}</span>
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
                    @click="onClickPageFarmEdit(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                    v-if="!props.row.inactive"
                    class="button is-danger is-outlined"
                    @click="onClickPageFarmInactive(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="onClickPageFarmActive(props.row.id)"
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
import { Vue } from "vue-class-component";
import { Farm } from "@/model/farm.model";
import { FarmClient } from "@/client/farm.client";

export default class FarmList extends Vue {
  public farmList: Farm[] = [];
  private farmClient!: FarmClient;
  count: any = null;

  
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
      label: "Endereço",
      field: "address",
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


  public mounted(): void {
    this.farmClient = new FarmClient();
    this.listAllFarms();
    this.countFarm();
  }

  public listAllFarms(): void {
    this.farmClient.findAll().then(
      (success) => {
        this.rows = success.data;
        this.count = success.data.filter((t) => !t.inactive).length;
      },
      (error) => console.log(error)
    );
  }

  public countFarm(): void {
    this.farmClient.count().then(
      (sucess) => {
        return (this.count = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }

  public onClickPageFarmDetail(id: number) {
    this.$router.push({ name: "farm-detail", params: { id: id } });
  }

  public onClickPageFarmEdit(id: number) {
    this.$router.push({ name: "farm-edit", params: { id: id } });
  }

  public onClickPageFarmInactive(id: number) {
    this.$router.push({ name: "farm-inactive", params: { id: id } });
  }
  public onClickPageFarmActive(id: number) {
    this.$router.push({ name: "farm-active", params: { id: id } });
  }
}
</script>
