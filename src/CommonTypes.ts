import Vue from "vue";
import { CombinedVueInstance } from "vue/types/vue";
import EasyVueTest from "./main";

export type VueComponent = CombinedVueInstance<Record<never, any> & Vue, object, object, object, object>;
export type WrappedObject = VueComponent | HTMLElement;

export interface Context<T extends WrappedObject> {
  obj: T;
  wrapper: EasyVueTest<T>;
}

export type SingleAccessor<T extends WrappedObject, U extends WrappedObject> = (context: Context<T>) => U;
export type MultipleAccessor<T extends WrappedObject, U extends WrappedObject> = (context: Context<T>) => U[];
export type Action<T extends WrappedObject, U> = (context: Context<T>) => U;
