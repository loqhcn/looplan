import { createApp } from 'vue'
import * as Vue from 'vue';

import './style.css'
import App from './App.vue'

import { setupRouter } from '@example/router';
import looplanUi from 'looplan-ui';
import 'looplan-ui/lib/index.css'; // 引入全局样式

import currentLib from '@/index';

// 扩展 Window 类型，添加 Vue 属性
declare global {
    interface Window {
        Vue: typeof Vue;
    }
}


async function bootstrap() {
    const app = createApp(App);
    app.use(looplanUi);
    app.use(currentLib);

    await setupRouter(app).isReady();

    app.mount('#app');
    window.Vue = Vue;
}

bootstrap();