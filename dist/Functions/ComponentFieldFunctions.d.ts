import { Action, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";
export declare function getProp<T>(field: string): Action<VueComponent, T>;
export declare function setProp(field: string, value: any): Action<VueComponent, EasyVueTest>;
export declare function getData<T>(field: string): Action<VueComponent, T>;
export declare function setData(field: string, value: any): Action<VueComponent, EasyVueTest>;
export declare function getComputed<T>(field: string): Action<VueComponent, T>;
export declare function setComputed(field: string, value: any): Action<VueComponent, EasyVueTest>;
export declare function invokeMethod<T>(field: string, ...params: any[]): Action<VueComponent, T>;
export declare function get$<T>(field: string): Action<VueComponent, T>;
export declare function set$(field: string, value: any): Action<VueComponent, EasyVueTest>;
