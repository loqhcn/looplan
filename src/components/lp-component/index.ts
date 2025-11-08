import LpComponent from './src/lp-component.vue';
import type { App } from 'vue';

let component = {
    install: (app:App) => {
        //console.log('use components', MComponent.name)
        app.component(LpComponent.name as string, LpComponent);
    }
}

export {
    LpComponent,
}
export default component;