// 封裝 querySelector 與監聽
export const $ = <T extends HTMLElement>(
  elementName: string,
  container?: T
): T | null => {
  const element: T = document.querySelector(elementName)!;

  if (!element) return null;

  element.on = (event, callback) => {
    element.addEventListener(event, callback);
  };

  return element;
};

// 封裝 querySelectorAll
export const $all = <T extends HTMLElement>(
  element: string
): NodeListOf<T> | null => document.querySelectorAll(element);

// 擴展 DOM 增加 on 方法
declare global {
  interface HTMLElement {
    on(event: string, callback: EventListenerOrEventListenerObject): void;
  }
}
