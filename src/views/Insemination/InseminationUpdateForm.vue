<template>
  <div class="form-vaccine-application">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Inseminações > Editar
      </div>
    </div>

    <div class="content-form">
      <div class="align-icon-container">
        <img style="width: 100px; background-color: green; border-radius: 15px;"  src="../../assets/inseminationIcon.png" />
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
        <div class="division-inputs">
          <input class="input" style="width: 300px; margin: 15px" type="datetime-local" v-model="insemination.date" placeholder="Data">

          <div class="select" style="margin: 15px">
            <select class="select" style="width: 300px;" v-model="insemination.cattle">
              <option type="number" v-for="c in cattleList" :key="c.id" :value="c">{{ c.earring }}</option>
            </select>
          </div>
        </div>
      </div>
      <hr class="line" size="100" width="1000" />
      <div class="container-buttons">
        <div class="container-boptions">
          <router-link class="link-cad" to="/eventos/inseminacoes">
            <button class="button is-danger btn-voltar is-fullwidth">Voltar</button>
          </router-link>
        </div>
        <div class="container-boptions">
          <button class="button is-fullwidth is-link" @click="onClickEdit()">Atualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Notification } from '@/model/notification'
import { Insemination } from "@/model/insemination.model";
import InseminationClient from "@/client/insemination.client";
import {Prop} from "vue-property-decorator";
import {Cattle} from "@/model/cattle.model";
import {CattleClient} from "@/client/cattle.client";

export default class VaccineInsertForm extends Vue {
  private insemination : Insemination = new Insemination()
  private notification : Notification = new Notification()
  private cattleList: Cattle[] = []
  private cattleClient!: CattleClient

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.cattleClient = new CattleClient()
    this.getInsemination()
    this.listAllCattles()
  }

  private listAllCattles(): void{
    this.cattleClient.findAll()
        .then(
            success => {
              this.cattleList = success.data
            },
            error => console.log(error)
        )
  }

  private getInsemination(): void {
    InseminationClient.findById(this.id)
        .then(
            success => {
              this.insemination = success.data
            },
            error => console.log(error)
        )
  }

  private onClickEdit(): void {
    InseminationClient.update(this.insemination)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Inseminação atualizada com sucesso!!!')
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
    this.insemination = new Insemination()
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
}

.division-inputs{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 20px;
}
.align-icon-container{
  display: flex;
  justify-content: center;
}
.container-inputs{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.container-buttons{
  display: flex;
  margin-top: 100px;
  justify-content: space-evenly;
}
.container-boptions{
  width: 300px;
  margin: 30px;
}
</style>