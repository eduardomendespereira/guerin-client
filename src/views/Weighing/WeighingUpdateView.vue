<template>
  <aside class="weight is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Eventos > Pesagem <b>> Editar</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-weight">
          <img
            style="width: 70px"
            src="../../assets/weightIcon.png"
            alt="Guerin"
          />
        </div>
        <h1 class="text-insert">Editar Pesagem</h1>
        <div class="column is-12">
          <div class="columns" v-if="notification.ativo" style="margin-top: 5%">
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

        <div class="select">
          <select placeholder="Gado" class="input" v-model="weighing.cattle">
            <option
              v-for="item in cattleList"
              :key="item.id"
              :value="item"
            >
              {{ item.earring }}
            </option>
          </select>
        </div>
        <h5 class="text-under-inputs">Número de Brinco</h5>

        <hr class="line" size="100" width="900" />
        <div class="btns">
          <router-link to="/eventos/pesagem">
            <button class="button btn-back">Cancelar</button>
          </router-link>
          <button class="button btn-inactiv" @click="updateWeighing">
            Editar Pesagem
          </button>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import { Prop } from "vue-property-decorator";

import { Vue } from "vue-class-component";
import { Weighing } from "@/model/weighing.model";
import { WeighingClient } from "@/client/weighing.client";
import { Notification } from "@/model/notification";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";

export default class WeightUpdate extends Vue {
  public cattleClient!: CattleClient;
  public cattleList: Cattle[] = [];
  public weighing: Weighing = new Weighing();
  private weighingClient!: WeighingClient;
  public notification: Notification = new Notification();

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.weighingClient = new WeighingClient();
    this.cattleClient = new CattleClient();
    this.getWeighing();
    this.listCattle();
  }

  public listCattle() {
    this.cattleClient.findAll().then(
      success => {
        this.cattleList = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getWeighing(): void {
    this.weighingClient.findById(this.id).then(
      success => {
        this.weighing = success;
      },
      (error) => console.log(error)
    );
  }

  public updateWeighing() {
    let formattedDate = new Date(this.weighing.date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/[/.,]/g, '-');
    this.weighingClient.update(this.weighing).then(
      (sucess: any) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Pesagem Editada com sucesso !!"
        );
        console.log(sucess);
      },
      (error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
        error.data
        );
        console.log(error);
      }
    );
  }

  public onClickCloseNotification(): void {
    this.notification = new Notification();
  }
}
</script>

<style lang="scss" scoped>
.weight {
  width: 100%;
}

.insert-back {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.icon-weight {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #ab0303;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
}

.btns {
  display: flex;
  .button {
    font-size: 18px;
    margin: 30px;
    width: 300px;
  }
}

.line {
  background-color: #dbdbdb;
  margin: 30px 0px 0px 0px;
}

.text-under-inputs {
  width: 40%;
  margin-left: 2px;
  font-size: 12px;
  color: #949494;
  margin-bottom: 10px;
}

.text-insert {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.in-1 {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 40%;
}

.select {
  display: flex;
  align-items: center;
  width: 40%;
  margin-top: 10px;
  margin-bottom: 5px;
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

.btn-inactiv {
  font-size: 15px;
  background-color: #0067ee;
  color: #ffffff;
  padding: 12px;
}

.btn-inactiv:hover {
  background-color: #006eff;
  transition: 0.7s;
  color: white;
  box-shadow: 0px 0px 10px #d1d1d1;
}
</style>
