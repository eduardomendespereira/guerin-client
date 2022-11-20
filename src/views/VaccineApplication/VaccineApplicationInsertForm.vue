<template>
  <main class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Cadastro <b>> Aplicação de Vacina</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-vaccine-app">
        <div class="icon-user">
          <img style="width: 140px; background-color: darkgreen; border-radius: 15px"  src="../../assets/vaccineAppIcon.png" />
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
            <div class="field">
              Vacina
              <select v-model="vaccineApplication.vaccine">
                <option type="number" v-for="v in vaccineList" :key="v.id" :value="v">{{ v.name }}</option>
              </select>
            </div>
            <div class="field" style="margin-right: 40px">
              Gado
                <select v-model="vaccineApplication.cattle">
                  <option type="number" v-for="c in cattleList" :key="c.id" :value="c">{{ c.earring }}</option>
                </select>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="datetime-local"
                    placeholder="Data"
                    v-model="vaccineApplication.date"
                />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Descrição"
                    v-model="vaccineApplication.note"
                />
              </p>
            </div>
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/eventos/aplicacoes-de-vacinas">
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
import { VaccineApplication } from "@/model/vaccine-application.model";
import vaccineApplicationClient from "@/client/vaccine-application.client";
import {Vaccine} from "@/model/vaccine.model";
import vaccineClient from "@/client/vaccine.client";
import {Cattle} from "@/model/cattle.model";
import {CattleClient} from "@/client/cattle.client";


export default class VaccineApplicationInsertForm extends Vue {

  private vaccineApplication: VaccineApplication = new VaccineApplication();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();
  private cattleList: Cattle[] = []
  private vaccineList: Vaccine[] = []
  private cattleClient!: CattleClient

  public mounted(): void {
    this.cattleClient = new CattleClient()
    this.listAllVaccines()
    this.listAllCattles()
  }

  private listAllVaccines(): void {
    vaccineClient.findAll().then(
        (success) => {
          this.vaccineList = success.data
        },
        (error) => {
          console.log(error);
        }
    );
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

  private onClickSave(): void {
    this.errors = new Array<Notification>();
    if (!this.vaccineApplication.vaccine || !this.vaccineApplication.vaccine) {
      this.errors.push(new Notification().newNot("Vacina é obrigatória"));
    }
    if (!this.vaccineApplication.cattle) {
      this.errors.push(new Notification().newNot("Gado é obrigatorio."));
    }
    if (!this.vaccineApplication.date) {
      this.errors.push(new Notification().newNot("Data é obrigatoria."));
    }
    if (this.errors.length == 0) {
      vaccineApplicationClient.save(this.vaccineApplication).then(
          (success) => {
            this.notification = this.notification.new(
                true,
                "notification is-success",
                "Aplicação de vacina cadastrada com sucesso!!!"
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
    this.vaccineApplication = new VaccineApplication();
  }
}
</script>

<style lang="scss" scoped>
.insert-background-vaccine-app {
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
