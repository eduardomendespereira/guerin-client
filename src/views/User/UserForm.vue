<template>
  <main class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4">Cadastro <b>> Usuario</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-background">
        <div class="icon-user">
          <img style="width: 100px; padding: 10px; background-color: #3c00ff; border-radius: 15px"  src="../../assets/userIcon.png" />
        </div>
        <div class="columns" v-if="notification.ativo" style="margin-top: 5%">
          <div class="column is-12">
            <div :class="notification.classe">
              <button @click="onClickCloseNotification()" class="delete"></button>
              <span v-html="notification.mensagem"></span>
            </div>
          </div>
        </div>
        <p v-if="errors.length" style="margin-top: 5%">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="error in errors" :key="error.mensagem">{{ error.mensagem }}</li>
        </ul>
        </p>
        <div class="field is-horizontal form">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" placeholder="Nome" v-model="user.firstName" />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" placeholder="Sobrenome" v-model="user.lastName" />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" placeholder="Usuario" v-model="user.username" />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="password" placeholder="Senha" v-model="user.password" />
                <span class="icon is-small is-left">
                  <i class="fa fa-key"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <div class="select">
                  <select style="width: 235px" v-model="user.role">
                    <option value="admin">Admin</option>
                    <option value="user">Usuario</option>
                  </select>
                </div>
                <span class="icon is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="email" placeholder="Email" v-model="user.email" />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="line" size="100" width="1000" />
        <div class="btns">
          <router-link to="/usuarios">
            <button class="button btn-back">Voltar</button>
          </router-link>
          <button @click="onClickSave()" class="button btn-cad">Cadastrar Usuário</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Notification } from "@/model/notification";
import userClient from "@/client/user.client";
import { User } from "@/model/user.model";
import { Role } from "@/model/role.enum";

export default class UserForm extends Vue {
  private user: User = new User();
  private notification: Notification = new Notification();
  private errors: Array<Notification> = new Array<Notification>();

  public mounted(): void {
    this.user.role = Role.admin;
  }

  private onClickSave(): void {
    userClient.save(this.user).then(
      (success) => {
        this.notification = this.notification.new(
          true,
          "notification is-success",
          "Usuario cadastrado com sucesso!!!"
        );
        this.onClickClean();
      },
      (error) => {
        console.log(error);
        if (error.response.status == 500) {
          const notifications = error.response.data.map((item) => {
            return item.message;
          });
          this.notification = this.notification.new(
            true,
            "notification is-danger",
            notifications.join('\r\n<br/>')
          );
        }
        else {         
          this.notification = this.notification.new(
            true,
            "notification is-danger",
            "Error: " + error.response.data
          );
        }
        this.onClickClean();
      }
    );
  }
  private onClickCloseNotification(): void {
    this.notification = new Notification();
  }
  private onClickClean(): void {
    this.user = new User();
    this.user.role = Role.admin;
  }
}
</script>

<style lang="scss" scoped>
.insert-background {
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
