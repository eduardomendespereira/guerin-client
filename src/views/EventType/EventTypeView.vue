<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Tipos de Eventos</b></p>
      <div class="ativos p-2">
        <div class="icon-ativos">
          <img style="width: 30px" src="@/assets/eventIcon.png" alt="Guerin" />
        </div>
        <h1 class="text-ativos has-text-weight-bold is-size-5" style="color: black">
          Eventos Ativos
        </h1>

        <div>
          <h1 class="is-size-5 is-flex is-justify-content-flex-end pr-2" style="color: #004aad" span>
            {{ count }}
          </h1>
        </div>
      </div>
    </div>
    <div class="is-flex is-justify-content-center pt-2 pb-2">
      <div class="header-btn">
        <button class="button is-success" @click="openModal">
          Inserir Evento
        </button>
      </div>
    </div>
    <div class="columns is-flex">
      <div class="is-size-12 pt-5 pl-5" style="
          width: 100%;
          text-align: center;
          padding: 0px !important;
          margin: 20px 30px;
        ">
        <vue-good-table ref="specitable" :columns="columns" :rows="rows" :key="reni" styleClass="vgt-table striped"
          :search-options="{
            enabled: true,
            placeholder: 'Buscar...',
          }" :pagination-options="{
  enabled: true,
  mode: 'records',
  rowsPerPageLabel: 'Resultados por pagina',
  nextLabel: 'Proximo',
  prevLabel: 'Anterior',
  ofLabel: 'de',
  allLabel: 'Todos',
}" theme="polar-bear">
          <template #table-row="props">
            <span v-if="props.column.field == 'detail'">
              <p class="buttons">
                <button class="button is-info is-outlined" @click="onClickPageEventDetail(props.row.id)">
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else-if="props.column.field == 'name'">
              <span>{{ props.row.name }}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success">Ativo</span>
              <span v-else-if="props.row.inactive" class="tag is-danger">Inativo</span>
              <span v-else>{{ props.row.role }}</span>
            </span>
            <span v-else-if="props.column.field == 'actions'">
              <p class="buttons">
                <button class="button is-info is-outlined" @click="onClickPageEventEdit(props.row.id)">
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button v-if="!props.row.inactive" class="button is-danger is-outlined" @click="openDelete(props.row.id)">
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button v-else-if="props.row.inactive" class="button is-success is-outlined"
                  @click="openActive(props.row.id)">
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
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-header is-flex is-flex-direction-column is-align-items-center">
            <div class="icon-weight-ins">
              <img style="width: 60px" src="../../assets/eventIcon.png" alt="Guerin" />
            </div>
            <h1 class="text-insert pb-5 mb-5">Cadastrar Tipo de Evento</h1>
          </div>
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
              <div :class="notification.classe">
                <button @click="onClickCloseNotification()" class="delete"></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
          <input v-model="nome" class="input in-1 mb-5 pb-5" type="text" placeholder="Nome do Tipo de Evento" />
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button style="width: 250px;" class="button btn-back" @click="openModal">Voltar</button>
          <button style="width: 250px;" class="button btn-cad" @click="insert(nome)">
            Cadastrar Tipo de Evento
          </button>
        </footer>
      </div>
    </div>
    <div v-if="deleteModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-header is-flex is-flex-direction-column is-align-items-center">
            <div class="icon-weight-ins">
              <img style="width: 60px" src="../../assets/eventIcon.png" alt="Guerin" />
            </div>
            <h1 class="text-insert mb-5">Deseja desativar este tipo de evento?</h1>
          </div>
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
              <div :class="notification.classe">
                <button @click="onClickCloseNotification()" class="delete"></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button style="width: 250px;" class="button btn-cad" @click="openDelete">Voltar</button>
          <button style="width: 250px;" class="button btn-back" @click="disableEvent">
            Deletar Tipo de Evento
          </button>
        </footer>
      </div>
    </div>
    <div v-if="activeModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-header is-flex is-flex-direction-column is-align-items-center">
            <div class="icon-weight-ins">
              <img style="width: 60px" src="../../assets/eventIcon.png" alt="Guerin" />
            </div>
            <h1 class="text-insert mb-5">Deseja ativar este tipo de evento?</h1>
          </div>
          <div class="columns" v-if="notification.ativo">
            <div class="column is-12">
              <div :class="notification.classe">
                <button @click="onClickCloseNotification()" class="delete"></button>
                {{ notification.mensagem }}
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button style="width: 250px;" class="button btn-cad" @click="openActive">Voltar</button>
          <button style="width: 250px;" class="button btn-back" @click="enable">
            Ativar Tipo de Evento
          </button>
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
      field: "inactive"
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
  public nome: string = '';
  public reni: number = 1;
  private eventClient!: EventTypeClient;
  public eventList: EventType[] = [];
  public event: EventType = new EventType()
  deleteModal = false;
  activeModal = false;
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
        this.rows = response.data;
        this.count = response.data.filter((t) => !t.inactive).length;
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
  public onClickPageEventDetail(id: any) {
    this.$router.push({ name: "eventType-detail", params: { id: id } });
  }
  public onClickPageEventEdit(id: any) {
    this.$router.push({ name: "eventType-edit", params: { id: id } });
  }
  public openDelete(id: any) {
    this.onClickCloseNotification()
    if (this.deleteModal) {
      this.deleteModal = false;
    } else {
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
  public openActive(id: any) {
    this.onClickCloseNotification()
    if (this.activeModal) {
      this.activeModal = false;
    } else {
      this.activeModal = true;
    }
    this.eventClient.findById(id)
      .then(
        sucess => {
          this.event = sucess
        },
        error => console.log(error)
      )
  }
  public insert(item: any) {

    this.eventClient.cadastrar(item).then(
      (sucess: any) => {
        this.reni += 1
        this.notification = this.notification.new(true, 'notification is-success', 'Tipo de Evento Cadastrado com sucesso !!!')
        this.listAll()
      },
      (error: any) => {
        this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
        console.log(error);
      }
    )
  }
  public disableEvent() {
    this.eventClient.desativar(this.event).then(
      (sucess: any) => {
        this.reni += 1
        this.onClickCloseNotification()
        this.notification = this.notification.new(true, 'notification is-success', 'Tipo de Evento Desativado com sucesso !!!')
        this.listAll()
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  public enable() {

    this.eventClient.ativar(this.event.id).then(
      (sucess: any) => {
        this.reni += 1
        this.listAll()
        this.notification = this.notification.new(true, 'notification is-success', 'Tipo de Evento Ativado com sucesso !!!')
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  private onClickCloseNotification(): void {
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
  width: 280px;
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

.icon-weight-ins {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #ab0303;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
}

.text-insert {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
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
  margin: 0px 20px;
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

.btn-back {
  background-color: #ab0303;
  color: #ffffff;
  padding: 12px;
}

.btn-back:hover {
  background-color: #d10000;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-cad {
  background-color: #005bd4;
  color: #ffffff;
  padding: 12px;
}

.btn-cad:hover {
  background-color: #0067ee;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}
</style>
  