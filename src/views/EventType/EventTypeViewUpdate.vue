<template>
    <aside class="cattle is-fullheight">
        <div class="text-up columns">
          <p class="is-size-4 pt-5 pl-5">Tipo de Evento<b> > Editar</b></p>
        </div>
        <section class="is-flex is-justify-content-center">
          <div class="insert-back">
            <div class="icon-cattle">
              <img
                style="width: 70px"
                src="@/assets/specieIcon.png"
                alt="Guerin"
              />
            </div>
            <div class="columns" v-if="notification.ativo">
              <div class="column is-12">
                <div :class="notification.classe">
                  <button @click="onClickCloseNotification()" class="delete" ></button>
                  {{ notification.mensagem }}
                </div>
              </div>
            </div>
            <div class="form">
              <input v-model="event.name" class="input is-primary is-flex is-flex-direction-column is-align-items-center" placeholder="Nome"/>
            </div>
            <div class="btns">
              <button class="button is-primary is-small" @click="update">Salvar</button>
              <router-link to="/tipo-de-evento">
                <button class="button btn-voltar">Voltar</button>
              </router-link>
            </div>
          </div>
        </section>
      </aside>
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import { EventTypeClient } from '@/client/event-type.client';
import { EventType } from '@/model/event-type.model';
import { Notification } from "@/model/notification";
export default class SpecieDetail extends Vue{
  public event: EventType = new EventType()
  private eventClient!: EventTypeClient
  private notification: Notification = new Notification();
  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.eventClient = new EventTypeClient();
    this.getEvent();
    console.log(this.event);
  }
  private onClickCloseNotification(): void {
    this.notification = new Notification()
  }
  private getEvent(): void {
    this.eventClient.findById(this.id)
        .then(
            sucess => {
              
              this.event = sucess
            },
            error => console.log(error)
        )
  }
  public update() : void {
  this.eventClient.editar(this.event).then(
          sucess => {
            console.log(sucess)
            this.notification = this.notification.new(true, 'notification is-success', 'Tipo de Evento editado com sucesso !!!')
          },
          error => {
            this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
            console.log(this.event)
          }
      )
}
}
</script>

<style lang="scss">
    .cattle {
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
      
      .icon-cattle {
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
          width: 150px;
        }
      }
      
      .linha {
        background-color: #dbdbdb;
        margin: 30px 0px 0px 0px;
      }
      
      .form {
        display: flex;
        h1 {
          margin: 15px 70px 15px 117px;
        }
        h4 {
          margin: 12px 90px 15px 120px;
        }
      }
      
      .btn-voltar {
        background-color: #005bd4;
        color: #ffffff;
        padding: 12px;
      }
      
      .btn-voltar:hover {
        background-color: #0067ee;
        color: white;
        transition: 0.7s;
        box-shadow: 0px 0px 10px #d1d1d1;
      }
</style>