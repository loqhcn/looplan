import { defineComponent, h, createVNode, reactive, toRefs } from 'vue';
import type { Slots, VNodeChild } from 'vue';
import LpComponent from '@/components/lp-component/src/lp-component.vue';


type ComponentSlots = Record<string, any>;


function parseNodeSlots(nodeSlots: ComponentSlots) {
    let slotsVnodes: ComponentSlots = {};
    for (const slotName in nodeSlots) {
        slotsVnodes[slotName] = () => nodeSlots[slotName]?.map(renderNode);
    }
    return slotsVnodes;
}

function renderNode(node: any) {
    // console.log('useRenderComponent setup renderNode', node);

    if (typeof node === 'string' || typeof node === 'number') return node;
    const { component, props, children } = node;

    let slotsOfCurrentNode: ComponentSlots = {};


    // 渲染组件的插槽
    if (node.slots) {
        slotsOfCurrentNode = {
            ...slotsOfCurrentNode,
            ...parseNodeSlots(node.slots),
        }
    }
    // 默认插槽内容
    if (children && children.length > 0) {
        slotsOfCurrentNode.default = () => children?.map(renderNode);
    }


    if (component.includes('@')) {
        return createVNode(
            LpComponent,
            { ...props, is: component },
            slotsOfCurrentNode,
        );
    } else {
        return createVNode(
            component,
            props || {},
            children?.map(renderNode)
        );
    }
};

function useRenderComponent(data: any, slots: Slots) {
    console.log('useRenderComponent', data);
    const state = reactive({ layout: data });

    return defineComponent({
        name: 'DynamicLayout',
        setup() {
            console.log('useRenderComponent setup', state.layout);



            return () => h('div', {}, state.layout.map((node: any) => renderNode(node)));
        },
    });
}

export { useRenderComponent };