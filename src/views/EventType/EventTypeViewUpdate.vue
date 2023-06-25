<template>
  <aside class="cattle is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Editar<b> > Tipo de Evento</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-cattle">
          <img style="width: 60px" src="@/assets/eventIcon.png" alt="Guerin" />
        </div>
        <div class="columns" v-if="notification.ativo">
          <div class="column is-12">
            <div :class="notification.classe">
              <button @click="onClickCloseNotification()" class="delete"></button>
              {{ notification.mensagem }}
            </div>
          </div>
        </div>
        <div class="form pt-3 pb-3">
          <input v-model="event.name" style="width: 350px;" class="input is-flex is-flex-direction-column is-align-items-center"
            placeholder="Nome" />
        </div>
        <hr class="line" size="100" width="900" />
        <div class="btns">
          <router-link to="/tipo-de-evento">
            <button class="button btn-back">Voltar</button>
          </router-link>
          <button class="button btn-cad" @click="update">Editar Tipo de Evento</button>
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
export default class SpecieDetail extends Vue {
  public event: EventType = new EventType()
  private eventClient!: EventTypeClient
  private notification: Notification = new Notification();
  @Prop({ type: Number, required: false })
  private readonly id!: number

  public mounted(): void {
    this.eventClient = new EventTypeClient();
    this.getEvent();
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
  public update(): void {
    this.eventClient.editar(this.event).then(
      sucess => {
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

<style lang="scss" scoped>
.cattle {
  width: 100%;
}

.line {
  background-color: #dbdbdb;
  margin: 30px 0px 0px 0px;
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
    width: 250px;
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