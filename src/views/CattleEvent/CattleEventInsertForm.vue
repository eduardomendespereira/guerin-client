<template>
  <main class="cattleevent is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4">Cadastro <b>> Evento do Gado</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-cattle-event">
        <div>
          <img style="width: 100px; padding: 10px; background-color: #007a9b; border-radius: 15px"  src="../../assets/eventIcon.png" />
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
        <div class="line-1">
          <div class="field-body">
            <div class="select-1">
              <div class="field">
              <select v-model="cattleEvent.eventType">
                <option v-for="e in eventTypeList" :key="e.id" :value="e">{{ e.name }}</option>
              </select>
              <p class="text-select">Tipo de Evento</p>
            </div>
            </div>
            <div class="select-2">
              <div class="field">
              <select v-model="cattleEvent.cattle">
                <option type="number" v-for="c in cattleList" :key="c.id" :value="c">{{ c.earring }}</option>
              </select>
              <p class="text-select">Gado</p>
            </div>
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
                    v-model="cattleEvent.date"
                />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Descrição"
                    v-model="cattleEvent.description"
                />
              </p>
            </div>
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/eventos/eventos-gados">
            <button class="button btn-back">Voltar</button>
          </router-link>
          <button @click="onClickSave()" class="button btn-cad">Cadastrar Evendo do Gado</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Notification } from "@/model/notification";
import { CattleEvent } from "@/model/cattle-event.model";
import cattleEventClient from "@/client/cattle-event.client";
import {Cattle} from "@/model/cattle.model";
import {CattleClient} from "@/client/cattle.client";
import {EventType} from "@/model/event-type.model";
import {EventTypeClient} from "@/client/event-type.client";

export default class CattleEventInsertForm extends Vue {
  private cattleEvent: CattleEvent = new CattleEvent();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();
  private cattleClient!: CattleClient
  private cattleList: Cattle[] = []
  private eventTypeClient!: EventTypeClient
  private eventTypeList: EventType[] = []

  public mounted(): void {
    this.cattleClient = new CattleClient()
    this.eventTypeClient = new EventTypeClient()
    this.listAllEventsTypes()
    this.listAllCattles()
  }

  private listAllEventsTypes(): void{
    this.eventTypeClient.findAll()
        .then(
            success => {
              this.eventTypeList = success.data
            },
            error => console.log(error)
        )
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
    if (!this.cattleEvent.eventType) {
      this.errors.push(new Notification().newNot("Tipo de evento é obrigatório"));
    }
    if (!this.cattleEvent.cattle) {
      this.errors.push(new Notification().newNot("Gado é obrigatorio."));
    }
    if (!this.cattleEvent.date) {
      this.errors.push(new Notification().newNot("Data é obrigatoria."));
    }
    if (!this.cattleEvent.description) {
      this.errors.push(new Notification().newNot("Descrição é obrigatória."));
    }
    if (this.errors.length == 0) {
      cattleEventClient.save(this.cattleEvent).then(
          (success) => {
            this.notification = this.notification.new(
                true,
                "notification is-success",
                "Evento cadastrado com sucesso!!!"
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
    this.cattleEvent = new CattleEvent();
  }
}
</script>

<style lang="scss" scoped>
.insert-background-cattle-event {
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
  margin: 6px;
  height: 36px;
  width: 235px;
  border-radius: 5px;
  border-color: rgb(218, 218, 218);
}

.text-select{
  font-size: 13px;
  margin-left: 15px;
  color: rgb(151, 151, 151);
}

.btn-back {
  background-color: #ab0303;
  color: #ffffff;
  padding: 12px;
}

.btn-back:hover {
  background-color: #d10000;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.line-1{
  margin: 40px 0px;
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
</style>
