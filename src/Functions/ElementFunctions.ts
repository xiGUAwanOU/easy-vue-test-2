import { Action, MultipleAccessor, SingleAccessor, WrappedObject } from "../CommonTypes";
import { getHtmlElement } from "../Utilities";

export function element(selector: string): SingleAccessor<WrappedObject, HTMLElement> {
  return ({ obj }) => {
    return getHtmlElement(obj).querySelector(selector)! as HTMLElement;
  };
}

export function elements(selector: string): MultipleAccessor<WrappedObject, HTMLElement> {
  return ({ obj }) => {
    return Array.from(getHtmlElement(obj).querySelectorAll(selector));
  };
}

export function checkElementExistence(selector: string): Action<WrappedObject, boolean> {
  return ({ obj }) => {
    return !!getHtmlElement(obj).querySelector(selector);
  };
}
