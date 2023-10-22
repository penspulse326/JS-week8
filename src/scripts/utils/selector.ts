// 封裝 querySelector 與 querySelectorAll
export const $ = <T extends HTMLElement>(element: string, container?: T): T =>
  (container || document).querySelector(element)!;

export const $all = <T extends HTMLElement>(element: string): NodeListOf<T> =>
  document.querySelectorAll(element);
