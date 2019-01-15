## 通过类的继承来实现 Vuejs 中的 混合（mixins）

`MixinExample` 类继承于 `Vue`，但并没有提供 `render` 方法。

```jsx
@Component
export class MixinExample extends Vue {
  count = 1;
}
```

`Comp1` 和 `Comp2` 继承于 `MixinExample`，并实现了各自的 `render` 方法。

```jsx
// comp1
@Component
export class Comp1 extends MixinExample {
  render(h) {
    return <div>Comp1：{this.count}</div>;
  }
}

// comp2
@Component
export class Comp2 extends MixinExample {
  handleClick() {
    this.count += 1;
  }

  render(h) {
    return (
      <div>
        Comp2：
        <button on-click={this.handleClick}> add </button>
        <span>{this.count}</span>
      </div>
    );
  }
}
```

在 `Page10` 类中使用了 `Comp1` 和 `Comp2`。

```jsx
@Component({
  components: { Comp1, Comp2 },
})
export default class Page10 extends MixinExample {
  render(h) {
    return (
      <page title="mixin">
        <comp1 />
        <comp2 />
      </page>
    );
  }
}
```
