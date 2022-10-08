<template>
  <aside class="cattle is-fullheight">
    <!--<p class="is-size-4 pt-5 pl-5"><b>Gados</b></p>-->
    <div class="columns is-flex is-justify-content-space-between">
      <div class="activates p-2">
        <div class="icon-activates">
          <img style="width: 40px" src="../../assets/cowIcon.png" alt="Guerin" />
        </div>
        <h1 class="text-activates has-text-weight-bold is-size-4" style="color: black">
          Gados
        </h1>

        <div>
          <h1 class="is-size-4 is-flex is-justify-content-flex-end pr-2" style="color: #004aad" span>
            {{ count }}
          </h1>
        </div>
      </div>
      <div class="activates p-2">
        <div class="icon-activates-female">
          <img style="width: 60px" src="../../assets/cattleIcon.png" alt="Guerin" />
        </div>
        <h1 class="text-activates has-text-weight-bold is-size-4" style="color: black">
          Vacas
        </h1>

        <div>
          <h1 class="is-size-4 is-flex is-justify-content-flex-end pr-2" style="color: #004aad" span>
            {{ countFemale }}
          </h1>
        </div>
      </div>
      <div class="activates p-2">
        <div class="icon-activates-male">
          <img style="width: 60px" src="../../assets/oxIcon.png" alt="Guerin" />
        </div>
        <h1 class="text-activates has-text-weight-bold is-size-4" style="color: black">
          Bois
        </h1>

        <div>
          <h1 class="is-size-4 is-flex is-justify-content-flex-end pr-2" style="color: #004aad" span>
            {{ countMale }}
          </h1>
        </div>
      </div>
    </div>

    <div class="is-flex is-justify-content-center pt-5">
      <div class="header-btn">
        <router-link to="/gados/cadastrar">
          <button class="button btn-insert">Inserir Gado</button>
        </router-link>
      </div>
    </div>

    <div class="table-div">
      <table class="table">
        <thead class="header-table">
          <tr>
            <th>Dt.</th>
            <th>Status</th>
            <!-- <th>Registrado em</th> -->
            <th>Brinco</th>
            <th>Gênero</th>
            <th>Especie</th>
            <th>Fazenda</th>
            <th>Peso</th>
            <th>B. Pai</th>
            <th>B. Mãe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cattleList" :key="item.id">
            <th>
              <button class="button btn-detail">
                !
              </button>
            </th>

            <th>
              <span v-if="!item.inactive" class="tag is-success"></span>
              <span v-if="item.inactive" class="tag is-danger"></span>
            </th>

            <!-- <th>{{ item.registered }}</th> -->

            <th>{{ item.earring }}</th>

            <th >{{ getGender(item.gender) }}</th>
            
            <th>{{ item.specie?.name }}</th>

            <th>{{ item.farm?.name }}</th>

            <th>{{ item.weight }}</th>

            <th>
              <span v-if="!item.father"> --- </span>
              <span v-if="item.father"> {{ item.father }} </span>
            </th>

            <th>
              <span v-if="!item.mother"> --- </span>
              <span v-if="item.mother"> {{ item.mother }} </span>
            </th>

            <th>
              <button class="button btn-edit">
                <img style="width: 15px" src="../../assets/editIcon.png" alt="Guerin" />
              </button>
            </th>

            <th>
              <button class="button btn-delet">
                X
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </aside>
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

  public mounted(): void {
    this.cattleClient = new CattleClient();
    this.listAllCattles();
    this.countCattle();
    this.countCattleFemale();
    this.countCattleMale();
  }

  public listAllCattles(): void {
    this.cattleClient.findAll(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.cattleList = this.pageResponse.content;
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
