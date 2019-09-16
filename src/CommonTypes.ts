import Vue from "vue";
import { CombinedVueInstance } from "vue/types/vue";
import EasyVueTest from "./main";

export type VueComponent = CombinedVueInstance<Record<never, any> & Vue, object, object, object, object>;
export type WrappedElement = VueComponent | Element;

export interface Context<T extends WrappedElement> {
  el: T;
  wrapper: EasyVueTest<T>;
}

export type SingleAccessor<T extends WrappedElement, U extends WrappedElement> = (el: Context<T>) => U;
export type MultipleAccessor<T extends WrappedElement, U extends WrappedElement> = (el: Context<T>) => U[];
export type Action<T extends WrappedElement, U> = (el: Context<T>) => U;

export function isVueComponent(el: WrappedElement): el is VueComponent {
  return "$el" in el || "$options" in el;
}
