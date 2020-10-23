import { Action, WrappedObject } from "../CommonTypes";
import EasyVueTest from "../main";
interface KeyAttribute {
    code: string;
    key: string;
    keyCode: number;
    location: number;
}
export declare function click(): Action<WrappedObject, EasyVueTest<WrappedObject>>;
export declare function keyup(keyAttr?: KeyAttribute): Action<WrappedObject, EasyVueTest<WrappedObject>>;
export declare const KEYS: {
    [name: string]: KeyAttribute;
};
export {};
