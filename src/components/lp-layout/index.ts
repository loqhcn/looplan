import LpLayout from './src/lp-layout.vue';


let component = {
    install: (app:any) => {
        // console.log('use ui-components', MuiIcon.name)
        app.component(LpLayout.name, LpLayout);
    }
}

export {
    LpLayout
}
export default component;