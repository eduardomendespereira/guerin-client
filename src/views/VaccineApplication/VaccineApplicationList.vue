<template>
  <aside class="is-fullheight is-fullwidth">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Aplicação de Vacinas</b></p>
      <div class="activates p-2">
        <div class="icon-activate">
          <img
            style="width: 30px"
            src="../../assets/vaccineAppIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Vacinas Aplicadas Ativas
        </h1>

        <div>
          <h1
            class="is-size-5 is-flex is-justify-content-flex-end pr-2"
            style="color: #004aad"
            span
          >
            {{ count }}
          </h1>
        </div>
      </div>
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
  count: any = null;

  public mounted(): void {
    this.vaccineApplicationClient = new VaccineApplicationClient();
    this.listAllVaccinesApplications();
    this.countVaccineApp();
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

  public countVaccineApp(): void {
    this.vaccineApplicationClient.count().then(
      (sucess) => {
        return (this.count = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }
}
</script>

<style lang="scss">
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 350px;
}

.icon-activate {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  border-radius: 20px;
  background-color: #126b00;
}

.text-activates {
  margin-left: 60px;
}
</style>
