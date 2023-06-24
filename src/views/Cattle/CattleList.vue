<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Gados</b></p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <!-- <article class="tile is-child box"> -->
              <div class="columns is-flex is-justify-content-space-between" style="margin-bottom: 0px;">
                <div class="activates p-2">
                  <div class="icon-activates">
                    <img
                      style="width: 40px"
                      src="../../assets/cowIcon.png"
                      alt="Guerin"
                    />
                  </div>
                  <h1
                    class="text-activates has-text-weight-bold is-size-4"
                    style="color: black"
                  >
                    Gados
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
                <div class="activates p-2">
                  <div class="icon-activates-female">
                    <img
                      style="width: 60px"
                      src="../../assets/cattleIcon.png"
                      alt="Guerin"
                    />
                  </div>
                  <h1
                    class="text-activates has-text-weight-bold is-size-4"
                    style="color: black"
                  >
                    Vacas
                  </h1>

                  <div>
                    <h1
                      class="is-size-4 is-flex is-justify-content-flex-end pr-2"
                      style="color: #004aad"
                      span
                    >
                      {{ countFemale }}
                    </h1>
                  </div>
                </div>
                <div class="activates p-2" style="margin-right: 12px;">
                  <div class="icon-activates-male">
                    <img style="width: 60px" src="../../assets/oxIcon.png" alt="Guerin" />
                  </div>
                  <h1
                    class="text-activates has-text-weight-bold is-size-4"
                    style="color: black"
                  >
                    Bois
                  </h1>

                  <div>
                    <h1
                      class="is-size-4 is-flex is-justify-content-flex-end pr-2"
                      style="color: #004aad"
                      span
                    >
                      {{ countMale }}
                    </h1>
                  </div>
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
                <router-link to="/gados/cadastrar">
                  <button class="button is-success">Inserir Animal</button>
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
                  @click="onClickPageCattleDetail(props.row.earring)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else-if="props.column.field == 'earring'">
              <span>{{ props.row.earring }}</span>
            </span>
            <span v-else-if="props.column.field == 'weight'">
              <span>{{ props.row.weight }}</span>
            </span>
            <span v-else-if="props.column.field == 'specie'">
              <span>{{ props.row.specie?.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'farm'">
              <span>{{ props.row.farm?.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'gender'">
              <span v-if="props.row.gender == 'male'">Macho</span>
              <span v-else>Fêmea</span>
            </span>
            <span v-else-if="props.column.field == 'father'">
              <span>{{ props.row.father }}</span>
            </span>
            <span v-else-if="props.column.field == 'mother'">
              <span>{{ props.row.mother }}</span>
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
                    @click="onClickPageCattleEdit(props.row.earring)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                    v-if="!props.row.inactive"
                    class="button is-danger is-outlined"
                    @click="onClickPageCattleInactive(props.row.earring)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                    v-else-if="props.row.inactive"
                    class="button is-success is-outlined"
                    @click="onClickPageCattleActive(props.row.earring)"
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
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";

export default class CattleList extends Vue {
  public cattleList: Cattle[] = [];
  private cattleClient!: CattleClient;
  count: any = null;
  countFemale: any = null;
  countMale: any = null;

  columns = [
    {
      label: "Detalhar",
      field: "detail"
    },
    {
      label: "Brinco",
      field: "earring",
    },
    {
      label: "Peso",
      field: "weight",
    },
    {
      label: "Especie",
      field: "specie",
    },
    {
      label: "Fazenda",
      field: "farm",
    },
    {
      label: "Genero",
      field: "gender",
    },
    {
      label: "Pai",
      field: "father",
    },
    {
      label: "Mãe",
      field: "mother",
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
    this.cattleClient = new CattleClient();
    this.listAllCattles();
    this.countCattle();
    this.countCattleFemale();
    this.countCattleMale();
  }

  public listAllCattles(): void {
    this.cattleClient.findAll().then(
      (success: any) => {
        this.rows = success.data;
        this.count = success.data.filter((t) => !t.inactive).length;
      },
      (error) => console.log(error)
    );
  }

  public countCattle(): void {
    this.cattleClient.count().then(
      (sucess) => {
        return (this.count = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }

  public countCattleFemale(): void {
    this.cattleClient.countFemale().then(
      (sucess) => {
        return (this.countFemale = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }

  public countCattleMale(): void {
    this.cattleClient.countMale().then(
      (sucess) => {
        return (this.countMale = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }

  public onClickPageCattleDetail(earring: number) {
    this.$router.push({ name: "cattle-detail", params: { earring: earring } });
  }

  public onClickPageCattleEdit(earring: number) {
    this.$router.push({ name: "cattle-edit", params: { earring: earring } });
  }

  private onClickPageCattleInactive(earring: number) {
    this.$router.push({ name: "cattle-inactive", params: { earring: earring } });
  }
  private onClickPageCattleActive(earring: number) {
    this.$router.push({ name: "cattle-active", params: { earring: earring } });
  }
}
</script>

<style lang="scss" scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  width: 220px;
  margin-right: 45px;
  margin-left: 45px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  border-radius: 10px;
}

.icon-activates {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 65px;
  height: 55px;
  border-radius: 20px;
  background-color: #126b00;
}

.icon-activates-female {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 65px;
  height: 55px;
  border-radius: 20px;
  background-color: #007a9b;
}

.icon-activates-male {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 65px;
  height: 55px;
  border-radius: 20px;
  background-color: #ab0303;
}

.text-activates {
  display: flex;
  justify-content: end;
  margin-right: 40px;
}
</style>