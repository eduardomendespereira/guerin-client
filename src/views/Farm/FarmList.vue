<template>
  <aside class="farm is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Fazendas</b></p>
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
    </div>

    <div class="is-flex is-justify-content-center pt-5">
      <div class="header-btn">
        <router-link to="/fazendas/cadastrar">
          <button class="button btn-insert">Inserir Fazenda</button>    
        </router-link>
      </div>
    </div>

    <div class="table-div">
      <table class="table">
        <thead class="header-table">
          <tr>
            <th>Dt.</th>
            <th>Status</th>
            <th>Registrado em</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in farmList" :key="item.id">
            <th>
              <button
                @click="onClickPageFarmDetail(item.id)"
                class="button btn-detail"
              >
                !
              </button>
            </th>

            <th>
              <span v-if="!item.inactive" class="tag is-success"></span>
              <span v-if="item.inactive" class="tag is-danger"></span>
            </th>

            <th>{{ item.registered }}</th>

            <th>{{ item.name }}</th>

            <th>{{ item.address }}</th>

            <th>
              <button
                @click="onClickPageFarmDetail(item.id)"
                class="button btn-edit"
              >
                <img
                  style="width: 15px"
                  src="../../assets/editIcon.png"
                  alt="Guerin"
                />
              </button>
            </th>

            <th>
              <button
                @click="onClickPageFarmDetail(item.id)"
                class="button btn-delet"
              >
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
import { Farm } from "@/model/farm.model";
import { FarmClient } from "@/client/farm.client";

export default class FarmList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Farm> = new PageResponse();
  public farmList: Farm[] = [];
  private farmClient!: FarmClient;
  count: any = null;

  public mounted(): void {
    this.farmClient = new FarmClient();
    this.listAllFarms();
    this.countFarm();
  }

  public listAllFarms(): void {
    this.farmClient.findAll(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.farmList = this.pageResponse.content;
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
}
</script>

<style scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
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
  margin-left: 60px;
}

.farm {
  width: 100%;
}

.header-btn {
  background-color: white;
  width: 95%;
  padding: 30px;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.table-div {
  padding: 30px;
}

.table {
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 100%;
}

.tag {
  border-radius: 50px;
  padding: 12px;
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
</style>
