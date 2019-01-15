// import {
//   Component,
//   Vue,
//   Prop,
//   Inject,
//   Model,
//   Provide,
//   Watch,
// } from 'vue-property-decorator';
// import { CreateElement, VNode } from 'vue';
// import { rafThrottle } from '@/utils';

// import './virtual-scroll4.scss';

// type ListRange = { start: number; end: number };

// @Component
// export class VirtualScroll4 extends Vue {
//   @Prop({ type: Array }) itemSource!: any[];

//   @Prop({ type: Number, required: true }) itemAverager!: number;

//   @Prop({ type: Number, default: 100 }) minBufferPx!: number;

//   @Prop({ type: Number, default: 200 }) maxBufferPx!: number;

//   spacerStyle: any = {};

//   contentWrapperStyle: any = {};

//   renderContent: VNode[] = [];

//   // 可以放到 constructor 里面
//   renderedRange = { start: 0, end: 0 };

//   lastScrollTop = 0;

//   lastRenderedContentSize = 0;

//   lastRenderedContentOffset = 0;

//   _removalFailures = 0;

//   onElementScroll = rafThrottle(this.renderRangeContent);

//   get itemList() {
//     return this.$slots.default || this.itemSource;
//   }

//   get totalContentSize() {
//     return this.itemList.length * this.itemHeight;
//   }

//   setTotalContentSize() {
//     this.spacerStyle = {
//       transform: `scaleY(${this.totalContentSize})`,
//     };
//   }

//   _renderContentForCurrentOffset() {};

//   _expandRange(a:any, b:any, c:any) {}

//   getRenderedRange() {
//     const viewport = this.$el as HTMLDivElement;
//     const scrollTop = viewport.scrollTop;
//     const viewportSize = viewport.offsetHeight;
//     let scrollDelta = scrollTop - this.lastScrollTop;
//     let scrollMagnitude = Math.abs(scrollDelta);
//     const renderedRange = this.renderedRange;
//     let offsetCorrection = 0;
//     if (scrollDelta < 0) {
//       const predictedOffset = renderedRange.start * this.itemAverager;
//       const offsetDifference = predictedOffset - this.lastScrollTop;

//       offsetCorrection = Math.round(
//         offsetDifference *
//           Math.max(0, Math.min(1, scrollMagnitude / (scrollTop + scrollMagnitude))),
//       );
//       scrollDelta = scrollDelta - offsetCorrection;
//       scrollMagnitude = Math.abs(scrollDelta);
//     }

//     const startBuffer = this.lastScrollTop - this.lastRenderedContentOffset;
//     const endBuffer =
//       this.lastRenderedContentOffset +
//       this.lastRenderedContentSize -
//       (this.lastScrollTop + viewportSize);

//     const underscan = scrollMagnitude + this.minBufferPx - (scrollDelta < 0 ? startBuffer: endBuffer);

//     if (underscan > 0) {
//       if (scrollMagnitude >= viewportSize) {
//         this._renderContentForCurrentOffset();
//       } else {
//         const addItems = Math.max(0, Math.ceil((underscan - this.minBufferPx + this.maxBufferPx) / this.itemAverager))
//         const overscan = (scrollDelta < 0 ? endBuffer : startBuffer) - this.minBufferPx + scrollMagnitude;
//         const unboundedRemoveItems = Math.floor(overscan / this.itemAverager) / (this._removalFailures + 1);
//         const removeItems = Math.min(renderedRange.end - renderedRange.start, Math.max(0, unboundedRemoveItems));
//         const range = this._expandRange(renderedRange, scrollDelta < 0 ? addItems: 0, scrollDelta > 0 ? addItems : 0);
//         if (scrollDelta < 0) {
//           range.end = Math.max(range.start + 1, range.end - removeItems);
//         } else {
//           range.start = Math.min(range.end - 1, range.start + removeItems);
//         }

//         let contentOffset: number;
//         let contentOffsetTo: 'to-start' | 'to-end';
//         if (scrollDelta < 0) {
//           let removedSize = viewport.
//         }
//       }
//     }
//   }

//   equalRange(r1: ListRange, r2: ListRange): boolean {
//     return r1.start === r2.start && r1.end === r2.end;
//   }

//   renderRangeContent() {
//     const renderedRange = this.getRenderedRange();
//     if (!this.equalRange(renderedRange, this.renderedRange)) {
//       this.renderedRange = renderedRange;
//       this.renderContent = this.itemList.slice(renderedRange.start, renderedRange.end);
//       this.contentWrapperStyle = {
//         transform: `translateY(${renderedRange.start * this.itemHeight}px)`,
//       };
//     }
//   }

//   mounted() {
//     this.setTotalContentSize();
//     this.renderRangeContent();
//   }

//   render(h: CreateElement) {
//     // TODO
//     return (
//       <div class="virtual-scroll-4" on-scroll={this.onElementScroll}>
//         <div style={this.contentWrapperStyle} class="virtual-scroll-4_content-wrapper">
//           {this.renderContent}
//         </div>
//         <div style={this.spacerStyle} class="virtual-scroll-4_spacer" />
//       </div>
//     );
//   }
// }
