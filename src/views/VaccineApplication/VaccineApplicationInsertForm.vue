<template>
  <div class="form-vaccine-application">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Eventos > Aplicações de Vacinas > Cadastrar Aplicação de Vacina
      </div>
    </div>

    <div class="content-form">
      <div class="align-icon-container">
        <img style="width: 140px; background-color: darkgreen; border-radius: 15px"  src="../../assets/vaccineAppIcon.png" />
      </div>

      <br/>

      <div class="columns" v-if="notification.ativo">
        <div class="column is-12">
          <div :class="notification.classe">
            <button @click="onClickCloseNotification()" class="delete" ></button>
            {{ notification.mensagem }}
          </div>
        </div>
      </div>

      <div class="container-inputs">
        <div class="control">
          <input class="input" style="width: 300px" type="text" v-model="vaccineApplication.note" placeholder="Descrição">
        </div>

        <div>
          Vacina
          <select v-model="vaccineApplication.vaccine">
            <option type="number" v-for="v in vaccineList" :key="v.id">{{ v.name }}
            </option>
          </select>
        </div>

        <div class="control">
          <input class="input" style="width: 300px" type="datetime-local" v-model="vaccineApplication.date" placeholder="Data">
        </div>

        <div>
          Brinco do Gado
          <select v-model="vaccineApplication.cattle">
            <option type="number" v-for="c in cattleList" :key="c.id">{{ c.earring }}</option>
          </select>
        </div>

      </div>
      <div class="container-buttons">
        <div class="container-boptions">
          <router-link class="link-cad" to="/eventos/aplicacoes-de-vacinas">
            <button class="button is-danger btn-voltar is-fullwidth">Voltar</button>
          </router-link>
        </div>
        <div class="container-boptions">
          <button class="button is-fullwidth is-link" @click="onClickSave()">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'
import { Notification } from '@/model/notification'
import {VaccineApplication} from "@/model/vaccine-application.model";
import {VaccineApplicationClient} from "@/client/vaccine-application.client";
import {Vaccine} from "@/model/vaccine.model";
import {VaccineClient} from "@/client/vaccine.client";
import {Cattle} from "@/model/cattle.model";
import {CattleClient} from "@/client/cattle.client";

export default class VaccineInsertForm extends Vue {
  private vaccineApplicationClient!: VaccineApplicationClient
  private vaccineApplication : VaccineApplication = new VaccineApplication()
  private notification : Notification = new Notification()
  private vaccineList: Vaccine[] = []
  private vaccineClient!: VaccineClient
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Vaccine> = new PageResponse()
  private cattleList: Cattle[] = []
  private cattleClient!: CattleClient
  private pageResponseCattle: PageResponse<Cattle> = new PageResponse()

  public mounted(): void {
    this.vaccineApplicationClient = new VaccineApplicationClient()
    this.vaccineClient = new VaccineClient()
    this.cattleClient = new CattleClient()
    this.listAllVaccines()
    this.listAllCattles()
  }

  private listAllVaccines(): void{
    this.vaccineClient.findByAll(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.vaccineList = this.pageResponse.content
            },
            error => console.log(error)
        )
    //Não presta
    // for(var i = 0; i < this.vaccineList.length; i++){
    //   if(this.vaccineList[i].inactive){
    //     delete this.vaccineList[i]
    //   }
    // }
  }

  private listAllCattles(): void{
    this.cattleClient.findAll(this.pageRequest)
        .then(
            success => {
              this.pageResponseCattle = success
              this.cattleList = this.pageResponseCattle.content
            },
            error => console.log(error)
        )
  }

  private onClickSave(): void {
    this.vaccineApplicationClient.save(this.vaccineApplication)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Aplicação de Vacina cadastrada com sucesso!!!')
              this.onClickClean()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
              this.onClickClean()
            })
  }

  private onClickCloseNotification(): void {
    this.notification = new Notification()
  }
  private onClickClean(): void {
    this.vaccineApplication = new VaccineApplication()
  }
}

</script>

<style lang="scss">
.form-vaccine-application{
  width: 100%;
  padding: 0px 30px 0px 30px;
  background-color: lightgray;
}
.content-form{
  background-color: white;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
}
.align-icon-container{
  display: flex;
  justify-content: center;
}
.container-inputs{
  display: flex;
  flex-direction: row;
  margin-top: 200px;
  justify-content: space-evenly;
}
.container-buttons{
  display: flex;
  margin-top: 200px;
  justify-content: space-evenly;
}
.container-boptions{
  width: 300px;
}

</style>