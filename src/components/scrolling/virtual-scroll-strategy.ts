/** A strategy that dictates which items should be rendered in the viewport. */
export interface VirtualScrollStrategy {
  /** Called when the viewport is scrolled (debounced using requestAnimationFrame). */
  onContentScrolled(): void;

  /** Called when the length of the data changes. */
  onDataLengthChanged(): void;

  /** Called when the range of items rendered in the DOM has changed. */
  onContentRendered(): void;

  /** Called when the offset of the rendered items chanegs. */
  onRenderedOffsetChanged(): void;

  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index: number, behavior: ScrollBehavior): void;
}
