import { VueComponent, WrappedObject } from "./CommonTypes";

export function isVueComponent(obj: WrappedObject): obj is VueComponent {
  return "$el" in obj || "$options" in obj;
}

export function getHtmlElement(obj: WrappedObject): HTMLElement {
  return (isVueComponent(obj) ? obj.$el : obj) as HTMLElement;
}
