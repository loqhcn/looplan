type CreateFn = () => HTMLElement;
type ElementLike = HTMLElement | CreateFn;

interface RecordItem {
  el: HTMLElement;
  group: string;
  value: string | null;
}

/**
 * 元素管理器
 * 用于管理不同分组下的元素，支持动态注册、注销、获取等操作。
 * 每个元素都关联一个唯一的分组和可选值，值可以为空。
 * 元素可以是 HTMLElement 实例或创建函数，创建函数在需要时调用。
 */
export class ElementManager {
  // group -> value -> HTMLElement
  private store = new Map<string, Map<string | null, HTMLElement>>();

  // metadata (自动 GC，不会泄漏)
  private meta = new WeakMap<HTMLElement, RecordItem>();

  /**
   * 注册或更新元素
   * @param group 分组名称
   * @param value 元素值，可选
   * @param elementOrFn 元素实例或创建函数
   * @returns 注册或更新后的元素实例
   */
  register(group: string, value: string | null, elementOrFn: ElementLike): HTMLElement {
    if (!this.store.has(group)) {
      this.store.set(group, new Map());
    }

    const groupMap = this.store.get(group)!;

    // 如果已存在 => 卸载旧的
    if (groupMap.has(value)) {
      this.unload(group, value);
    }

    // 创建或使用已有元素
    const el = typeof elementOrFn === "function"
      ? elementOrFn()
      : elementOrFn;

    groupMap.set(value, el);
    this.meta.set(el, { el, group, value });

    return el;
  }

  /**
   * 注销元素
   * @param group 分组名称
   * @param value 元素值，可选
   */
  unload(group: string, value?: string | null) {
    const groupMap = this.store.get(group);
    if (!groupMap) return;

    // 卸载整组
    if (value === undefined) {
      for (const [, el] of groupMap) {
        el.remove();
        this.meta.delete(el);
      }
      this.store.delete(group);
      return;
    }

    // 卸载 group + value
    const el = groupMap.get(value);
    if (el) {
      el.remove();
      this.meta.delete(el);
      groupMap.delete(value);
    }

    // 如果该组空了 -> 自动删除
    if (groupMap.size === 0) {
      this.store.delete(group);
    }
  }

  // 可选：取值
  get(group: string, value: string | null): HTMLElement | null {
    return this.store.get(group)?.get(value) ?? null;
  }

  // 可选：检查存在
  exists(group: string, value: string | null): boolean {
    return this.store.get(group)?.has(value) ?? false;
  }

  // 可选：列出组内容
  list(group: string): HTMLElement[] {
    return Array.from(this.store.get(group)?.values() ?? []);
  }

  // 可选：卸载所有
  unloadAll() {
    for (const group of Array.from(this.store.keys())) {
      this.unload(group);
    }
  }
}