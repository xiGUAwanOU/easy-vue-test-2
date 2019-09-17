import { Action, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";

export function setVueEventListener(eventName: string, listener: any): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }): EasyVueTest => {
    obj.$on(eventName, listener);
    return wrapper;
  };
}

export function emitVueEvent(eventName: string, ...eventData: any[]): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }): EasyVueTest => {
    obj.$emit(eventName, ...eventData);
    return wrapper;
  };
}
