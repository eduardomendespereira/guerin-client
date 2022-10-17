<template>
    <aside class="farm is-fullheight">
      <div class="text-up columns">
        <p class="is-size-4 pt-5 pl-5">Editar <b>> Fazenda</b></p>
      </div>
      <section class="is-flex is-justify-content-center">
        <div class="insert-back">
          <div class="icon-farm">
            <img
              style="width: 80px"
              src="../../assets/farmIcon.png"
              alt="Guerin"
            />
          </div>
          <div :class="notification.classe">
            <button @click="onClickCloseNotification()" class="delete"></button>
            {{ notification.mensagem }}
          </div>
          <div class="form">
            <input
              class="input in-1"
              type="text"
              placeholder="Nome"
              v-model="farm.name"
            />
            <input
              class="input in-1"
              type="text"
              placeholder="Endereço"
              v-model="farm.address"
            />
          </div>
          <hr class="line" size="100" width="1000" />
          <div class="btns">
            <router-link to="/fazendas">
              <button class="button btn-back">Voltar ao Menu</button>
            </router-link>
            <button @click="onClickSave()" class="button btn-cad">
              Editar Fazenda
            </button>
          </div>
        </div>
      </section>
    </aside>
  </template>
  
  <script lang="ts">
  import { Vue } from "vue-class-component";
  import { Notification } from "@/model/notification";
  import { PageRequest } from "@/model/page/page-request";
  import { PageResponse } from "@/model/page/page-response";
  import { FarmClient } from "@/client/farm.client";
  import { Farm } from "@/model/farm.model"
  import { Prop } from "vue-property-decorator";
  
  export default class cattleInsertForm extends Vue {
    private notification: Notification = new Notification();
    private pageRequest: PageRequest = new PageRequest();
    private pageResponse: PageResponse<any> = new PageResponse();
    private farmClient!: FarmClient;
    private farm: Farm = new Farm();

    @Prop({ type: Number, required: false })
    private readonly id!: number;
  
    public mounted(): void {
      this.farmClient = new FarmClient();
      this.getFarm()
    }

    private getFarm(): void {
        this.farmClient.findById(this.id)
        .then(
            success => {
                this.farm = success
            },
            error => {
                console.log(error);
            }
        )
    }
  
  
    private onClickSave(): void {
      this.farmClient.update(this.farm).then(
        (success) => {
          this.notification = this.notification.new(
            true,
            "notification is-success",
            "Fazenda editada com sucesso!"
          );
          this.onClickClean();
        },
        (error) => {
          this.notification = this.notification.new(
            true,
            "notification is-danger",
            "Error: " + error
          );
          this.onClickClean();
        }
      );
    }
  
    private onClickCloseNotification(): void {
      this.notification = new Notification();
    }
    private onClickClean(): void {
      this.farm = new Farm();
    }
  }
  </script>
  
  <style lang="scss">
  .farm {
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
  }
  
  .icon-farm {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    background-color: #ffb800;
    border-radius: 20px;
    margin: 0px 0px 20px 0px;
  }
  
  .form {
    display: flex;
    .in-1 {
      margin: 15px;
    }
  
    .input {
      width: 300px;
    }
  
    .select {
      width: 300px;
    }
  }
  
  .date {
    margin: 15px;
    width: 630px;
  }
  
  .line {
    background-color: #dbdbdb;
    margin: 30px 0px 0px 0px;
  }
  
  .btns {
    display: flex;
    .button {
      font-size: 18px;
      margin: 30px;
      width: 300px;
    }
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
  
  .btn-back {
    background-color: #c20101;
    color: #ffffff;
    padding: 12px;
  }
  
  .btn-back:hover {
    background-color: #da0000;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
  }
  </style>
  