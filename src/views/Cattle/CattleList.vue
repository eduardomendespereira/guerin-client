<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Gados</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="icon-activates">
                <img
                  style="width: 40px"
                  src="../../assets/cowIcon.png"
                  alt="Guerin"
                />
              </div>
              <p class="title">Gados Ativos</p>
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

<style lang="scss">
.icon-activates {
  top: 0.5rem;
  left: 77rem;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 65px;
  height: 55px;
  border-radius: 20px;
  background-color: rgb(171, 3, 3);
}
</style>