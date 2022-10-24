import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./components/SideBar";
import "@/plugins/axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueGoodTablePlugin from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'

const app = createApp(App);
app.use(router).use(VueGoodTablePlugin).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

app.config.globalProperties.$filters = {
  columnHead(value: string) {
    return value.split("_").join(" ").toUpperCase();
  },
};
