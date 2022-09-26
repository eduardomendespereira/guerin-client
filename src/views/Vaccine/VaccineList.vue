<template>
  <aside class="is-fullheight is-fullwidth">
    <div class="columns">
      <div class="column is-12 is-size-3">Lista de Vacinas</div>
    </div>

    <hr />
    <hr />

    <table class="table table is-fullwidth">
      <thead class="green">
        <tr style="background-color: mediumpurple">
          <th style="color: #fff">ID</th>
          <th style="color: #fff">Ativo</th>
          <th style="color: #fff">Nome</th>
          <th style="color: #fff">Obrigatória</th>
          <th style="color: #fff">Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vaccineList" :key="item.id">
          <th>{{ item.id }}</th>

          <th>
            <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
            <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
          </th>

          <th>{{ item.name }}</th>
          <th>{{ item.required }}</th>
          <th>
            <button @click="onClickDetailPage(item.id)" style="background-color: dodgerblue; color: white" class="button btn-detail">Detalhar</button>
          </th>
        </tr>
      </tbody>
    </table>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Vaccine } from "@/model/vaccine.model";
import { VaccineClient } from "@/client/vaccine.client";

export default class VaccineList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Vaccine> = new PageResponse();
  public vaccineList: Vaccine[] = [];
  private vaccineClient!: VaccineClient;

  public mounted(): void {
    this.vaccineClient = new VaccineClient();
    this.listAllVaccines();
  }

  public listAllVaccines(): void {
    this.vaccineClient.findByAll(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.vaccineList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  private onClickDetailPage(idVaccine: number){
    this.$router.push({ name: 'vaccineDetail', params: { id: idVaccine, model: 'detail' } })
  }
}
</script>

<style scoped>
</style>