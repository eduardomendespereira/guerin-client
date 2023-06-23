<template>
  <aside class="cattle is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Cadastro <b>> Gado</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-cattle">
          <img
            style="width: 80px"
            src="../../assets/cowIcon.png"
            alt="Guerin"
          />
        </div>
        <div :class="notification.classe">
          <button @click="onClickCloseNotification()" class="delete"></button>
          {{ notification.mensagem }}
        </div>
        <div class="form">
          <input
            class="input in-1 "
            type="text"
            style="margin-left: 3%;"
            placeholder="Nº do Brinco"
            v-model="cattle.earring"
          />
          <div class="select in-1">
           
            <select class="select"  :key="reniciar" v-model="cattle.specie" style="margin-left: 9%;">
              <option value="undefined" disabled hidden>Espécie</option>
              <option v-for="item in specieList" :key="item.id" :value="item">{{item.name}}</option>
            </select>
          </div>
          <ModalInsertSpecie @Atualiza="renicia" class="add-specie" :mini="true"></ModalInsertSpecie>
        </div>
        <div class="form">
          <input
            class="input in-1"
            type="text"
            placeholder="Nº do Brinco do Pai"
            v-model="cattle.father"
          />
          <input
            class="input in-1"
            type="text"
            placeholder="Nº do Brinco da Mãe"
            v-model="cattle.mother"
          />
        </div>
        <div class="form">
          <input
            class="input in-1"
            type="text"
            placeholder="Peso"
            v-model="cattle.weight"
          />
          <div class="select in-1" >
            <select class="select" v-model="cattle.gender">
              <option value="undefined" disabled hidden>Gênero</option>
              <option value="male">Macho</option>
              <option value="female">Fêmea</option>
            </select>
          </div>
        </div>
        <div class="form">
          <input
            class="input in-1"
            type="date"
            placeholder="Data Nascimento"
            v-model="cattle.bornAt"
          />
          <div class="select in-1" >
            <select class="select" v-model="cattle.breastFeeding">
              <option value="undefined" disabled hidden>Em Período de Amamentação?</option>
              <option value=true>Sim</option>
              <option value=false>Não</option>
            </select>
          </div>
        </div>
        <div class="select date">
          <select class="select" style="width: 630px" v-model="cattle.farm">
            <option value="undefined" disabled hidden>Fazenda</option>
            <option v-for="item in farmList" :key="item.id" :value="item">{{item.name}}</option>
          </select>
        </div>
        <div class="select date">
          <select class="select" style="width: 630px" v-model="cattle.status">
            <option value="undefined" disabled hidden>Fase</option>
            <option v-for="item in cattleStatusList"  :value="item">{{item}}</option>
          </select>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/gados">
            <button class="button btn-back">Voltar ao Menu</button>
          </router-link>
          <button @click="onClickSave()" class="button btn-cad">
            Cadastrar Animal
          </button>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Notification } from "@/model/notification";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";
import { SpecieClient } from "@/client/specie.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Specie } from "@/model/specie.model";
import { FarmClient } from "@/client/farm.client";
import { Farm } from "@/model/farm.model"
import ModalInsertSpecie from "@/components/ModalInsertSpecie.vue";
@Options({
  components: {
    ModalInsertSpecie
  },
})
export default class cattleInsertForm extends Vue {
  private cattleClient!: CattleClient;
  private cattle: Cattle = new Cattle();
  private notification: Notification = new Notification();
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<any> = new PageResponse();
  private specieClient!: SpecieClient;
  private specieList: Specie[] = [];
  public reniciar !: 0
  private farmClient!: FarmClient;
  private farmList: Farm[] = [];
  private cattleStatusList: String[] = ['cria', 'recria', 'engorda']

  public mounted(): void {
    this.cattleClient = new CattleClient();
    this.specieClient = new SpecieClient();
    this.farmClient = new FarmClient();
    this.listAllSpecies();
    this.listAllFarms();
  }
  private listAllSpecies(): void {
    this.specieClient.findAll().then(
      (success) => {
        this.specieList = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public renicia(){
      this.listAllSpecies();
      this.reniciar += 1
  }
  private listAllFarms(): void {
    this.farmClient.findAll().then(
      (success) => {
        this.farmList = success.data;
      },
      (error) => console.log(error)
    );
  }
  private onClickSave(): void {
    this.cattleClient.save(this.cattle).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Gado cadastrado com sucesso!"
        );
        this.onClickClean();
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
        );
        this.onClickClean();
      }
    );
  }
  private onClickCloseNotification(): void {
    this.notification = new Notification();
  }
  private onClickClean(): void {
    this.cattle = new Cattle();
  }
}
</script>

<style lang="scss" scoped>
.cattle {
  width: 100%;
}
.insert-back {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 90%;
  margin-top: 20px;
}
.add-specie{
  margin-left: 1%;
  margin-top: 15px;
}
.icon-cattle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #4a9490;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
}
.form {
  display: flex;
  .in-1 {
    margin: 15px;
  }
  .input {
    width: 300px;
  }
  .select {
    width: 300px;
  }
}
.date {
  margin: 15px;
  width: 630px;
}
.line {
  background-color: #dbdbdb;
  margin: 30px 0px 0px 0px;
}
.btns {
  display: flex;
  .button {
    font-size: 18px;
    margin: 30px;
    width: 300px;
  }
}
.btn-cad {
  background-color: #005bd4;
  color: #ffffff;
  padding: 12px;
}
.btn-cad:hover {
  background-color: #0067ee;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}
.btn-back {
  background-color: #c20101;
  color: #ffffff;
  padding: 12px;
}
.btn-back:hover {
  background-color: #da0000;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}
</style>