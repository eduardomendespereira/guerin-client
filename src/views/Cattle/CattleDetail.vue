<template>
    <div class="columns">
      <div class="column is-12 is-size-3">
        Gado: {{ cattle.earring }}
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
        <th style="color: #fff;">Especie</th>
        <th style="color: #fff;">B. Pai</th>
        <th style="color: #fff;">B. Mãe</th>
        <th style="color: #fff;">Opções</th>
        <th style="color: #fff;">Ativo</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>{{ cattle.earring }}</th>
        <th>{{ cattle.weight }}</th>
        <th>{{ cattle.gender }}</th>
        <th>{{ cattle.farm?.name }}</th>
        <th>{{ cattle.specie?.name }}</th>
        <th>
          <span v-if="!cattle.father"> --- </span>
          <span v-if="cattle.father"> {{ cattle.father }} </span>
        </th>
        <th>
          <span v-if="!cattle.mother"> --- </span>
          <span v-if="cattle.mother"> {{ cattle.mother }} </span>
        </th>
        <th>-options-</th>
        <th>
          <span v-if="!cattle.inactive" class="tag is-success"> Ativo </span>
          <span v-if="cattle.inactive" class="tag is-danger"> Inativo </span>
        </th>
      </tr>
      </tbody>
    </table>
  </template>
  
  <script lang="ts">
    import { Vue } from 'vue-class-component';
    import { Cattle } from "@/model/cattle.model";
    import { CattleClient } from "@/client/cattle.client";
    import { Prop } from 'vue-property-decorator'
  
    export default class CattleDetail extends Vue {
      public cattle: Cattle = new Cattle()
      private cattleClient!: CattleClient

      @Prop({ type: Number, required: false })
      private readonly earring!: number

  
      public mounted(): void {
        this.cattleClient = new CattleClient()
        this.detailCattle()
      }

      public detailCattle(): void {
        this.cattleClient.findByEarring(this.earring)
        .then(
                success => {
                  this.cattle = success
                },
                error => console.log(error)
            )
      }
    }
  </script>
  
  <style scoped>
  
  </style>