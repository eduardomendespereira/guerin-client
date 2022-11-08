<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Pesagem</b></p>
      <div class="activates p-2">
        <div class="icon-activates">
          <img
            style="width: 30px"
            src="../../assets/weightIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Pesagens Ativas
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
        <button @click="openModal" class="button is-success">
          Inserir Pesagem
        </button>
      </div>
    </div>

    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-header is-flex is-justify-content-center">
            <div class="icon-weight-ins">
              <img
                style="width: 70px"
                src="../../assets/weightIcon.png"
                alt="Guerin"
              />
            </div>
            <button
              class="delete"
              @click="openModal"
              aria-label="close"
            ></button>
          </div>
          <div class="column is-12">
            <div :class="notification.classe">
              <button
                @click="onClickCloseNotification()"
                class="delete"
              ></button>
              {{ notification.mensagem }}
            </div>
          </div>
          <input
            class="input in-1"
            type="datetime-local"
            placeholder="Data"
            v-model="weighing.date"
          />
          <input
            class="input in-1"
            type="text"
            placeholder="Peso"
            v-model="weighing.weight"
          />

          <input
            class="input in-1"
            type="text"
            placeholder="Gado"
            v-model="weighing.cattle"
          />

          <!--<div class="select in-1">
            <select
              placeholder="Gado"
              class="input in-1"
              v-model="weighing.cattle"
            >
              <option v-for="item in weightList" :key="item.id" :value="item">
                {{ item.id }}
              </option>
            </select>
          </div>-->
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="openModal">
            Voltar ao Menu
          </button>
          <button class="button btn-cad" @click="insertWeight">
            Cadastrar Pesagem
          </button>
        </footer>
      </div>
    </div>

    <div class="columns is-flex">
      <div
        class="is-size-12 pt-5 pl-5"
        style="
          width: 100%;
          text-align: center;
          padding: 0px !important;
          margin: 20px 30px;
        "
      >
        <vue-good-table
          ref="weighttable"
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
            <span v-if="props.column.field == 'id'">
              <span>{{ props.row.id }}</span>
            </span>
            <span v-else-if="props.column.field == 'inactive'">
              <span v-if="!props.row.inactive" class="tag is-success"
                >Ativo</span
              >
              <span v-else-if="props.row.inactive" class="tag is-danger"
                >Inativo</span
              >
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span>{{ props.row.date }}</span>
            </span>
            <span v-else-if="props.column.field == 'weight'">
              <span>{{ props.row.weight }}</span>
            </span>
            <span v-else-if="props.column.field == 'cattle'">
              <span>{{ props.row.cattle?.earring }}</span>
            </span>

            <span v-else-if="props.column.field == 'actions'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageCattleEdit(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-pencil"></i>
                  </span>
                </button>
                <button
                  v-if="!props.row.inactive"
                  class="button is-danger is-outlined"
                  @click="openDisable(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
                <button
                  v-else-if="props.row.inactive"
                  class="button is-success is-outlined"
                  @click="openEnable(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </button>
              </p>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div v-if="actionModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deseja deletar essa especie ?</p>
          <button
            class="delete"
            @click="openDisable"
            aria-label="close"
          ></button>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="disableWeight">
            Deletar Especie
          </button>
          <button class="button btn-cad" @click="openDisable">Voltar</button>
        </footer>
      </div>
    </div>

    <div v-if="actionModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deseja ativar essa especie ?</p>
          <button
            class="delete"
            @click="openEnable"
            aria-label="close"
          ></button>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="enableWeight">
            Ativar Especie
          </button>
          <button class="button btn-cad" @click="openEnable">Voltar</button>
        </footer>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Weighing } from "@/model/weighing.model";
import { WeighingClient } from "@/client/weighing.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Notification } from "@/model/notification";

export default class WeightList extends Vue {
  public weighing: Weighing = new Weighing();
  public weightList: Weighing[] = [];
  private weighingClient!: WeighingClient;
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Weighing> = new PageResponse();
  private notification: Notification = new Notification();
  count: any = null;
  showModal = false;
  actionModal = false;

