## Template

_jsx_

```jsx
<div class="virtual-scroll" on-scroll="{this.renderRangeContent}">
  <div style="{this.contentWrapperStyle}" class="virtual-scroll_content-wrapper">
    {this.renderContent}
  </div>
  {/* 一像素宽的细线，用于撑开滚动条 */}
  <div style="{this.spacerStyle}" class="virtual-scroll_spacer" />
</div>
```

## Style

_scss_

```scss
.virtual-scroll {
  display: block;
  position: relative;
  transform: translateZ(0);
  overflow: auto;
  contain: strict;
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;

  .virtual-scroll_content-wrapper {
    position: relative;
    top: 0;
    left: 0;
    min-width: 100%;
    contain: content;
  }

  .virtual-scroll_spacer {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    transform-origin: 0 0;
  }
}
```

## virtual-scroll

```tsx
import {
  Component,
  Vue,
  Prop,
  Inject,
  Model,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

import './virtual-scroll.scss';

/** 定义 range 的类型*/
type ListRange = { start: number; end: number };

/**
 * 基本实现
 */
@Component
export class VirtualScroll extends Vue {
  /** 所有的项目 */
  @Prop({ type: Array }) itemSource!: any[];

  /** 项目的高度（pixel）*/
  @Prop({ type: Number, required: true }) itemHeight!: number;

  spacerStyle: any = {};

  contentWrapperStyle: any = {};

  renderContent: VNode[] = [];

  get itemList() {
    return this.$slots.default || this.itemSource;
  }

  get TotalContentSize() {
    const totalItems = this.$slots.default || this.itemSource;
    return this.itemHeight * totalItems.length;
  }

  /** 通过 scale 拉长细线来设置整个内容的高度 */
  setTotalContentSize() {
    const totalContentSize = this.TotalContentSize;
    this.spacerStyle = {
      transform: `scaleY(${totalContentSize})`,
    };
  }

  /** 获取当前的渲染范围 */
  getRenderedRange() {
    const viewportEl = this.$el as HTMLElement;
    const range: ListRange = { start: 0, end: 0 };

    range.start = Math.floor(viewportEl.scrollTop / this.itemHeight);
    range.end = Math.ceil(
      (viewportEl.scrollTop + viewportEl.offsetHeight) / this.itemHeight,
    );

    return range;
  }

  /** 根据渲染范围渲染可视区中的数据 */
  renderRangeContent() {
    const renderedRange = this.getRenderedRange();
    this.renderContent = this.itemList.slice(renderedRange.start, renderedRange.end);
    this.contentWrapperStyle = {
      transform: `translateY(${this.itemHeight * renderedRange.start}px)`,
    };
  }

  mounted() {
    this.setTotalContentSize();
    this.renderRangeContent();
  }

  render(h: CreateElement) {
    return (
      <div class="virtual-scroll" on-scroll={this.renderRangeContent}>
        <div style={this.contentWrapperStyle} class="virtual-scroll_content-wrapper">
          {this.renderContent}
        </div>
        <div style={this.spacerStyle} class="virtual-scroll_spacer" />
      </div>
    );
  }
}
```
