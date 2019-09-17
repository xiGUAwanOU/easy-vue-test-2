import { Action } from "../CommonTypes";
import EasyVueTest from "../main";
import { getHtmlElement } from "../Utilities";

export function getInputValue(): Action<HTMLElement, string> {
  return ({ obj }) => {
    return (getHtmlElement(obj) as HTMLInputElement).value;
  };
}

export function setInputValue(value: string): Action<HTMLElement, EasyVueTest<HTMLElement>> {
  return ({ obj, wrapper }) => {
    const inputElement = getHtmlElement(obj) as HTMLInputElement;
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("input"));

    return wrapper;
  };
}
