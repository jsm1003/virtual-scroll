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
import { rafThrottle } from '@/utils';

import './virtual-scroll3.scss';

type ListRange = { start: number; end: number };

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

  equalRange(r1: ListRange, r2: ListRange): boolean {
    return r1.start === r2.start && r1.end === r2.end;
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
    if (!this.equalRange(renderedRange, this.renderedRange)) {
      this.renderedRange = renderedRange;
      this.renderContent = this.itemList.slice(renderedRange.start, renderedRange.end);
      this.contentWrapperStyle = {
        transform: `translateY(${renderedRange.start * this.itemHeight}px)`,
      };
    }
  }

  mounted() {
    this.setTotalContentSize();
    this.renderRangeContent();
  }

  render(h: CreateElement) {
    // TODO
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
