<template>
  <div class="columns">
    <div class="bodyLogin column is-align-items-center">
      <img class="img_back" src="../assets/LoginBackGround.png" />
      <div class="flex">
        <div class="column is-half bodyParameters is-flex ">
          <img class="img_logo" src="../assets/Logo_Black.png" />
            <div class="field">
              <div class="control">
                <input class="login input is-sucess mt-6"  placeholder="Usuario"/>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="login input is-sucess mt-3"  placeholder="Senha"/>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="btn-login button mt-5 has-text-weight-bold">Entrar</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default {
  setup() {
    return {
      text: new Vue(""),
    };
  },
};
</script>

<style scoped lang="scss">
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
.img_back {
  position: fixed;
  width: 100%;
  height: 100%;
}
.login{
  width: 350px;
  border-radius: 12px;
}
.flex{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.btn-login{
  width: 280px;
  border-radius: 40px;
  background-color: #126B00;
  color: #f2f2f2;
  font-size: 18px;
}

.img_logo {
  width: 250px;
}

.bodyParameters {
  margin-top: 8%;
  padding: 40px;
  width: 50%;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 50px;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-self: center;
}
</style>
