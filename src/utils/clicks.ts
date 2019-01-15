/**
 * 模拟双击事件（移动端不支持 dblclick）
 * @param action 执行的方法
 * @param interval 两次单击的时间间隔（毫秒数）
 */
export function doubleClick(action: any, interval: number = 500) {
  let context: any;
  let params: any[];
  let lastClickTime = 0;

  function fire() {
    lastClickTime = 0;
    action.apply(context, params);
  }

  function wrapper(this: any, ...args: any[]) {
    context = this;
    params = args;
    let present = Date.now();
    if (present - lastClickTime < interval) {
      fire();
    } else {
      lastClickTime = present;
    }
  }

  return wrapper;
}
