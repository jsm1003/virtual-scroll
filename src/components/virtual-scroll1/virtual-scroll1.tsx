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

import './virtual-scroll1.scss';

type ListRange = { start: number; end: number };

/**
 * 基本实现
 */
@Component
export class VirtualScroll1 extends Vue {
  @Prop({ type: Array }) itemSource!: any[];

  @Prop({ type: Number, required: true }) itemHeight!: number;

  spacerStyle: any = {};

  contentWrapperStyle: any = {};

  renderContent: VNode[] = [];

  onElementScroll = rafThrottle(this.renderRangeContent);

  get itemList() {
    return this.$slots.default || this.itemSource;
  }

  get TotalContentSize() {
    const totalItems = this.$slots.default || this.itemSource;
    return this.itemHeight * totalItems.length;
  }

  setTotalContentSize() {
    const totalContentSize = this.TotalContentSize;
    this.spacerStyle = {
      transform: `scaleY(${totalContentSize})`,
    };
  }

  getRenderedRange() {
    const viewportEl = this.$el as HTMLElement;
    const range: ListRange = { start: 0, end: 0 };

    range.start = Math.floor(viewportEl.scrollTop / this.itemHeight);
    range.end = Math.ceil(
      (viewportEl.scrollTop + viewportEl.offsetHeight) / this.itemHeight,
    );

    return range;
  }

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
      <div class="virtual-scroll-1" on-scroll={this.onElementScroll}>
        <div style={this.contentWrapperStyle} class="virtual-scroll-1_content-wrapper">
          {this.renderContent}
        </div>
        <div style={this.spacerStyle} class="virtual-scroll-1_spacer" />
      </div>
    );
  }
}
