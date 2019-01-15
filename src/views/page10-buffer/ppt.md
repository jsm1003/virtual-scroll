通过增加缓冲区来获得比视口区更大的渲染范围

增加两个 `props`，`minBufferPx` 和 `maxBufferPx`

`minBufferPx` 用于缓冲区最小的像素数，经过滚动缓冲区像素数小于 `minBufferPx` 时，会立即补充像素数至 `maxBufferPx`

```ts
@Prop({ type: Number, default: 100 }) minBufferPx!: number;

@Prop({ type: Number, default: 200 }) maxBufferPx!: number;

```

具体实现

```tsx
@Component
export class VirtualScroll3 extends Vue {
  @Prop({ type: Array }) itemSource!: any[];

  @Prop({ type: Number, required: true }) itemHeight!: number;

  @Prop({ type: Number, default: 100 }) minBufferPx!: number;

  @Prop({ type: Number, default: 200 }) maxBufferPx!: number;

  spacerStyle: any = {};

  contentWrapperStyle: any = {};

  renderContent: VNode[] = [];

  renderedRange = { start: 0, end: 0 };

  onElementScroll = rafThrottle(this.renderRangeContent);

  get itemList() {
    return this.$slots.default || this.itemSource;
  }

  get totalContentSize() {
    return this.itemList.length * this.itemHeight;
  }

  setTotalContentSize() {
    this.spacerStyle = {
      transform: `scaleY(${this.totalContentSize})`,
    };
  }

  getRenderedRange(): ListRange {
    const dataLength = this.itemList.length;
    const renderedRange = this.renderedRange;
    const viewportEl = this.$el as HTMLElement;
    const scrollTop = viewportEl.scrollTop;

    const viewportSize = viewportEl.offsetHeight;
    const firstVisibleIndex = scrollTop / this.itemHeight;
    const newRange = { start: renderedRange.start, end: renderedRange.end };
    // 缓冲区间
    const startBuffer = scrollTop - newRange.start * this.itemHeight;
    // 如果向下滚动，那么只能是上半部分缓冲区内容率先不足
    if (startBuffer < this.minBufferPx && newRange.start !== 0) {
      const expandStart = Math.ceil((this.maxBufferPx - startBuffer) / this.itemHeight);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(
        dataLength,
        Math.ceil(
          firstVisibleIndex + (viewportSize + this.minBufferPx) / this.itemHeight,
        ),
      );
      // 如果是向下滚动，那么只能是下半部分缓冲区内容率先不足
    } else {
      const endBuffer = newRange.end * this.itemHeight - (scrollTop + viewportSize);
      if (endBuffer < this.minBufferPx && newRange.end !== dataLength) {
        const expandEnd = Math.ceil((this.maxBufferPx - endBuffer) / this.itemHeight);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(
            0,
            Math.floor(firstVisibleIndex - this.minBufferPx / this.itemHeight),
          );
        }
      }
    }

    return newRange;
  }

  renderRangeContent() {
    const renderedRange = this.getRenderedRange();
    this.renderedRange = renderedRange;
    this.renderContent = this.itemList.slice(renderedRange.start, renderedRange.end);
    this.contentWrapperStyle = {
      transform: `translateY(${renderedRange.start * this.itemHeight}px)`,
    };
  }

  mounted() {
    this.setTotalContentSize();
    this.renderRangeContent();
  }

  render(h: CreateElement) {
    return (
      <div class="virtual-scroll-3" on-scroll={this.onElementScroll}>
        <div style={this.contentWrapperStyle} class="virtual-scroll-3_content-wrapper">
          {this.renderContent}
        </div>
        <div style={this.spacerStyle} class="virtual-scroll-3_spacer" />
      </div>
    );
  }
}
```
