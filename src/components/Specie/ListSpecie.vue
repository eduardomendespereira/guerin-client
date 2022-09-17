<template>

<div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Especies
    </div>
</div>
<div class="columns">
    <div class="column is-narrow is-size-3">
        <button class="button is-primary is-light">Adicionar Especie</button>
    </div>
    <div class="column is-4 is-size-3 ">
        <input class="input is-primary" type="text" placeholder="Procurar por nome da especie"/>
    </div>
</div>

  <hr />
  <hr />
  <table class="table table is-fullwidth">
    <thead class="green">
    <tr  class="tb-tr">
      <th style="color: #fff;">Detalhar</th>
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Nome da Especie</th>
      <th style="color: #fff;">Editar</th>
      <th style="color: #fff;">Excluir</th>
    </tr>
    </thead>
    <tbody>
    <!-- <tr v-for="item in specieList" :key="item.id">
      <th>{{ item.id }}</th>
      <th>
        <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
        <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
      </th>
      <th>{{ item.nome }}</th>
    </tr> -->
    <tr>
        <td><button class="button is-rounded is-link is-small ">Detalhes</button></td>
        <th>1</th>
        <th>McLovin</th>
        <th><button class="button is-rounded is-primary is-small ">Editar</button></th>
        <th><button class="button is-rounded is-danger  is-small">Excluir</button></th>
    </tr>
    </tbody>
  </table>
 
</template>
<script lang="ts">
    import { Vue } from 'vue-class-component';
    import { PageRequest } from "@/model/page/page-request";
    import { PageResponse } from "@/model/page/page-response";
    import { Specie } from "@/model/specie.model";
    import { SpecieClient } from "@/client/specie.client";
  
    export default class ListSpecie extends Vue {
      private pageRequest: PageRequest = new PageRequest()
      private pageResponse: PageResponse<Specie> = new PageResponse()
      public specieList: Specie[] = []
      private specieClient!: SpecieClient
  
      public mounted(): void {
        this.specieClient = new SpecieClient()
        this.listAllVaccines()
      }
  
      public listAllVaccines(): void {
        this.specieClient.findByFiltrosPaginado(this.pageRequest)
            .then(
                (success:any) => {
                  this.pageResponse = success
                  this.specieList = this.pageResponse.content
                },
                (error:any) => console.log(error)
            )
      }
    }
  </script>
 

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
    .tb-tr{
        background-color: #25a5be
    }
</style>