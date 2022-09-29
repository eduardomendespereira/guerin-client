<template>
  <aside class="events is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5"><b>Eventos</b></p>
    </div>
    <div class="is-flex is-justify-content-space-around">
      <div class="is-flex is-justify-content-center">
        <div class="activates-vaccine">
          <div class="icon-activates-vaccine">
            <img
              style="width: 50px"
              src="../../assets/vacineIcon.png"
              alt="Guerin"
            />
          </div>
          <h1
            class="text-activates has-text-weight-bold is-size-3"
            style="color: black"
          >
            Vacinas
          </h1>

          <hr class="line" size="10" />

          <router-link class="link is-size-5" to="/eventos/vacinas"
            >Acessar</router-link
          >
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <div class="activates-vaccine-app">
          <div class="icon-activates-vaccine-app">
            <img
              style="width: 50px"
              src="../../assets/vaccineAppIcon.png"
              alt="Guerin"
            />
          </div>
          <h1
            class="text-activates has-text-weight-bold is-size-3"
            style="color: black"
          >
            Aplicação de Vacinas
          </h1>

          <hr class="line" size="10" />

          <router-link
            class="link is-size-5"
            to="/eventos/aplicacoes-de-vacinas"
            >Acessar</router-link
          >
        </div>
      </div>
    </div>
    <div class="is-flex is-justify-content-space-around">
      <div class="is-flex is-justify-content-center">
        <div class="activates-events">
          <div class="icon-activates-events">
            <img
              style="width: 50px"
              src="../../assets/eventIcon.png"
              alt="Guerin"
            />
          </div>
          <h1
            class="text-activates has-text-weight-bold is-size-3"
            style="color: black"
          >
            Eventos Ocorridos
          </h1>

          <hr class="line" size="10" />

          <router-link class="link is-size-5" to="/eventos/pesagem"
            >Acessar</router-link
          >
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <div class="activates">
          <div class="icon-activates">
            <img
              style="width: 50px"
              src="../../assets/weightIcon.png"
              alt="Guerin"
            />
          </div>
          <h1
            class="text-activates has-text-weight-bold is-size-3"
            style="color: black"
          >
            Pesagem
          </h1>

          <hr class="line" size="10" />

          <router-link class="link is-size-5" to="/eventos/pesagem"
            >Acessar</router-link
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class EventView extends Vue {}
</script>

<style scoped>
.activates {
  background-color: white;
  width: 250px;
  height: 250px;
  margin-top: 45px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  padding: 30px 40px 8px 40px;
}

.icon-activates {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 80px;
  border-radius: 27px;
  background-color: #ab0303;
}

.text-activates {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}

/**/
.activates-vaccine {
  background-color: white;
  margin-top: 45px;
  width: 250px;
  height: 250px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  padding: 30px 40px 8px 40px;
}

.icon-activates-vaccine {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 80px;
  border-radius: 27px;
  background-color: #126b00;
}

/**/
.activates-vaccine-app {
  background-color: white;
  margin-top: 45px;
  width: 250px;
  height: 250px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  padding: 30px 40px 8px 40px;
}

.icon-activates-vaccine-app {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 80px;
  border-radius: 27px;
  background-color: #007a9b;
}

/**/

.activates-events {
  background-color: white;
  margin-top: 45px;
  width: 250px;
  height: 250px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
  padding: 30px 40px 8px 40px;
}

.icon-activates-events {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 80px;
  border-radius: 27px;
  background-color: #007a9b;
}

.events {
  width: 100%;
}

.line {
  background-color: #dbdbdb;
  margin: 25px 0px 10px 0px;
}

.link {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
