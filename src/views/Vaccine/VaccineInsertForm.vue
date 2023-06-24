<template>
  <main class="vaccine is-fullheight" style="padding: 0px;">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5" >Cadastro <b>> Vacina</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-vaccine">
        <div>
          <img style="width: 100px; background-color: darkgreen; border-radius: 15px"  src="../../assets/vacineIcon.png" />
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
                    placeholder="Nome da Vacina"
                    v-model="vaccine.name"
                />
              </p>
              <div class="field required is-flex is-justify-content-center mt-2" style="display: flex; align-items: center; padding: 5px;" >
              <label class="label" style="color: black">
                <input v-model="vaccine.required" type="checkbox">
                Obrigatória
              </label>
            </div>
            </div>
            
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/eventos/vacinas">
            <button class="button btn-back">Voltar</button>
          </router-link>
          <button @click="onClickSave()" class="button btn-cad">Cadastrar Vacina</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Notification } from "@/model/notification";
import { Vaccine } from "@/model/vaccine.model";
import vaccineClient from "@/client/vaccine.client";

export default class VaccineInsertForm extends Vue {
  private vaccine: Vaccine = new Vaccine();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();

  public mounted(): void {

  }

  private onClickSave(): void {
    this.errors = new Array<Notification>();
    if (!this.vaccine) {
      this.errors.push(new Notification().newNot("Vacina é obrigatória"));
    }
    if (this.errors.length == 0) {
      vaccineClient.save(this.vaccine).then(
          (success) => {
            this.notification = this.notification.new(
                true,
                "notification is-success",
                "Vacina cadastrada com sucesso!!!"
            );
            this.onClickClean();
          },
          (error) => {
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
    this.vaccine = new Vaccine();
  }
}
</script>

<style lang="scss" scoped>
.insert-background-vaccine {
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
input[type=checkbox] {
  transform: scale(1.5);
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
