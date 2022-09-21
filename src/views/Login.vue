<template>
  <section class="hero is-fullheight header-image">
    <div class="hero-body">
      <form @submit="login" class="loginForm">
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
                  <div class="field" style="max-width: 100%; min-width: 90%">
                    <div class="control">
                      <input
                        class="login input is-sucess mt-6"
                        placeholder="Usuario"
                        v-model="request.username"
                      />
                    </div>
                  </div>
                  <div class="field" style="max-width: 100%; min-width: 90%">
                    <div class="control">
                      <input
                        class="login input is-sucess mt-3"
                        type="password"
                        placeholder="Senha"
                        v-model="request.password"
                      />
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

export default class Login extends Vue {
  private userClient!: UserClient;
  private request = { username: "", password: "" };

  public mounted(): void {
    this.userClient = new UserClient();
  }

  private login = async () => {
    if (!this.userClient) this.mounted();
    this.userClient.login(this.request.username, this.request.password).then(
      response => {
        if (response.access_token && response.refresh_token) {
          this.$cookie.setCookie('access_token', response.access_token, { expire: '2h' }) //pegar do token
          this.$cookie.setCookie('refresh_token', response.refresh_token, { expire: '48h' }) //pegar do token
        }
        console.log(this.$cookie.getCookie('access_token'));
        console.log(this.$cookie.getCookie('refresh_token'));
      })
      .catch(error => {
        //implementar alguma msgbox
        this.onClickClean();
      })
  };

  private onClickClean(): void {
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