  columns = [
    {
      label: "ID",
      field: "id",
    },
    {
      label: "Status",
      field: "inactive",
    },
    {
      label: "Data",
      field: "date",
    },
    {
      label: "Peso",
      field: "weight",
    },
    {
      label: "Brinco",
      field: "cattle",
    },
    {
      label: "Ações",
      field: "actions",
      html: true,
    },
  ];
  rows = [];

  public mounted(): void {
    this.weighingClient = new WeighingClient();
    this.countWeight();
    this.listAll();
  }

  public listAll(): void {
    this.weighingClient.findByAll(this.pageRequest).then(
      (success: any) => {
        this.pageResponse = success;
        this.weightList = this.pageResponse.content;
        this.rows = success.content;
        console.log(this.weightList);
      },
      (error: any) => {
        console.log(error);
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.response.data
        );
      }
    );
  }

  public countWeight(): void {
    this.weighingClient.count().then(
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

  public insertWeight() {
    this.weighingClient.save(this.weighing).then(
      (sucess: any) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Pesagem Cadastrada com sucesso !!"
        );
        console.log(sucess);
      },
      (error: any) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error
        );
        console.log(error);
      }
    );
  }

  public openDisable(id: any) {
    this.weighing.id = id;
    if (this.actionModal) {
      this.actionModal = false;
    } else {
      this.actionModal = true;
    }
    this.weighingClient.findById(id).then(
      (sucess) => {
        this.weighing = sucess;
      },
      (error) => console.log(error)
    );
  }

  public openEnable(id: any) {
    this.weighing.id = id;
    if (this.actionModal) {
      this.actionModal = false;
    } else {
      this.actionModal = true;
    }
    this.weighingClient.findById(id).then(
      (sucess) => {
        this.weighing = sucess;
      },
      (error) => console.log(error)
    );
  }

  public disableWeight() {
    this.weighingClient.disable(this.weighing).then(
      (sucess: any) => {
        console.log(sucess);
        this.actionModal = false;
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
        this.actionModal = false;
      }
    );
  }

  public enableWeight() {
    this.weighingClient.enable(this.weighing).then(
      (sucess: any) => {
        console.log(sucess);
        this.actionModal = false;
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
        this.actionModal = false;
      }
    );
  }

  public onClickPageCattleDetail(id: number) {
    this.$router.push({ name: "cattle-detail", params: { id: id } });
  }

  public onClickPageCattleEdit(id: number) {
    this.$router.push({ name: "cattle-edit", params: { id: id } });
  }

  private onClickPageCattleInactive(id: number) {
    this.$router.push({
      name: "cattle-inactive",
      params: { id: id },
    });
  }
  private onClickPageCattleActive(id: number) {
    this.$router.push({ name: "cattle-active", params: { id: id } });
  }

  private onClickCloseNotification(): void {
    this.notification = new Notification();
  }
}
</script>

<style scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 30px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.icon-activates {
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

.text-activates {
  margin-left: 60px;
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

.delete {
  position: absolute;
  top: 3%;
  right: 2%;
}

.in-1 {
  margin: 10px 0px;
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
}

.modal-header {
  background-color: #ffffff;
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
  background-color: #ffffff;
  border-color: #1ba500;
  border-width: 3px;
  border-radius: 150px;
  color: #1ba500;
  margin-right: 10px;
}

.btn-edit:hover {
  transition: 1s;
  border-color: #1eb401;
  background-color: #1eb401;
}

.btn-delet {
  background-color: #ffffff;
  border-color: #ab0303;
  border-width: 3px;
  border-radius: 150px;
  color: #ab0303;
  margin-left: 10px;
}

.btn-delet:hover {
  transition: 1s;
  border-color: #c20101;
  background-color: #c20101;
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

.pagination {
  width: 95%;
  margin-left: 30px;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px #d1d1d1;
  margin-bottom: 20px;
}
.table {
  text-align: center;
}
</style>
