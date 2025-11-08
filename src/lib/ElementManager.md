### 元素管理器demo

```ts

const manager = new ElementManager();

// 回调创建元素（不存在时才创建）
manager.register("toolbar", "add", () => {
  const btn = document.createElement("button");
  btn.textContent = "Add";
  document.body.appendChild(btn);
  return btn;
});

// 直接绑定已创建元素
const div = document.createElement("div");
document.body.appendChild(div);
manager.register("panel", "box1", div);

// 卸载指定 value
manager.unload("toolbar", "add");

// 卸载整个组
manager.unload("panel");

```