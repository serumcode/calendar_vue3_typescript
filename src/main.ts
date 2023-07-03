
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import  store from './store'
import  i18n from './i18n'
import mitt from 'mitt';                
import "./main.css";

const emitter:any = mitt();  
const app = createApp(App)

app.use(router).use(store).use(i18n())
app.provide('emitter', emitter); 

app.mount('#app')
