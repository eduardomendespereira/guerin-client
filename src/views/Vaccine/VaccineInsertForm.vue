<template>
  <div class="form-vaccine">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Cadastrar Vacinas
      </div>
    </div>

    <hr />

    <div class="columns" v-if="notification.ativo">
      <div class="column is-12">
        <div :class="notification.classe">
          <button @click="onClickCloseNotification()" class="delete" ></button>
          {{ notification.mensagem }}
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-12 is-size-3">
        <label class="label">
          <input v-model="vaccine.required" checked type="checkbox">
          Vacina Obrigatória
        </label>
      </div>
    </div>

    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input is-primary" type="text" v-model="vaccine.name" placeholder="Nome da vacina">
      </div>
    </div>

    <div class="columns">
      <div class="column is-8"></div>
      <div class="column is-2">
        <router-link class="link-cad" to="/vaccine">
          <button class="button is-danger btn-voltar">Voltar</button>
        </router-link>
      </div>
      <div class="column is-2">
        <button class="button is-fullwidth is-success" @click="onClickSave()">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue } from 'vue-class-component';
  import { Notification } from '@/model/notification'
  import { Vaccine } from "@/model/vaccine.model";
  import { VaccineClient } from "@/client/vaccine.client";

  export default class VaccineInsertForm extends Vue {
    private vaccineClient!: VaccineClient
    private vaccine : Vaccine = new Vaccine()
    private notification : Notification = new Notification()

    public mounted(): void {
      this.vaccineClient = new VaccineClient()
    }

    private onClickSave(): void {
      this.vaccineClient.save(this.vaccine)
          .then(
              success => {
                this.notification = this.notification.new(true, 'notification is-success', 'Vacina cadastrada com sucesso!!!')
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

<style lang="scss">
  .btn-voltar{
    width: 100%;
  }

  .form-vaccine{
    width: 100%;
    padding: 30px;
  }

</style>