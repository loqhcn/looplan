import { isEmpty } from 'lodash';

/**
 * 注册全局组件到 Vue 应用实例
 * 
 */
export function registerLooplanComponents(app: any) {
  // 类型断言，明确 globalComponents 的类型
  const globalComponents = import.meta.glob<{ default: any }>('./lp-*/index.ts', { eager: true });

  console.debug('%cglobalComponents', 'color:green', globalComponents)

  Object.keys(globalComponents).forEach((key) => {
    // 明确 component 的类型
    const component = globalComponents[key].default;

    if (!isEmpty(component)) {
      app.use(component);
    }
  });
}