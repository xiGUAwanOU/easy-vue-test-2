import { Action, MultipleAccessor, SingleAccessor, WrappedObject } from "../CommonTypes";
export declare function element(selector: string): SingleAccessor<WrappedObject, HTMLElement>;
export declare function elements(selector: string): MultipleAccessor<WrappedObject, HTMLElement>;
export declare function checkElementExistence(selector: string): Action<WrappedObject, boolean>;
