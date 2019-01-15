我们创建 10000 个高度为 `50px` 的项目实验一下

```tsx
@Component
export default class Page6 extends Vue {
  items = Array.from({ length: 10000 }).map((_, index) => `#item ${index}`);

  renderList(h: CreateElement) {
    return this.items.map(item => (
      <div class="example1_item" key={item}>
        {item}
      </div>
    ));
  }

  render(h: CreateElement) {
    return (
      <page title="DEMO 1">
        <example>
          <virtual-scroll
            class="example1"
            item-source={this.renderList(h)}
            item-height={50}
          />
        </example>
      </page>
    );
  }
}
```
