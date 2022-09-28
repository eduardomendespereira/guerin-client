<template>
  <aside class="cattle is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Gados</b></p>
      <div class="ativos p-2">
        <div class="icon-ativos">
          <img
            style="width: 30px"
            src="../../assets/cowIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-ativos has-text-weight-bold is-size-5"
          style="color: black"
        >
          BETA TESTE
        </h1>
      </div>
    </div>

    <div class="is-flex is-justify-content-center pt-5">
      <div class="header-btn">
        <router-link to="/gados/cadastrar">
          <button class="button btn-insert">Inserir Gado</button>
        </router-link>
      </div>
    </div>

    <table class="table table-div is-fullwidth mt-5">
      <thead class="green">
        <tr style="background-color: mediumpurple">
          <th style="color: #fff">Brinco</th>
          <th style="color: #fff">Peso</th>
          <th style="color: #fff">Genero</th>
          <th style="color: #fff">Fazenda</th>
          <th style="color: #fff">Especie</th>
          <th style="color: #fff">B. Pai</th>
          <th style="color: #fff">B. Mãe</th>
          <th style="color: #fff">Ativo</th>
          <th style="color: #fff">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cattleList" :key="item.id">
          <th>{{ item.earring }}</th>
          <th>{{ item.weight }}</th>
          <th>{{ item.gender }}</th>
          <th>{{ item.farm?.name }}</th>
          <th>{{ item.specie?.name }}</th>
          <th>
            <span v-if="!item.father"> --- </span>
            <span v-if="item.father"> {{ item.father }} </span>
          </th>
          <th>
            <span v-if="!item.mother"> --- </span>
            <span v-if="item.mother"> {{ item.mother }} </span>
          </th>
          <th>
            <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
            <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
          </th>
          <th>
            <button
              @click="onClickPageCattleDetail(item.earring)"
              class="button is-small is-warning"
            >
              Detalhar
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";

export default class CattleList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Cattle> = new PageResponse();
  public cattleList: Cattle[] = [];
  private cattleClient!: CattleClient;

  public mounted(): void {
    this.cattleClient = new CattleClient();
    this.listAllCattles();
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

  public onClickPageCattleDetail(earring: number) {
    this.$router.push({ name: "cattle-detail", params: { earring: earring } });
  }
}
</script>

<style lang="scss">
.cattle {
  width: 100%;
}

.ativos {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.icon-ativos {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  height: 45px;
  border-radius: 20px;
  background-color: #4a9490;
}

.text-ativos {
  margin-left: 60px;
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
</style>
