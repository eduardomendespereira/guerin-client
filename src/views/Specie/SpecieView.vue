<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">>Especies</p>
      <div class="ativos p-2">
        <div class="icon-ativos">
          <img style="width: 30px" src="@/assets/specieIcon.png" alt="Guerin" />
        </div>
        <h1
          class="text-ativos has-text-weight-bold is-size-5"
          style="color: black"
        >
          Especies Ativas
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
    <div class="is-flex is-justify-content-center pt-5">
      <div class="header-btn">
        <button class="button btn-insert" @click="openModal">
          Inserir Especie
        </button>
      </div>
    </div>
    <div class="columns is-flex is-justify-content-space-between mt-5">
      <div class="column">
        <DataTable :fetchUrl="'/species'" :columns="columns"></DataTable>
      </div>
    </div>
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Adicionar Especie</p>
          <button class="delete" @click="openModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <input
            class="input is-success"
            type="text"
            placeholder="Nome da Especie"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Adicionar</button>
          <button class="button" @click="openModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { SpecieClient } from "@/client/specie.client";
import { Notification } from "@/model/notification";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Specie } from "@/model/specie.model";
import { Options, Vue } from "vue-class-component";
import DataTable from "@/components/DataTable.vue";

@Options({
  components: {
    DataTable,
  },
})
export default class SpecieView extends Vue {
  columns = ["id", "inactive", "registered", "updated", "name"];
  showModal = false;
  public edit = `edit-specie`;
  private specieClient!: SpecieClient;
  public specieList: Specie[] = [];
  count: any = null;
  public url: string = "/species";
  private notification: Notification = new Notification();
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Specie> = new PageResponse();
  public mounted(): void {
    this.specieClient = new SpecieClient();
    this.listAllVaccines();
    this.countSpecie();
  }
  public listAllVaccines(): void {
    this.specieClient.findByFiltrosPaginado(this.pageRequest).then(
      (success: any) => {
        this.pageResponse = success;
        this.specieList = this.pageResponse.content;
        console.log(this.specieList);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  public countSpecie(): void {
    this.specieClient.count().then(
      (sucess) => {
        return (this.count = Number(sucess));
      },
      (error) => {
        return console.log(error);
      }
    );
  }
  public openModal() {
    if (this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }
  }
}
</script>

<style>
.ativos {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.icon-ativos {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  border-radius: 20px;
  background-color: #ab0303;
}

.text-ativos {
  margin-left: 60px;
}

.weight {
  width: 100%;
}

.header-btn {
  background-color: white;
  width: 95%;
  padding: 30px;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.table-div {
  padding: 30px;
}

.table {
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 100%;
}

.tag {
  border-radius: 50px;
  padding: 12px;
}

.btn-insert {
  font-size: 15px;
  background-color: #126b00;
  border-color: #126b00;
  color: #ffffff;
  padding: 12px;
}

.btn-insert:hover {
  background-color: #178a00;
  transform: translate(-1px, -1px);
  transition: 1s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-detail {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #0093ff;
  border-width: 3px;
  border-radius: 150px;
  color: #0093ff;
  font-weight: bold;
  padding: 12px;
}

.btn-detail:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #00c1ff;
  color: #00c1ff;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-edit {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #1ba500;
  border-width: 3px;
  border-radius: 150px;
  font-weight: bold;
  padding: 0px 5px;
}

.btn-edit:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #25e000;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-delet {
  font-size: 13px;
  background-color: #ffffff;
  border-color: #ab0303;
  border-width: 3px;
  border-radius: 150px;
  color: #ab0303;
  font-weight: bold;
  padding: 0px 8px;
}

.btn-delet:hover {
  background-color: #ffffff;
  transform: translate(-1px, -1px);
  transition: 1s;
  border-color: #dd0000;
  font-weight: bold;
  box-shadow: 2px 5px 10px #a7a7a7;
}
</style>
