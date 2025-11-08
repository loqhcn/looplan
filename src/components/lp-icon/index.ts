import LpIcon from './src/lp-icon.vue';
import LpSvg from './src/lp-svg.vue';


let component = {
    install: (app:any) => {
        // console.log('use ui-components', MuiIcon.name)
        app.component(LpIcon.name, LpIcon);
        app.component(LpSvg.name, LpSvg);
    }
}

export {
    LpIcon,
    LpSvg
}
export default component;