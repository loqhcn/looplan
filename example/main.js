import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import MuloLayer from '../src';


const app = createApp(App);

app.use(MuloLayer);

// app.use(Vue3StarrySky);
app.mount('#app');
