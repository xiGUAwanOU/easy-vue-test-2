import { Action, isVueComponent, WrappedElement } from "../CommonTypes";
import EasyVueTest from "../main";

interface KeyAttribute {
  code: string;
  key: string;
  keyCode: number;
  location: number;
}

export function click<T extends WrappedElement>(): Action<T, EasyVueTest<T>> {
  return ({ el, wrapper }): EasyVueTest<T> => {
    const element = (isVueComponent(el) ? el.$el : el) as HTMLElement;
    element.click();
    return wrapper;
  };
}

export function keyup<T extends WrappedElement>(keyAttr: KeyAttribute = KEYS.ENTER): Action<T, EasyVueTest<T>> {
  return ({ el, wrapper }): EasyVueTest<T> => {
    const element = (isVueComponent(el) ? el.$el : el) as HTMLElement;
    element.dispatchEvent(new window.KeyboardEvent("keyup", {
      ...keyAttr,
      bubbles: true,
      cancelable: true,
    } as any));
    return wrapper;
  };
}

export const KEYS: { [name: string]: KeyAttribute } = {
  ENTER: { code: "Enter", key: "Enter", keyCode: 13, location: 0 },
  ESCAPE: { code: "Escape", key: "Escape", keyCode: 27, location: 0 },
  BACKSPACE: { code: "Backspace", key: "Backspace", keyCode: 8, location: 0 },
  SPACE: { code: "Space", key: " ", keyCode: 32, location: 0 },
  ARROW_LEFT: { code: "ArrowLeft", key: "ArrowLeft", keyCode: 37, location: 0 },
  ARROW_UP: { code: "ArrowUp", key: "ArrowUp", keyCode: 38, location: 0 },
  ARROW_RIGHT: { code: "ArrowRight", key: "ArrowRight", keyCode: 39, location: 0 },
  ARROW_DOWN: { code: "ArrowDown", key: "ArrowDown", keyCode: 40, location: 0 },
};
