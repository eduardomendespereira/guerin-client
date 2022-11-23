<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>&nbsp;> Pesagem</b></p>
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
          </div>
          <h1 class="text-insert">Cadastrar Pesagem</h1>
          <div class="column is-12">
            <div
              class="columns"
              v-if="notification.ativo"
              style="margin-top: 5%"
            >
              <div class="column is-12">
                <div :class="notification.classe">
                  <button
                    @click="onClickCloseNotification()"
                    class="delete"
                  ></button>
                  {{ notification.mensagem }}
                </div>
              </div>
            </div>
          </div>
          <input
            class="input in-1"
            type="datetime-local"
            placeholder="Data"
            v-model="weighing.date"
          />
          <h5 class="text-under-inputs">Data da Pesagem</h5>

          <input
            class="input in-1"
            type="number"
            placeholder="Peso"
            v-model="weighing.weight"
          />
          <h5 class="text-under-inputs">Peso</h5>

          <div class="select in-1">
            <select placeholder="Gado" class="input in-1" v-model="cattle">
              <option
                v-for="item in cattleList"
                :key="item.id"
                :value="item.earring"
              >
                {{ item.earring }}
              </option>
            </select>
          </div>
          <h5 class="text-under-inputs">Número de Brinco</h5>
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
            <span v-if="props.column.field == 'detail'">
              <p class="buttons">
                <button
                  class="button is-info is-outlined"
                  @click="onClickPageWeightDetail(props.row.id)"
                >
                  <span class="icon is-small">
                    <i class="fa fa-info"></i>
                  </span>
                </button>
              </p>
            </span>
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
                  @click="onClickPageWeightUpdate(props.row.id)"
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
          <div class="icon-weight-ins">
            <img
              style="width: 70px"
              src="../../assets/weightIcon.png"
              alt="Guerin"
            />
          </div>
          <p class="modal-card-title">Deseja Desativar Esta Pesagem??</p>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-cad" @click="openDisable">Voltar</button>
          <button class="button btn-back" @click="disableWeight">
            Desativar Pesagem
          </button>
        </footer>
      </div>
    </div>

    <div v-if="actionEnableModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="icon-weight-ins">
            <img
              style="width: 70px"
              src="../../assets/weightIcon.png"
              alt="Guerin"
            />
          </div>
          <p class="modal-card-title">Deseja Ativar Esta Pesagem??</p>
        </header>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-cad" @click="openEnable">Voltar</button>
          <button class="button btn-back" @click="enableWeight">
            Ativar Pesagem
          </button>
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
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";
import { date } from "yup/lib/locale";

export default class WeightList extends Vue {
  public cattle: Cattle = new Cattle();
  public cattleClient!: CattleClient;
  public cattleList: Cattle[] = [];
  public weighing: Weighing = new Weighing();
  public weightList: Weighing[] = [];
  private weighingClient!: WeighingClient;
  private pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Weighing> = new PageResponse();
  public notification: Notification = new Notification();
  count: any = null;
  showModal = false;
  actionModal = false;
  actionEnableModal = false;

  columns = [
    {
      label: "Detalhar",
      field: "detail",
    },
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
    this.cattleClient = new CattleClient();
    this.countWeight();
    this.listAll();
    this.listCattle();
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
  public listCattle() {
    this.cattleClient.findAll().then(
      (sucess) => {
        this.cattleList = sucess.data;
      },
      (error) => {
        console.log(error);
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
    this.weighing.cattle = this.cattle;
    this.weighingClient.save(this.weighing).then(
      (sucess: any) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Pesagem Cadastrada com sucesso !!"
        );
        window.location.reload();
        console.log(sucess);
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Error: " + error.data
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
    if (this.actionEnableModal) {
      this.actionEnableModal = false;
    } else {
      this.actionEnableModal = true;
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
        this.actionEnableModal = false;
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
        this.actionEnableModal = false;
      }
    );
  }

  public onClickPageWeightDetail(id: number) {
    this.$router.push({ name: "weight-detail", params: { id: id } });
  }

  public onClickPageWeightUpdate(id: number) {
    this.$router.push({ name: "weight-update", params: { id: id } });
  }

  public onClickCloseNotification(): void {
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

.text-insert {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.in-1 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.select {
  display: flex;
  align-items: center;
  width: 100%;
}

.text-under-inputs {
  margin-left: 2px;
  font-size: 12px;
  color: #949494;
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
  padding: 20px;
  padding-bottom: 0px;
}

.tag {
  border-radius: 50px;
  padding: 12px;
}

p {
  display: flex;
  justify-content: center;
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

.modal-card-head {
  display: flex;
  flex-direction: column;
}

.modal-card-title {
  margin: 30px 0px;
  font-weight: bold;
}
</style>
