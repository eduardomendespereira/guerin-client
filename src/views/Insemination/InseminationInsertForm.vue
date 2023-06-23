<template>
  <main class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Cadastro <b>> Inseminações</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-insemination">
        <div>
          <img style="width: 140px; background-color: darkgreen; border-radius: 15px"  src="../../assets/inseminationIcon.png" />
        </div>

        <div class="columns" v-if="notification.ativo" style="margin-top: 5%">
          <div class="column is-12">
            <div :class="notification.classe">
              <button
                  @click="onClickCloseNotification()"
                  class="delete"
              ></button>
              {{ notification.mensagem }}
            </div>
          </div>
        </div>
        <p v-if="errors.length" style="margin-top: 5%">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="error in errors" :key="error.mensagem">{{ error.mensagem }}</li>
        </ul>
        </p>
        <div class="field is-horizontal form">
          <div class="field-body">
            <div class="field" style="margin-right: 40px">
              Gado
              <select v-model="insemination.cattle">
                <option type="number" v-for="c in cattleListFemale" 
                :key="c.id" 
                :value="c">{{ c.earring }}</option>
              </select>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="datetime-local"
                    placeholder="Data"
                    v-model="insemination.date"
                />
              </p>
            </div>
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/eventos/inseminacoes">
            <button class="button is-danger">Voltar</button>
          </router-link>
          <button @click="onClickSave()" class="button is-link">Salvar</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" scoped>
import { Vue } from "vue-class-component";
import { Notification } from "@/model/notification";
import { Insemination } from "@/model/insemination.model";
import inseminationClient from "@/client/insemination.client";
import {Cattle} from "@/model/cattle.model";
import {CattleClient} from "@/client/cattle.client";

export default class InseminationInsertForm extends Vue {

  private insemination: Insemination = new Insemination();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();
  private cattleListFemale: Cattle[] = []
  private cattleClient!: CattleClient

  public mounted(): void {
    this.cattleClient = new CattleClient()
    this.listAllCattles()
  }

  private listAllCattles(): void{
    this.cattleClient.findAllFemale()
        .then(
            success => {
              this.cattleListFemale = success.data
            },
            error => console.log(error)
        )
  }

  private onClickSave(): void {
    this.errors = new Array<Notification>();
    if (!this.insemination.date) {
      this.errors.push(new Notification().newNot("Data é obrigatória"));
    }
    if (!this.insemination.cattle) {
      this.errors.push(new Notification().newNot("Gado é obrigatorio."));
    }
    if (this.errors.length == 0) {
      
      inseminationClient.save(this.insemination).then(
          (success) => {
            this.notification = this.notification.new(
                true,
                "notification is-success",
                "Inseminação cadastrada com sucesso!!!"
            );
            this.onClickClean();
          },
          (error) => {
            console.log(error);
            this.notification = this.notification.new(
                true,
                "notification is-danger",
                "Error: " + error.response.data
            );
            this.onClickClean();
          }
      );
    }
  }
  private onClickCloseNotification(): void {
    this.notification = new Notification();
  }
  private onClickClean(): void {
    this.insemination = new Insemination();
  }
}
</script>

<style lang="scss" scoped>
.insert-background-insemination {
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
.form {
  margin-top: 5%;
  display: flex;
}
.btns {
  display: flex;
  .button {
    font-size: 18px;
    margin: 30px;
    width: 300px;
  }
}
select{
  height: 30px;
  width: 220px;
  border-radius: 5px;
  border-color: grey;
}
</style>
