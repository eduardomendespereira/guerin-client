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
        <ModalInsertSpecie @Atualiza="atualizar" :mini="false"/>
      </div>  
    </div>
    <div  class="columns is-flex">
      <div class="is-size-12 pt-5 pl-5" style="width: 100%">
        <vue-good-table
          :key="reniciar"
          ref="specitable"
          :columns="columns"
          :rows="rows"
          :search-options="{
            enabled: true,
            placeholder: 'Buscar...',
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            rowsPerPageLabel: 'Resultados por pagina',
            nextLabel: 'Proximo',
            prevLabel: 'Anterior',
            ofLabel: 'de',
            allLabel: 'Todos',
          }"
          theme="polar-bear"
        >
          <template #table-row="props">
            <span v-if="props.column.field == 'detail'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageSpecieDetail(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else-if="props.column.field == 'name'">
              <span>{{props.row.name}}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success"
                >Ativo</span
              >
              <span v-else-if="props.row.inactive" class="tag is-danger"
                >Inativo</span
              >
              <span v-else>{{ props.row.role }}</span>
            </span>
            <span v-else-if="props.column.field == 'actions'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageSpecieEdit(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  v-if="!props.row.inactive"
                  class="button is-danger is-outlined"
                  @click="openDelete(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
              </p>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div v-if="deleteModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deseja deletar essa especie ?</p>
          <button class="delete" @click="openDelete" aria-label="close"></button>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="disableSpecie" >
            Deletar Especie
          </button>
          <button class="button btn-cad" @click="openDelete">Voltar</button>
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
import ModalInsertSpecie from "@/components/ModalInsertSpecie.vue";

@Options({
  components: {
    DataTable,
    ModalInsertSpecie
  },
})
export default class SpecieView extends Vue {
  showModal = false;
  reniciar = 0;
  public specieClient!: SpecieClient;
  public specieList: Specie[] = [];
  public specie: Specie = new Specie()
  deleteModal = false;
  count = 0;
  columns = [
    {
      label: "Detalhar",
      field: "detail"
    },
    {
      label: "Nome",
      field: "name",
    },
    {
      label: "Estado",
      field : "inactive"
    },
    {
      label: "Ações",
      field: "actions",
      html: true,
    },
  ];
  rows = [];
  public notification: Notification = new Notification();
  public pageRequest: PageRequest = new PageRequest();
  public pageResponse: PageResponse<Specie> = new PageResponse();
  public mounted(): void {
    this.specieClient = new SpecieClient();
    this.listAll();
  }
  public listAll(): void {
    this.specieClient.findAll()
      .then((response: any) => {
        this.rows = response.data;
        this.count = response.data.filter((t) => !t.inactive).length;
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  public openModal() {
    if (this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }
  }
  setup() {
      const value = false 
      return {value}
  }
  public onClickPageSpecieDetail(id : any){
    this.$router.push({ name: "specie-detail", params: { id: id } });
  }
  public onClickPageSpecieEdit(id : any){
    this.$router.push({ name: "specie-edit", params: { id: id } });
  }
  public openDelete(id : any){
    this.specie.id = id
    if(this.deleteModal){
      this.deleteModal = false;
    }else{
      this.deleteModal = true;
    }
    this.specieClient.findById(id)
        .then(
            sucess => {
              this.specie = sucess
            },
            error => console.log(error)
    )
  }
  public atualizar(e){
      this.reniciar += 1 
      this.listAll()
  }
  public disableSpecie(){
    this.specieClient.desativar(this.specie).then(
      (sucess:any) => {
        console.log(sucess);
        this.deleteModal = false
      },
      (error:any) =>{
        console.log(error);
        this.deleteModal = false
      } 
    )
  }
  public insertSpecie(){
    this.specieClient.cadastrar(this.specie).then(
      (sucess:any) => {
        this.notification = this.notification.new(true, 'notification is-success', 'Especie Cadastrada com sucesso ! !!!')
        console.log(sucess);
      },
      (error:any) =>{
        this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
        console.log(error);
      } 
    )
  }
  public onClickCloseNotification(): void {
        this.notification = new Notification()
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