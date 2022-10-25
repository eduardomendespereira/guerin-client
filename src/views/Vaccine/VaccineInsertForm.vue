<template>
  <div class="form-vaccine">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Cadastro > Vacina
      </div>
    </div>

    <div class="content-form">
      <div class="align-icon-container">
        <img style="width: 140px; background-color: darkgreen; border-radius: 15px"  src="../../assets/vacineIcon.png" />
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
          <input class="input" style="width: 300px" type="text" v-model="vaccine.name" placeholder="Nome da vacina">
        </div>

        <div class="field-required">
          <label class="label">
            <input v-model="vaccine.required" checked type="checkbox">
            Obrigatória
          </label>
        </div>
      </div>
      <div class="container-buttons">
        <div class="container-boptions">
          <router-link class="link-cad" to="/eventos/vacinas">
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
  import { Notification } from '@/model/notification'
  import { Vaccine } from "@/model/vaccine.model";
  import vaccineClient from "@/client/vaccine.client";

  export default class VaccineInsertForm extends Vue {
    private vaccine : Vaccine = new Vaccine()
    private notification : Notification = new Notification()

    public mounted(): void {
    }

    private onClickSave(): void {
      vaccineClient.save(this.vaccine)
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
  .form-vaccine{
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