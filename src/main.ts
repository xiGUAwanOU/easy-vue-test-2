import _ from "lodash";
import Vue from "vue";
import { VueConstructor } from "vue";

import { Action, MultipleAccessor, SingleAccessor, VueComponent, WrappedElement } from "./CommonTypes";

import { get$, getComputed, getData, getProp, invokeMethod, set$, setComputed, setData, setProp } from "./Functions/ComponentFieldFunctions";
import { checkDomExistence, dom, doms } from "./Functions/DomFunctions";
import { getInnerHtml, getOuterHtml } from "./Functions/HtmlFunctions";
import { click, keyup } from "./Functions/NativeEventFunctions";
import { getTextContent } from "./Functions/TextFunctions";

export {
  get$, getComputed, getData, getProp, invokeMethod, set$, setComputed, setData, setProp,
  dom, doms, checkDomExistence,
  getInnerHtml, getOuterHtml,
  click, keyup,
  getTextContent,
};

interface EasyVueTestConfig {
  extraMixins?: any[];
  defaultOptions?: any;
}

export default class EasyVueTest<T extends WrappedElement = VueComponent> {
  private static _config: EasyVueTestConfig = {
    defaultOptions: {},
    extraMixins: [],
  };

  public static configure(newConfig: EasyVueTestConfig) {
    Object.assign(EasyVueTest._config, newConfig);
  }

  public static mounted(component: VueConstructor<Vue>, options?: any): Promise<EasyVueTest<VueComponent>> {
    const clonedVue = cloneVue(Vue);

    const defaultOptions = (typeof EasyVueTest._config.defaultOptions === "function")
      ? EasyVueTest._config.defaultOptions()
      : EasyVueTest._config.defaultOptions;
    const resultantOptions = Object.assign({}, defaultOptions, options);

    if (resultantOptions.stubs) {
      component.mixin({
        beforeCreate() { Object.assign(this.$options.components, resultantOptions.stubs); },
      });
    }

    const Ctor = clonedVue.extend(component);
    const vm = new Ctor(resultantOptions);
    vm.$mount();

    return new Promise((resolve) => {
      setTimeout(() => { resolve(new EasyVueTest(vm)); }, 0);
    });
  }

  public static mountedAsMixin(mixin: VueConstructor<Vue>, options?: any): Promise<EasyVueTest<VueComponent>> {
    const component = Vue.component("MixinComponent", {
      render: (h) => h(),
      mixins: [mixin],
    });

    return EasyVueTest.mounted(component, options);
  }

  private _vm: T;

  private constructor(vm: T) {
    this._vm = vm;
  }

  public get<U extends WrappedElement>(accessor: SingleAccessor<T, U>): EasyVueTest<U> {
    return new EasyVueTest(accessor({ el: this._vm, wrapper: this }));
  }

  public getAll<U extends WrappedElement>(accessor: MultipleAccessor<T, U>): EasyVueTest<U>[] {
    return accessor({ el: this._vm, wrapper: this }).map((el) => new EasyVueTest(el));
  }

  public do<U>(action: Action<T, U>): U {
    return action({ el: this._vm, wrapper: this });
  }

  public untilAsyncTasksDone(timeout?: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout || 0);
    });
  }
}

function cloneVue(originalVue: any): VueConstructor<Vue> {
  // _.cloneDeep won't work for Vue instance.
  // This implementation is simply stolen from the official vue-test-utils.
  // See https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/src/create-local-vue.js
  const clonedVue: any = originalVue.extend();

  Object.keys(originalVue).forEach((key) => {
    if (!clonedVue.hasOwnProperty(key)) {
      const original = originalVue[key];
      try {
        clonedVue[key] = typeof original === "object"
          ? _.cloneDeep(original)
          : original;
      } catch (e) {
        clonedVue[key] = original;
      }
    }
  });

  clonedVue.config = _.cloneDeep(originalVue.config);
  clonedVue.config.errorHandler = originalVue.config.errorHandler;
  clonedVue.config.optionMergeStrategies = originalVue.config.optionMergeStrategies;
  clonedVue.options._base = clonedVue;

  if (clonedVue._installedPlugins && clonedVue._installedPlugins.length) {
    clonedVue._installedPlugins.length = 0;
  }
  const use = clonedVue.use;
  clonedVue.use = (plugin: any, ...rest: any[]) => {
    if (plugin.installed === true) {
      plugin.installed = false;
    }
    if (plugin.install && plugin.install.installed === true) {
      plugin.install.installed = false;
    }
    use.call(clonedVue, plugin, ...rest);
  };

  return clonedVue;
}
