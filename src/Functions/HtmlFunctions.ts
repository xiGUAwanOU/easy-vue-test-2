import { Action, isVueComponent, WrappedElement } from "../CommonTypes";

export function getInnerHtml(): Action<WrappedElement, string> {
  return ({ el }): string => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return element.innerHTML || "";
  };
}

export function getOuterHtml(): Action<WrappedElement, string> {
  return ({ el }): string => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return element.outerHTML || "";
  };
}
