import { ModelSpace } from './ModelSpace';
declare const modelSpaceMap: Map<string, ModelSpace>;
declare const useModelSpace: (name: string) => ModelSpace;
export { modelSpaceMap, useModelSpace, ModelSpace };
