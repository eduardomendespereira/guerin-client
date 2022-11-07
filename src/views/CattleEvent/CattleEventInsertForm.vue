<template>
  <main class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Cadastro <b>> Evento do Gado</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-cattle-event">
        <div>
          <img style="width: 140px; background-color: cornflowerblue; border-radius: 15px"  src="../../assets/eventIcon.png" />
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
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Tipo de evento"
                    v-model="cattleEvent.eventType"
                />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Gado"
                    v-model="cattleEvent.cattle"
                />
              </p>
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
          <router-link to="/eventos/aplicacoes-de-vacinas">
            <button class="button is-danger">Voltar</button>
          </router-link>
          <button @click="onClickSave()" class="button is-link">Salvar</button>
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

export default class CattleEventInsertForm extends Vue {
  private cattleEvent: CattleEvent = new CattleEvent();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();

  public mounted(): void {

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
</style>
