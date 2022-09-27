<template>
    <div class="columns">
      <div class="column is-12 is-size-3">
        Lista de Fazendas
      </div>
    </div>
  
    <hr />
    <hr />
  
    <table class="table table is-fullwidth">
      <thead class="green">
      <tr style="background-color: mediumpurple">
        <th style="color: #fff;">Id</th>
        <th style="color: #fff;">Nome</th>
        <th style="color: #fff;">Endereço</th>
        <th style="color: #fff;">Ativo</th>
        <th style="color: #fff;">Opções</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in farmList" :key="item.id">
        <th>{{ item.id }}</th>
        <th>{{ item.name}}</th>
        <th>{{ item.address }}</th>
        <th>
          <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
          <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
        </th>
        <th> <button @click="onClickPageFarmDetail(item.id)" class="button is-small is-warning"> Detalhar </button> </th>
      </tr>
      </tbody>
    </table>
  </template>
  
  <script lang="ts">
    import { Vue } from 'vue-class-component';
    import { PageRequest } from "@/model/page/page-request";
    import { PageResponse } from "@/model/page/page-response";
    import { Farm } from "@/model/farm.model";
    import { FarmClient } from "@/client/farm.client";
  
    export default class FarmList extends Vue {
      private pageRequest: PageRequest = new PageRequest()
      private pageResponse: PageResponse<Farm> = new PageResponse()
      public farmList: Farm[] = []
      private farmClient!: FarmClient
  
      public mounted(): void {
        this.farmClient = new FarmClient()
        this.listAllFarms()
      }
  
      public listAllFarms(): void {
        this.farmClient.findAll(this.pageRequest)
            .then(
                success => {
                  this.pageResponse = success
                  this.farmList = this.pageResponse.content
                },
                error => console.log(error)
            )
      }

      public onClickPageFarmDetail(id: number) {
        this.$router.push({ name: 'farm-detail', params: { id: id } })
      }
    }
  </script>
  
  <style scoped>
  
  </style>