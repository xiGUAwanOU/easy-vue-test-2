import { Action, isVueComponent, WrappedElement } from "../CommonTypes";
import EasyVueTest from "../main";

export function click<T extends WrappedElement>(): Action<T, EasyVueTest<T>> {
  return ({ el, wrapper }): EasyVueTest<T> => {
    const element = (isVueComponent(el) ? el.$el : el) as HTMLElement;
    element.click();
    return wrapper;
  };
}

export function keyup<T extends WrappedElement>(key: keyof typeof KEY_ATTR = "Enter"): Action<T, EasyVueTest<T>> {
  return ({ el, wrapper }): EasyVueTest<T> => {
    const element = (isVueComponent(el) ? el.$el : el) as HTMLElement;
    element.dispatchEvent(new window.KeyboardEvent("keyup", {
      ...getKeyAttr(key),
      bubbles: true,
      cancelable: true,
    } as any));
    return wrapper;
  };
}

function getKeyAttr(key: keyof typeof KEY_ATTR) {
  return KEY_ATTR[key];
}

const KEY_ATTR = {
  "Backspace": { key: "Backspace", location: 0, keyCode: 8, code: "Backspace" },
  "Enter": { key: "Enter", location: 0, keyCode: 13, code: "Enter" },
  "Escape": { key: "Escape", location: 0, keyCode: 27, code: "Escape" },
  " ": { key: " ", location: 0, keyCode: 32, code: "Space" },
  "ArrowLeft": { key: "ArrowLeft", location: 0, keyCode: 37, code: "ArrowLeft" },
  "ArrowUp": { key: "ArrowUp", location: 0, keyCode: 38, code: "ArrowUp" },
  "ArrowRight": { key: "ArrowRight", location: 0, keyCode: 39, code: "ArrowRight" },
  "ArrowDown": { key: "ArrowDown", location: 0, keyCode: 40, code: "ArrowDown" },
};
