<template>
  <div class="form-vaccine">
    <div class="columns">
      <div class="text-up columns">
            <p class="is-size-4 pt-5 pl-5">Editar <b>> Vacinas</b></p>
      </div>
    </div>

    <div class="content-form">
      <div class="align-icon-container">
        <img style="width: 100px; background-color: darkgreen; border-radius: 15px"  src="../../assets/vacineIcon.png" />
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
        <div class="control is-flex is-flex-direction-column ">
          <input class="input" style="width: 300px" type="text" v-model="vaccine.name" placeholder="Nome da vacina">
          <div class="is-flex is-justify-content-center mt-2">
            <label class="label">
            <input v-model="vaccine.required" checked type="checkbox">
            Obrigatória
          </label>
          </div>
        </div>
      </div>
      <hr class="line" size="100" width="1000" />
      <div class="container-buttons">
        <div class="container-boptions">
          <router-link class="link-cad" to="/eventos/vacinas">
            <button class="button btn-back is-fullwidth">Voltar ao Menu</button>
          </router-link>
        </div>
        <div class="container-boptions">
          <button class="button is-fullwidth btn-cad" @click="onClickEdit()">Editar Vacina</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Notification } from '@/model/notification'
import { Vaccine } from "@/model/vaccine.model";
import vaccineClient from "@/client/vaccine.client";
import {Prop} from "vue-property-decorator";

export default class VaccineInsertForm extends Vue {
  private vaccine : Vaccine = new Vaccine()
  private notification : Notification = new Notification()

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.getVaccine()
  }

  private getVaccine(): void {
    vaccineClient.findById(this.id)
        .then(
            success => {
              this.vaccine = success.data
            },
            error => console.log(error)
        )
  }

  private onClickEdit(): void {
    vaccineClient.update(this.vaccine)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Vacina atualizada com sucesso!!!')
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
    this.vaccine = new Vaccine()
  }
}


</script>

<style lang="scss" scoped>
.form-vaccine{
  width: 100%;
  padding: 12px 30px 0px 24px;
  background-color: #f1f5f9;
}
.content-form{
  background-color: white;
  width: 94%;
  border-radius: 10px;
  padding: 50px;
  margin: 40px;
  box-shadow: 0px 0px 10px #d1d1d1;
}
.align-icon-container{
  display: flex;
  justify-content: center;
}
.container-inputs{
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  justify-content: space-evenly;
}
.container-buttons{
  display: flex;
  margin-top: 20px;
  justify-content: space-evenly;
}
.container-boptions{
  width: 300px;
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

.line{
  margin-top: 50px;
}
</style>