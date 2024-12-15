import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import pinia from "./stores";

console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

createApp(App).use(router).use(pinia).mount('#app')
