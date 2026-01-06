import { LooplanException } from './../../exception/LooplanException';
import type ModelSpace from './ModelSpace';

const modelSpaceMap = new Map<string, ModelSpace>()


const useModelSpace = (name: string) => {
    if (!modelSpaceMap.has(name)) {
        throw new LooplanException(`模型空间 ${name} 不存在`);
    }
    return modelSpaceMap.get(name)!;
}

export {
    modelSpaceMap,
    useModelSpace,
}