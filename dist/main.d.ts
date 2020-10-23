import Vue from "vue";
import { VueConstructor } from "vue";
import { Action, MultipleAccessor, SingleAccessor, VueComponent, WrappedObject } from "./CommonTypes";
import { childByName, childByRef, childBySelector, childrenByName, childrenBySelector } from "./Functions/ChildComponentFunctions";
import { get$, getComputed, getData, getProp, invokeMethod, set$, setComputed, setData, setProp } from "./Functions/ComponentFieldFunctions";
import { checkElementExistence, element, elements } from "./Functions/ElementFunctions";
import { getInputValue, setInputValue } from "./Functions/FormInteractionFunctions";
import { getInnerHtml, getOuterHtml } from "./Functions/HtmlFunctions";
import { click, KEYS, keyup } from "./Functions/NativeEventFunctions";
import { getTextContent } from "./Functions/TextFunctions";
import { emitVueEvent, setVueEventListener } from "./Functions/VueEventFunctions";
import { getHtmlElement, isVueComponent } from "./Utilities";
export { childByName, childByRef, childBySelector, childrenByName, childrenBySelector, get$, getComputed, getData, getProp, invokeMethod, set$, setComputed, setData, setProp, checkElementExistence, element, elements, getInputValue, setInputValue, getInnerHtml, getOuterHtml, click, KEYS, keyup, getTextContent, emitVueEvent, setVueEventListener, };
export declare const utils: {
    isVueComponent: typeof isVueComponent;
    getHtmlElement: typeof getHtmlElement;
};
interface EasyVueTestConfig {
    extraMixins?: any[];
    defaultOptions?: any;
}
export default class EasyVueTest<T extends WrappedObject = VueComponent> {
    private static _config;
    static configure(newConfig: EasyVueTestConfig): void;
    static mounted(component: VueConstructor<Vue>, options?: any): Promise<EasyVueTest<VueComponent>>;
    static mountedAsMixin(mixin: VueConstructor<Vue>, options?: any): Promise<EasyVueTest<VueComponent>>;
    private _vm;
    private constructor();
    get<U extends WrappedObject>(accessor: SingleAccessor<T, U>): EasyVueTest<U>;
    getAll<U extends WrappedObject>(accessor: MultipleAccessor<T, U>): EasyVueTest<U>[];
    do<U>(action: Action<T, U>): U;
    untilAsyncTasksDone(timeout?: number): Promise<void>;
}
