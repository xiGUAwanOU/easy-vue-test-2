import _ from "lodash";
import { Action, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";

export function getProp<T>(field: string): Action<VueComponent, T> {
  return ({ obj }) => {
    return _.get(obj.$props, field);
  };
}

export function setProp(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }) => {
    _.set(obj.$props, field, value);
    return wrapper;
  };
}

export function getData<T>(field: string): Action<VueComponent, T> {
  return ({ obj }) => {
    return _.get(obj.$data, field);
  };
}

export function setData(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }) => {
    _.set(obj.$data, field, value);
    return wrapper;
  };
}

export function getComputed<T>(field: string): Action<VueComponent, T> {
  return ({ obj }): T => {
    return _.get(obj, field);
  };
}

export function setComputed(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }) => {
    _.set(obj, field, value);
    return wrapper;
  };
}

export function invokeMethod<T>(field: string, ...params: any[]): Action<VueComponent, T> {
  return ({ obj }) => {
    return _.get(obj, field)(...params);
  };
}

export function get$<T>(field: string): Action<VueComponent, T> {
  return ({ obj }) => {
    return _.get(obj.$data, `$${field}`);
  };
}

export function set$(field: string, value: any): Action<VueComponent, EasyVueTest> {
  return ({ obj, wrapper }) => {
    _.set(obj.$data, `$${field}`, value);
    return wrapper;
  };
}
