<template>
    <div class="form-cattle">
      <div class="columns">
        <div class="column is-12 is-size-3">
          Cadastrar Gados
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
  
      <div class="field">
        <label class="label">Brinco</label>
        <div class="control">
          <input class="input is-primary" type="number" v-model="cattle.earring" placeholder="Brinco">
        </div>
      </div>

      <div class="field">
        <label class="label">Peso</label>
        <div class="control">
          <input class="input is-primary" type="number" v-model="cattle.weight" placeholder="Peso">
        </div>
      </div>

      <div class="field">
        <label class="label">Gender</label>
        <div class="control">
            <select v-model="cattle.gender">
                  <option>Macho</option>
                  <option>Fêmea</option>
            </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Especie</label>
        <div class="control">
            <select v-model="cattle.specie" v-for="item in specieList" :key="item.id">
                  <option>Macho</option>
                  <option>Fêmea</option>
            </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Brinco do pai</label>
        <div class="control">
          <input class="input is-primary" type="number" v-model="cattle.father" placeholder="Brinco do pai">
        </div>
      </div>

      <div class="field">
        <label class="label">Brinco da mãe</label>
        <div class="control">
          <input class="input is-primary" type="number" v-model="cattle.mother" placeholder="Brinco da mãe">
        </div>
      </div>
  
      <div class="columns">
        <div class="column is-8"></div>
        <div class="column is-2">
          <router-link class="link-cad" to="/cattle">
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
    import { Cattle } from '@/model/cattle.model'
    import { CattleClient } from '@/client/cattle.client'
  
    export default class cattleInsertForm extends Vue {
      private cattleClient !: CattleClient
      private cattle: Cattle = new Cattle()
      private notification : Notification = new Notification()
      // private specieList
  
      public mounted(): void {
        this.cattleClient = new CattleClient()
      }
  
      private onClickSave(): void {
        this.cattleClient.save(this.cattle)
            .then(
                success => {
                  this.notification = this.notification.new(true, 'notification is-success', 'Gado cadastrado com sucesso!')
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
        this.cattle = new Cattle()
      }
    }
  
  
  </script>
  
  <style lang="scss">
    .btn-voltar{
      width: 100%;
    }
  
    .form-cattle{
      width: 100%;
      padding: 30px;
    }
  
  </style>