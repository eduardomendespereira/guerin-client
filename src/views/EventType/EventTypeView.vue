<template>
    <aside class="weight is-fullheight">
      <div class="columns is-flex is-justify-content-space-between">
        <p class="is-size-4 pt-5 pl-5">>Tipos de Eventos</p>
        <div class="ativos p-2">
          <div class="icon-ativos">
            <img style="width: 30px" src="@/assets/eventIcon.png" alt="Guerin" />
          </div>
          <h1
            class="text-ativos has-text-weight-bold is-size-5"
            style="color: black"
          >
            Eventos Ativos
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
            Inserir Evento
          </button>
        </div>
      </div>
      <div class="columns is-flex">
        <div class="is-size-12 pt-5 pl-5" style="width: 100%">
          <vue-good-table
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
                    @click="onClickPageEventDetail(props.row.id)"
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
                    @click="onClickPageEventEdit(props.row.id)"
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
      <div v-if="showModal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="columns" v-if="notification.ativo">
                <div class="column is-12">
                  <div :class="notification.classe">
                    <button @click="onClickCloseNotification()" class="delete" ></button>
                    {{ notification.mensagem }}
                  </div>
                </div>
            </div>        
          <header class="modal-card-head">
            <p class="modal-card-title">Adicionar Tipo de Evento</p>
            <button class="delete" @click="openModal" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <input v-model="nome" class="input in-1" type="text" placeholder="Nome do Tipo de Evento" />
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-center">
            <button class="button btn-back" @click="insert(nome)" >
              Cadastrar Tipo de Evento
            </button>
            <button class="button btn-cad" @click="openModal">Voltar</button>
          </footer>
        </div>
      </div>
      <div v-if="deleteModal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Deseja deletar esse evento ?</p>
            <button class="delete" @click="openDelete" aria-label="close"></button>
          </header>
          <footer class="modal-card-foot is-flex is-justify-content-center">
            <button class="button btn-back" @click="disableEvent" >
              Deletar Especie
            </button>
            <button class="button btn-cad" @click="openDelete">Voltar</button>
          </footer>
        </div>
      </div>    
    </aside>
  </template>
  
  <script lang="ts">
  import { Notification } from "@/model/notification";
  import { PageRequest } from "@/model/page/page-request";
  import { PageResponse } from "@/model/page/page-response";
  import { Options, Vue } from "vue-class-component";
  import DataTable from "@/components/DataTable.vue";
    import { EventTypeClient } from "@/client/event-type.client";
    import { EventType } from "@/model/event-type.model";
  
  @Options({
    components: {
      DataTable,
    },
  })
  export default class EventTypeView extends Vue {
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
    showModal = false;
    public edit = `edit-specie`;
    public nome : string = '';
    private eventClient!: EventTypeClient;
    public eventList: EventType[] = [];
    public event: EventType = new EventType()
    deleteModal = false;
    public url: string = "/species";
    private notification: Notification = new Notification();
    private pageRequest: PageRequest = new PageRequest();
    private pageResponse: PageResponse<EventType> = new PageResponse();
    public mounted(): void {
      this.eventClient = new EventTypeClient();
      this.listAll();
      //this.countSpecie();
    }
    public listAll(): void {
      this.eventClient.findAll()
        .then((response: any) => {
          this.rows = response.data.content;
          this.count = response.data.content.filter((t) => !t.inactive).length;
          console.log(response);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    public countSpecie(): void {
      this.eventClient.count().then(
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
    public onClickPageEventDetail(id : any){
      this.$router.push({ name: "eventType-detail", params: { id: id } });
    }
    public onClickPageEventEdit(id : any){
      this.$router.push({ name: "eventType-edit", params: { id: id } });
    }
    public openDelete(id : any){
      if(this.deleteModal){
        this.deleteModal = false;
      }else{
        this.deleteModal = true;
      }
      this.eventClient.findById(id)
          .then(
              sucess => {
                this.event = sucess
              },
              error => console.log(error)
      )
    }
    public insert(item : any){
        
        this.eventClient.cadastrar(item).then(
          (sucess:any) => {
            this.notification = this.notification.new(true, 'notification is-success', 'Tipo de Evento Cadastrado com sucesso !!!')
            console.log(sucess);
          },
          (error:any) =>{
            this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
            console.log(error);
          } 
        )
    }
    public disableEvent(){
      this.eventClient.desativar(this.event).then(
        (sucess:any) => {
          console.log(sucess);
          this.deleteModal = false
        },
        (error:any) =>{
          console.log(error);
        } 
      )
    }
    private onClickCloseNotification(): void {
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
  