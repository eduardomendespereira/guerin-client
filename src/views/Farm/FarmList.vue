<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Fazendas</b></p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <!-- <article class="tile is-child box"> -->
              <div class="activates p-2">
        <div class="icon-activates">
          <img
            style="width: 30px"
            src="../../assets/farmIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Fazendas Ativas
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
            <!-- </article> -->
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
      label: "Status",
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
<style scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 0px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 280px;
}
.icon-activates {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  border-radius: 20px;
  background-color: #ffb800;
}
.text-activates {
  margin-left: 65px;
}
.tag {
  border-radius: 50px;
  padding: 12px;
}
</style>