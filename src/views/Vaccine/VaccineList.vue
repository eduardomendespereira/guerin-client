<template>
  <aside class="is-fullheight" style="width: 100%">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Vacinas</b></p>
      <div class="activates p-2">
        <div class="icon-activate">
          <img
            style="width: 30px"
            src="../../assets/vacineIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Vacinas Ativas
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
            <button
              @click="onClickDetailPage(item.id)"
              style="background-color: dodgerblue; color: white"
              class="button btn-detail"
            >
              Detalhar
            </button>
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
  count: any = null;

  public mounted(): void {
    this.vaccineClient = new VaccineClient();
    this.listAllVaccines();
    this.countVaccine();
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

  public countVaccine(): void {
    this.vaccineClient.count().then(
      (sucess) => {
        return (this.count = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }

  private onClickDetailPage(id: number) {
    this.$router.push({ name: "vaccine-detail", params: { id: id } });
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
