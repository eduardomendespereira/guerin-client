<template>
  <section class="hero is-fullheight header-image">
    <div class="hero-body">
      <form @submit.prevent="login" class="loginForm">
        <div class="container">
          <div class="columns is-centered">
            <div class="bodyLogin column is-align-items-center">
              <div class="flex">
                <div
                  class="
                    column
                    is-one-third-desktop is-three-fifths
                    bodyParameters
                    is-flex
                  "
                >
                  <img class="img_logo" src="../assets/Logo_Black.png" />          
                  <div class="field" style="max-width: 100%; min-width: 90%; margin-top: 10%">
                    <p class="control has-icons-left">
                      <input
                        class="input login input is-sucess"
                        type="text"
                        placeholder="Usuario"
                        v-model="request.username"
                      />
                      <span class="icon is-small is-left">
                        <i style="color: black" class="fa fa-user"></i>
                      </span>
                    </p>
                  </div>

                  <div class="field" style="max-width: 100%; min-width: 90%">
                    <p class="control has-icons-left">
                      <input
                        class="input login input is-sucess"
                        type="password"
                        placeholder="Senha"
                        v-model="request.password"
                      />
                      <span class="icon is-small is-left">
                        <i style="color: black" class="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <div class="columns" v-if="notification.ativo">
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

                  <div class="field" style="max-width: 100%; min-width: 90%">
                    <div class="control">
                      <button
                        type="submit"
                        class="btn-login button mt-5 has-text-weight-bold"
                        style="width: 100%"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { reactive } from "vue";
import axios from "axios";
import { UserClient } from "@/client/user.client";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { Notification } from "@/model/notification";

export default class Login extends Vue {
  private userClient!: UserClient;
  private request = { username: "", password: "" };
  private notification: Notification = new Notification();

  public mounted(): void {
    this.userClient = new UserClient();
    removeCookie("access_token");
    removeCookie("refresh_token");
  }

  public login(): void {
    if (!this.userClient) this.userClient = new UserClient();
    this.userClient
      .login(this.request.username, this.request.password)
      .then((response) => {
        if (response.data.access_token && response.data.refresh_token) {
          setCookie("access_token", response.data.access_token, { expires: 1 });
          setCookie("refresh_token", response.data.refresh_token, {
            expires: 4,
          });
        }
        this.$router.push({ path: "/" });
      })
      .catch((error) => {
        this.notification = this.notification.new(
          true,
          "notification is-danger",
          "Login ou senha incorreto"
        );
        this.onClickClean();
      });
  }

  private onClickCloseNotification(): void {
    this.notification = new Notification();
  }

  public onClickClean(): void {
    this.request.password = "";
  }
}
</script>

<style scoped lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
.header-image {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/LoginBackGround.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
.login {
  border-radius: 12px;
  border-color: black;
}
.login::placeholder {
  opacity: 1;
  color: gray;
}
.flex {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.btn-login {
  border-radius: 40px;
  background-color: #126b00;
  color: #f2f2f2;
  font-size: 18px;
}

.img_logo {
  width: 250px;
}

.bodyParameters {
  padding: 40px;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 50px;
  flex-direction: column;
  align-items: center;
}
.loginForm {
  width: 100%;
  height: 100%;
}
</style>