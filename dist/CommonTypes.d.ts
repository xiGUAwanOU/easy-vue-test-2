import Vue from "vue";
import { CombinedVueInstance } from "vue/types/vue";
import EasyVueTest from "./main";
export declare type VueComponent = CombinedVueInstance<Record<never, any> & Vue, object, object, object, object>;
export declare type WrappedObject = VueComponent | HTMLElement;
export interface Context<T extends WrappedObject> {
    obj: T;
    wrapper: EasyVueTest<T>;
}
export declare type SingleAccessor<T extends WrappedObject, U extends WrappedObject> = (context: Context<T>) => U;
export declare type MultipleAccessor<T extends WrappedObject, U extends WrappedObject> = (context: Context<T>) => U[];
export declare type Action<T extends WrappedObject, U> = (context: Context<T>) => U;
