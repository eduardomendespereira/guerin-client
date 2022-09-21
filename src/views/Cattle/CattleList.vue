<template>
    <div class="columns">
      <div class="column is-12 is-size-3">
        Lista de Gados
      </div>
    </div>
  
    <hr />
    <hr />
  
    <table class="table table is-fullwidth">
      <thead class="green">
      <tr style="background-color: mediumpurple">
        <th style="color: #fff;">Brinco</th>
        <th style="color: #fff;">Peso</th>
        <th style="color: #fff;">Genero</th>
        <th style="color: #fff;">Fazenda</th>
        <th style="color: #fff;">B. Pai</th>
        <th style="color: #fff;">B. Mãe</th>
        <th style="color: #fff;">Opções</th>
        <th style="color: #fff;">Ativo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cattleList" :key="item.id">
        <th>{{ item.earring }}</th>
        <th>{{ item.weight }}</th>
        <th>{{ item.gender }}</th>
        <th>{{ item.farm.name}}</th>
        <th>
          <span v-if="!item.father"> --- </span>
          <span v-if="item.father"> {{ item.father }} </span>
        </th>
        <th>
          <span v-if="!item.mother"> --- </span>
          <span v-if="item.mother"> {{ item.mother }} </span>
        </th>
        <th>-options-</th>
        <th>
          <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
          <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
        </th>
      </tr>
      </tbody>
    </table>
  </template>
  
  <script lang="ts">
    import { Vue } from 'vue-class-component';
    import { PageRequest } from "@/model/page/page-request";
    import { PageResponse } from "@/model/page/page-response";
    import { Cattle } from "@/model/cattle.model";
    import { CattleClient } from "@/client/cattle.client";
  
    export default class CattleList extends Vue {
      private pageRequest: PageRequest = new PageRequest()
      private pageResponse: PageResponse<Cattle> = new PageResponse()
      public cattleList: Cattle[] = []
      private cattleClient!: CattleClient
  
      public mounted(): void {
        this.cattleClient = new CattleClient()
        this.listAllCattles()
      }
  
      public listAllCattles(): void {
        this.cattleClient.findAll(this.pageRequest)
            .then(
                success => {
                  this.pageResponse = success
                  this.cattleList = this.pageResponse.content
                },
                error => console.log(error)
            )
      }
    }
  </script>
  
  <style scoped>
  
  </style>