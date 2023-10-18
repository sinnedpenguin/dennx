import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
.use(Toast, {
  transition: "Vue-Toastification__bounce",
  position: "top-center",
  timeout: 10000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
})
.mount('#app')
