<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Espécies</b></p>
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
    <div class="is-flex is-justify-content-center">
      <div class="header-btn">
        <ModalInsertSpecie @Atualiza="atualizar" :mini="false"/>
      </div>  
    </div>
    <div  class="columns is-flex">
      <div class="is-size-12 pt-5 pl-5" style="
          width: 100%;
          text-align: center;
          padding: 0px !important;
          margin: 20px 30px;
        ">
        <vue-good-table
          :key="reniciar"
          ref="specitable"
          :columns="columns"
          :rows="rows"
          styleClass="vgt-table striped"
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
                <button
                v-else-if="props.row.inactive"
                class="button is-success is-outlined"
                @click="activeEnable(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
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
        <header class="modal-header">
          <div class="modal-title">
            <div class="icon-modal">
                <img style="width: 50px" src="@/assets/specieIcon.png" alt="Guerin" />
            </div>
            <p class="modal-card-title">Desativar essa Espécie?</p>
          </div>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="openDelete">Voltar</button>
          <button class="button btn-cad" @click="disableSpecie" >
            Deletar Espécie
          </button>
        </footer>
      </div>
    </div>  
    <div v-if="activeModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-header">
          <div class="modal-title">
            <div class="icon-modal">
                <img style="width: 50px" src="@/assets/specieIcon.png" alt="Guerin" />
            </div>
            <p class="modal-card-title">Ativar essa Espécie?</p>
          </div>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="(activeModal = false)">Voltar</button>
          <button class="button btn-cad" @click="enable" >
            Ativar Espécie
          </button>
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
  activeModal = false;
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
  public activeEnable(id){
    if(this.activeModal){
      this.activeModal = false;
    }else{
      this.activeModal = true;
    }
    console.log(id)
    this.specieClient.findById(id)
        .then(
            sucess => {
              this.specie = sucess
            },
            error => console.log(error)
    )
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
        this.notification = this.notification.new(true, 'notification is-success', 'Especie Ativada com sucesso !!!')
        console.log(sucess)
        this.listAll()
        console.log(sucess);
         this.reniciar += 1 
        this.deleteModal = false
      },
      (error:any) =>{
        console.log(error);
        this.deleteModal = false
      } 
    )
  }
  public enable(){
      
      this.specieClient.ativar(this.specie).then(
        (sucess : any) =>{
          console.log(sucess)
         
        
          this.listAll() 
          this.activeModal = false
          this.reniciar += 1 
        },
        (error : any) =>{
          this.notification = this.notification.new(true, 'notification is-success', 'Erro ao ativar especie')
          console.log(error)
        }
      )
    }
  public insertSpecie(){
    this.specieClient.cadastrar(this.specie).then(
      (sucess:any) => {
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

<style scoped>
.ativos {
  background-color: white;
  margin-top: 45px;
  margin-right: 30px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  border-radius: 10px;
  width: 260px;
}
.btn-back {
  background-color: #c20101;
  color: #ffffff;
  padding: 12px;
  width: 200px;
}

.btn-back:hover {
  background-color: #da0000;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}
.btn-cad {
  background-color: #005bd4;
  color: #ffffff;
  padding: 12px;
  width: 200px;
  margin-left: 20px;
}

.btn-cad:hover {
  background-color: #0067ee;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.modal-header {
  display:  flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 30px;
}
.modal-title{
  display:  flex;
  justify-content: center;
  flex-direction: column;
}  
.modal-card-title{
  margin-top: 4%;
  font-size: 24px;
  
}
.icon-modal{
  margin-left: 28%;
  width: 100px;
  height: 80px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  background-color: #c20101;
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
  margin-left: 65px;
}

.weight {
  width: 100%;
}

.header-btn {
  background-color: #ffffff;
  width: 100%;
  margin: 10px 20px;
  padding: 30px;
  box-shadow: 0px 0px 10px #d1d1d1;
  border-radius: 10px;
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