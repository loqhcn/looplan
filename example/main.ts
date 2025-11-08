import { createApp } from 'vue'
import * as Vue from 'vue';

import './style.css'
import App from './App.vue'
import * as Looplan from '@/index'

import { setupRouter } from '@example/router';
import * as LooplanUi from 'looplan-ui';

// 引入全局样式
import 'looplan-ui/lib/index.css';
import 'looplan-ui/lib/looplan-ui.css';

// 配置looplan
import { setGateway, loadComponent, setComponentPackage, setIconGateway } from '@/index';

import currentLib from '@/index';

// 扩展 Window 类型，添加 Vue 属性
declare global {
    interface Window {
        Vue: typeof Vue;
        Looplan: typeof Looplan;
        LooplanUi: typeof LooplanUi;
    }
}


async function bootstrap() {
    const app = createApp(App);
    app.use(LooplanUi.default);
    app.use(currentLib);

    setGateway({
        url: 'http://localhost:9000/ComponentGateway.detail',
        name: 'test',
        // 认证
        // token:''
    })
    setIconGateway({
        name: 'looplan',
        url: 'http://localhost:9000/IconGateway.detail',
        // 认证
        // token:''
    });

    await setupRouter(app).isReady();

    app.mount('#app');


    console.log(LooplanUi.LpLayer);
    window.Vue = Vue;
    window.Looplan = Looplan;
    window.LooplanUi = LooplanUi;
}

bootstrap();