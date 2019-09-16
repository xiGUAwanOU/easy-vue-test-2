import { Action, isVueComponent, MultipleAccessor, SingleAccessor, WrappedElement } from "../CommonTypes";

export function dom<T extends Element>(selector: string): SingleAccessor<WrappedElement, T> {
  return ({ el }): T => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return element.querySelector(selector) as T;
  };
}

export function doms<T extends Element>(selector: string): MultipleAccessor<WrappedElement, T> {
  return ({ el }): T[] => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return Array.from(element.querySelectorAll(selector)) as T[];
  };
}

export function checkDomExistence(selector: string): Action<WrappedElement, boolean> {
  return ({ el }): boolean => {
    const element = isVueComponent(el) ? el.$el : el as Element;
    return !!element.querySelector(selector);
  };
}
