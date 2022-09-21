import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './components/SideBar'
import '@/plugins/axios'
import { VueCookieNext } from 'vue-cookie-next'

const app = createApp(App)
app.use(router).use(VueCookieNext).mount('#app')

VueCookieNext.config({ expire: '2d' })