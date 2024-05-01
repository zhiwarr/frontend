import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from './axios'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Form from 'vform'
import { toast } from 'vue3-toastify'
const uploads = "https://kebazaar.xyz/";
Form.axios = axios
const app = createApp(App)
app.config.globalProperties.$axios = { ...axios }
app.config.globalProperties.$uploads = uploads
app.config.globalProperties.$Form = Form
app.config.globalProperties.$toast = toast
app.use(Vue3Toasity, {
  position: 'top-right',
  duration: 2000,
  closeOnClick: true
})

app.use(createPinia())
app.use(router)

app.mount('#app')
