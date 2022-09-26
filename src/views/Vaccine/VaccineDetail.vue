<template>
  <div class="container">
    <h1 class="titulo" >Detalhar Vacina</h1>

    <div class="dados-detalhar-vaccina">
      <i>Id: {{vaccine.id}}</i>
      <i>Nome: {{vaccine.name}}</i>
      <i class="status">
        Status: &nbsp;
        <i v-if="!vaccine.inactive" style="color: limegreen"> Ativa</i>
        <i v-if="vaccine.inactive" style="color: red;"> Inativa</i>
      </i>
    </div>

    <div class="botoes-form">
      <router-link class="link-voltar" to="/vaccine">
        <button class="button btn-voltar">Voltar</button>
      </router-link>
<!--      <button class="button btn-editar" @click="onClickUpdate(vaccine.id)">Editar</button>-->
<!--      <button class="button btn-desativar" @click="onClickDisable(vaccine)">Desativar</button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Vaccine } from "@/model/vaccine.model";
import { VaccineClient } from "@/client/vaccine.client";

export default class VaccineDetail{
  private vaccineClient!: VaccineClient
  private vaccine : Vaccine = new Vaccine()

  @Prop({type: Number, required: false})
  private readonly id!: number
  @Prop({type: String, default: false})
  private readonly model!: string

  private mounted(): void {
    this.vaccineClient = new VaccineClient()
    this.getVaccine()
  }

  private getVaccine(): void {
    this.vaccineClient.findById(this.id)
        .then(
            sucess => {
              this.vaccine = sucess
            },
            error => console.log(error)
        )
  }
}
</script>