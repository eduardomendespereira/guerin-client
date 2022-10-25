<template>
  <main class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Gados</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa fa-users"> Gados Ativos</i></p>
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
                <router-link to="/gados/cadastrar">
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
          ref="cattletable"
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
            <span v-if="props.column.field == 'earring'">
              <span>{{ props.row.earring }}</span>
            </span>
            <span v-if="props.column.field == 'weight'">
              <span>{{ props.row.weight }}</span>
            </span>
            <span v-if="props.column.field == 'specie'">
              <span>{{ props.row.specie?.name}}</span>
            </span>
            <span v-if="props.column.field == 'farm'">
              <span>{{ props.row.farm?.name }}</span>
            </span>
            <span v-if="props.column.field == 'gender'">
              <span>{{ props.row.gender }}</span>
            </span>
            <span v-if="props.column.field == 'father'">
              <span>{{ props.row.father }}</span>
            </span>
            <span v-if="props.column.field == 'mother'">
              <span>{{ props.row.mother }}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success"
                >Ativo</span
              >
              <span v-else-if="props.row.inactive" class="tag is-danger"
                >Inativo</span
              >
              <span v-else>{{ props.row.inactive }}</span>
            </span>
            <span v-else-if="props.column.field == 'actions'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageCattleEdit(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  v-if="!props.row.inactive"
                  class="button is-danger is-outlined"
                  @click="onClickPageCattleInactive(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                  v-else-if="props.row.inactive"
                  class="button is-success is-outlined"
                  @click="onClickPageCattleInactive(props.row.id)"
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
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";
import { Gender } from "@/model/gender.enum";

export default class CattleList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Cattle> = new PageResponse();
  public cattleList: Cattle[] = [];
  private cattleClient!: CattleClient;
  count: any = null;
  countFemale: any = null;
  countMale: any = null;
  private cattleGender!: String;

  columns = [
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

  private getGender(gender: any): Gender {
    if (gender == "male") {
      return Gender["male"]
    }
    else {
      return Gender["female"]
    }
  }
}
</script>

<style scoped>
.cattle {
  width: 100%;
}

.tag {
  border-radius: 50px;
  padding: 12px;
}

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

.header-btn {
  background-color: white;
  width: 95%;
  padding: 30px;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-insert {
  font-size: 15px;
  background-color: #126b00;
  border-color: #126b00;
  color: #ffffff;
  padding: 12px;
}

.btn-insert:hover {
  background-color: #178a00;
  transform: translate(-1px, -1px);
  transition: 1s;
  box-shadow: 0px 0px 10px #d1d1d1;
}


.btn-detail {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #0093ff;
  border-width: 3px;
  border-radius: 150px;
  color: #0093ff;
  font-weight: bold;
  padding: 12px;
}

.btn-detail:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #00c1ff;
  color: #00c1ff;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-edit {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #1ba500;
  border-width: 3px;
  border-radius: 150px;
  font-weight: bold;
  padding: 0px 5px;
}

.btn-edit:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #25e000;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-delet {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #ab0303;
  border-width: 3px;
  border-radius: 150px;
  color: #ab0303;
  font-weight: bold;
  padding: 0px 8px;
}

.btn-delet:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #dd0000;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}

.table-div {
  padding: 30px;
}

.table {
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 100%;
}

</style>
