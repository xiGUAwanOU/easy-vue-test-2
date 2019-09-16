import { Action, isVueComponent, WrappedElement } from "../CommonTypes";

export function getTextContent(): Action<WrappedElement, string> {
  return ({ el }): string => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return element.textContent || "";
  };
}
