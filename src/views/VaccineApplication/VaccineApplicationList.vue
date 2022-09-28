<template>
  <aside class="is-fullheight is-fullwidth">
    <div class="columns">
      <div class="column is-12 is-size-3">Lista de Aplicações de Vacinas</div>
    </div>

    <hr />
    <hr />

    <table class="table table is-fullwidth">
      <thead class="green">
      <tr style="background-color: mediumpurple">
        <th style="color: #fff">ID</th>
        <th style="color: #fff">Ativo</th>
        <th style="color: #fff">Descrição</th>
        <th style="color: #fff">Vacina Aplicada</th>
        <th style="color: #fff">Gado</th>
        <th style="color: #fff">Opções</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in vaccineApplicationList" :key="item.id">
        <th>{{ item.id }}</th>

        <th>
          <span v-if="!item.inactive" class="tag is-success"> Ativo </span>
          <span v-if="item.inactive" class="tag is-danger"> Inativo </span>
        </th>

        <th>{{ item.note }}</th>
        <th>{{ item.vaccine?.name }}</th>
        <th>{{ item.cattle?.earring }}</th>
      </tr>
      </tbody>
    </table>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { VaccineApplication } from "@/model/vaccine-application.model";
import { VaccineApplicationClient } from "@/client/vaccine-application.client";

export default class VaccineApplicationList extends Vue {
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<VaccineApplication> = new PageResponse();
  public vaccineApplicationList: VaccineApplication[] = [];
  private vaccineApplicationClient!: VaccineApplicationClient;

  public mounted(): void {
    this.vaccineApplicationClient = new VaccineApplicationClient();
    this.listAllVaccinesApplications();
  }

  public listAllVaccinesApplications(): void {
    this.vaccineApplicationClient.findByAll(this.pageRequest).then(
        (success) => {
          this.pageResponse = success;
          this.vaccineApplicationList = this.pageResponse.content;
        },
        (error) => console.log(error)
    );
  }
}
</script>

<style scoped>

</style>