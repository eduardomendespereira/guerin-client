<template>
  <div class="bodyLogin is-flex">
    <img class="img_back" src="../assets/LoginBackGround.png" />
    <div class="bodyParameters is-flex">
      <img class="img_logo" src="../assets/Logo_Black.png" />
      <q-input class="q-mt-md" v-model="text" label="Usuário" :dense="dense" />
      <q-input class="q-mt-md" v-model="text" label="Senha" :dense="dense" />
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
.img_back {
  position: fixed;
  width: 100%;
  height: 100%;
}

.img_logo {
  width: 250px;
}

.bodyLogin {
  justify-content: center;
}

.bodyParameters {
  padding: 40px;
  width: 50%;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
