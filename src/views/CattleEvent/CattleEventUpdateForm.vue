<template>
  <main class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Editar <b>> Evento do Gado</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background-cattle-event">
        <div>
          <img style="width: 140px; background-color: cornflowerblue; border-radius: 15px"  src="../../assets/eventIcon.png" />
        </div>

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
        <div class="field is-horizontal form">
          <div class="field-body">
            <div class="field">
              Tipo de Evento
              <select v-model="cattleEvent.eventType">
                <option v-for="e in eventTypeList" :key="e.id" :value="e">{{ e.name }}</option>
              </select>
            </div>
            <div class="field">
              Gado
              <select v-model="cattleEvent.cattle" style="margin-right: 60px">
                <option type="number" v-for="c in cattleList" :key="c.id" :value="c">{{ c.earring }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="datetime-local"
                    placeholder="Data"
                    v-model="cattleEvent.date"
                />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Descrição"
                    v-model="cattleEvent.description"
                />
              </p>
            </div>
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/eventos/eventos-gados">
            <button class="button is-danger">Voltar</button>
          </router-link>
          <button @click="onClickEdit()" class="button is-link">Atualizar</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Notification } from '@/model/notification'
import { CattleEvent } from "@/model/cattle-event.model";
import CattleEventClient from "@/client/cattle-event.client";
import {Prop} from "vue-property-decorator";
import {EventTypeClient} from "@/client/event-type.client";
import {CattleClient} from "@/client/cattle.client";
import {EventType} from "@/model/event-type.model";
import {Cattle} from "@/model/cattle.model";


export default class CattleEventUpdateForm extends Vue {
  private cattleEvent : CattleEvent = new CattleEvent()
  private notification : Notification = new Notification()
  private eventTypeList: EventType[] = []
  private eventTypeClient!: EventTypeClient
  private cattleList: Cattle[] = []
  private cattleClient!: CattleClient

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.getCattleEvent()
    this.eventTypeClient = new EventTypeClient()
    this.cattleClient = new CattleClient()
    this.listAllEventsTypes()
    this.listAllCattles()
  }

  private listAllEventsTypes(): void{
    this.eventTypeClient.findAll()
        .then(
            success => {
              this.eventTypeList = success.data
            },
            error => console.log(error)
        )
  }

  private listAllCattles(): void{
    this.cattleClient.findAll()
        .then(
            success => {
              this.cattleList = success.data
            },
            error => console.log(error)
        )
  }


  private getCattleEvent(): void {
    CattleEventClient.findById(this.id)
        .then(
            success => {
              this.cattleEvent = success.data
            },
            error => console.log(error)
        )
  }

  private onClickEdit(): void {
    CattleEventClient.update(this.cattleEvent)
        .then(
            success => {
              this.notification = this.notification.new(true, 'notification is-success', 'Evento atualizado com sucesso!!!')
              this.onClickClean()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
              this.onClickClean()
            })
  }

  private onClickCloseNotification(): void {
    this.notification = new Notification()
  }
  private onClickClean(): void {
    this.cattleEvent = new CattleEvent()
  }
}


</script>

<style lang="scss" scoped>

.insert-background-cattle-event {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 90%;
  margin-top: 20px;
}
.form {
  margin-top: 5%;
  display: flex;
}
.btns {
  display: flex;
  .button {
    font-size: 18px;
    margin: 30px;
    width: 300px;
  }
}
select{
  height: 30px;
  width: 220px;
  border-radius: 5px;
  border-color: grey;
}
</style>