<template>
  <div class="form-cattle-event">
    <div class="columns">
      <div class="column is-12 is-size-3">
        Eventos > Editar
      </div>
    </div>

    <div class="content-form">
      <div class="align-icon-container">
        <img style="width: 140px; background-color: darkgreen; border-radius: 15px"  src="../../assets/eventIcon.png" />
      </div>

      <br/>

      <div class="columns" v-if="notification.ativo">
        <div class="column is-12">
          <div :class="notification.classe">
            <button @click="onClickCloseNotification()" class="delete" ></button>
            {{ notification.mensagem }}
          </div>
        </div>
      </div>

      <div class="container-inputs">
        <div>
          Brinco do Gado
          <select v-model="cattleEvent.cattle">
            <option type="number" v-for="c in cattleList" :key="c.id" :value="c">{{ c.earring }}</option>
          </select>
        </div>

        <div>
          Tipo de Evento
          <select v-model="cattleEvent.eventType">
            <option type="number" v-for="e in eventTypeList" :key="e.id" :value="e">{{ e.name }}
            </option>
          </select>
        </div>

        <div class="control">
          <input class="input" style="width: 300px" type="text" v-model="cattleEvent.description" placeholder="Descrição">
        </div>

        <div class="control">
          <input class="input" style="width: 300px" type="datetime-local" v-model="cattleEvent.date" placeholder="Data">
        </div>

      </div>
      <div class="container-buttons">
        <div class="container-boptions">
          <router-link class="link-cad" to="/eventos/eventos-gados">
            <button class="button is-danger btn-voltar is-fullwidth">Voltar</button>
          </router-link>
        </div>
        <div class="container-boptions">
          <button class="button is-fullwidth is-link" @click="onClickEdit()">Atualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Notification } from '@/model/notification'
import { CattleEvent } from "@/model/cattle-event.model";
import { CattleEventClient } from "@/client/cattle-event.client";
import {Prop} from "vue-property-decorator";
import {EventTypeClient} from "@/client/event-type.client";
import {CattleClient} from "@/client/cattle.client";
import {EventType} from "@/model/event-type.model";
import {PageRequest} from "@/model/page/page-request";
import {PageResponse} from "@/model/page/page-response";
import {Cattle} from "@/model/cattle.model";


export default class CattleEventUpdateForm extends Vue {
  private cattleEventClient!: CattleEventClient
  private cattleEvent : CattleEvent = new CattleEvent()
  private notification : Notification = new Notification()
  private eventTypeList: EventType[] = []
  private eventTypeClient!: EventTypeClient
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<EventType> = new PageResponse()
  private cattleList: Cattle[] = []
  private cattleClient!: CattleClient
  private pageResponseCattle: PageResponse<Cattle> = new PageResponse()

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.cattleEventClient = new CattleEventClient()
    this.getCattleEvent()
    this.eventTypeClient = new EventTypeClient()
    this.cattleClient = new CattleClient()
    this.listAllEventsTypes()
    this.listAllCattles()
  }

  private listAllEventsTypes(): void{
    this.eventTypeClient.findByAll(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.eventTypeList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }

  private listAllCattles(): void{
    this.cattleClient.findAll(this.pageRequest)
        .then(
            success => {
              this.pageResponseCattle = success
              this.cattleList = this.pageResponseCattle.content
            },
            error => console.log(error)
        )
  }


  private getCattleEvent(): void {
    this.cattleEventClient.findById(this.id)
        .then(
            success => {
              this.cattleEvent = success
            },
            error => console.log(error)
        )
  }

  private onClickEdit(): void {
    this.cattleEventClient.update(this.cattleEvent)
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

<style lang="scss">
.form-cattle-event{
  width: 100%;
  padding: 0px 30px 0px 30px;
  background-color: lightgray;
}
.content-form{
  background-color: white;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
}
.align-icon-container{
  display: flex;
  justify-content: center;
}
.container-inputs{
  display: flex;
  flex-direction: row;
  margin-top: 200px;
  justify-content: space-evenly;
}
.container-buttons{
  display: flex;
  margin-top: 200px;
  justify-content: space-evenly;
}
.container-boptions{
  width: 300px;
}

</style>