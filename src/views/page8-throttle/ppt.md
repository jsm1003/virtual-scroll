## 节流限制

requestAnimationFrame throttle VS throttle

```ts
/**
 * Throttle
 * @param action 要被节流的函数
 * @param interval 两次执行 action 的时间间隔（毫秒数）
 */
export function throttle(action: any, interval: number = 16) {
  let context: any;
  let timeoutId: number | undefined;
  let last: number = 0;
  let params: any[];

  function fire() {
    last = Date.now();
    timeoutId = undefined;
    action.apply(context, params);
  }

  function wrapper(this: any, ...args: any[]) {
    const present: number = Date.now();
    context = this;
    params = args;

    if (last + interval < present) {
      last = present;
    }

    if (!timeoutId) {
      timeoutId = setTimeout(fire, last + interval - present);
    }
  }

  return wrapper;
}

/**
 * Throttle with requestAnimationFrame api
 * @param action 要被节流的函数
 */
export function rafThrottle(action: any) {
  let requestId: number | undefined;
  let context: any;
  let params: any;

  function fire() {
    requestId = undefined;
    action.apply(context, params);
  }

  function wrapper(this: any, ...args: any[]) {
    context = this;
    params = args;

    if (!requestId) {
      requestId = requestAnimationFrame(fire);
    }
  }

  return wrapper;
}
```
