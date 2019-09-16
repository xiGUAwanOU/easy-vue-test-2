import _ from "lodash";

import { Action, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";

export function getProp<T>(field: string): Action<VueComponent, T> {
  return ({ el }): T => {
    return _.get(el.$props, field);
  };
}

export function getData<T>(field: string): Action<VueComponent, T> {
  return ({ el }): T => {
    return _.get(el.$data, field);
  };
}

export function setData(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ el, wrapper }): EasyVueTest => {
    _.set(el.$data, field, value);
    return wrapper;
  };
}

export function getComputed<T>(field: string): Action<VueComponent, T> {
  return ({ el }): T => {
    return _.get(el, field);
  };
}

export function setComputed(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ el, wrapper }): EasyVueTest => {
    _.set(el, field, value);
    return wrapper;
  };
}

export function invokeMethod<T>(field: string, ...params: any[]): Action<VueComponent, T> {
  return ({ el }): T => {
    return _.get(el, field)(...params);
  };
}

export function get$<T>(field: string): Action<VueComponent, T> {
  return ({ el }): T => {
    return _.get(el.$data, `$${field}`);
  };
}

export function set$(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ el, wrapper }): EasyVueTest => {
    _.set(el.$data, `$${field}`, value);
    return wrapper;
  };
}
