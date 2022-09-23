import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './components/SideBar'
import '@/plugins/axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')