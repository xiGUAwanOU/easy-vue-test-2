"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.setVueEventListener = exports.emitVueEvent = exports.getTextContent = exports.keyup = exports.KEYS = exports.click = exports.getOuterHtml = exports.getInnerHtml = exports.setInputValue = exports.getInputValue = exports.elements = exports.element = exports.checkElementExistence = exports.setProp = exports.setData = exports.setComputed = exports.set$ = exports.invokeMethod = exports.getProp = exports.getData = exports.getComputed = exports.get$ = exports.childrenBySelector = exports.childrenByName = exports.childBySelector = exports.childByRef = exports.childByName = void 0;
const lodash_1 = __importDefault(require("lodash"));
const vue_1 = __importDefault(require("vue"));
const ChildComponentFunctions_1 = require("./Functions/ChildComponentFunctions");
Object.defineProperty(exports, "childByName", { enumerable: true, get: function () { return ChildComponentFunctions_1.childByName; } });
Object.defineProperty(exports, "childByRef", { enumerable: true, get: function () { return ChildComponentFunctions_1.childByRef; } });
Object.defineProperty(exports, "childBySelector", { enumerable: true, get: function () { return ChildComponentFunctions_1.childBySelector; } });
Object.defineProperty(exports, "childrenByName", { enumerable: true, get: function () { return ChildComponentFunctions_1.childrenByName; } });
Object.defineProperty(exports, "childrenBySelector", { enumerable: true, get: function () { return ChildComponentFunctions_1.childrenBySelector; } });
const ComponentFieldFunctions_1 = require("./Functions/ComponentFieldFunctions");
Object.defineProperty(exports, "get$", { enumerable: true, get: function () { return ComponentFieldFunctions_1.get$; } });
Object.defineProperty(exports, "getComputed", { enumerable: true, get: function () { return ComponentFieldFunctions_1.getComputed; } });
Object.defineProperty(exports, "getData", { enumerable: true, get: function () { return ComponentFieldFunctions_1.getData; } });
Object.defineProperty(exports, "getProp", { enumerable: true, get: function () { return ComponentFieldFunctions_1.getProp; } });
Object.defineProperty(exports, "invokeMethod", { enumerable: true, get: function () { return ComponentFieldFunctions_1.invokeMethod; } });
Object.defineProperty(exports, "set$", { enumerable: true, get: function () { return ComponentFieldFunctions_1.set$; } });
Object.defineProperty(exports, "setComputed", { enumerable: true, get: function () { return ComponentFieldFunctions_1.setComputed; } });
Object.defineProperty(exports, "setData", { enumerable: true, get: function () { return ComponentFieldFunctions_1.setData; } });
Object.defineProperty(exports, "setProp", { enumerable: true, get: function () { return ComponentFieldFunctions_1.setProp; } });
const ElementFunctions_1 = require("./Functions/ElementFunctions");
Object.defineProperty(exports, "checkElementExistence", { enumerable: true, get: function () { return ElementFunctions_1.checkElementExistence; } });
Object.defineProperty(exports, "element", { enumerable: true, get: function () { return ElementFunctions_1.element; } });
Object.defineProperty(exports, "elements", { enumerable: true, get: function () { return ElementFunctions_1.elements; } });
const FormInteractionFunctions_1 = require("./Functions/FormInteractionFunctions");
Object.defineProperty(exports, "getInputValue", { enumerable: true, get: function () { return FormInteractionFunctions_1.getInputValue; } });
Object.defineProperty(exports, "setInputValue", { enumerable: true, get: function () { return FormInteractionFunctions_1.setInputValue; } });
const HtmlFunctions_1 = require("./Functions/HtmlFunctions");
Object.defineProperty(exports, "getInnerHtml", { enumerable: true, get: function () { return HtmlFunctions_1.getInnerHtml; } });
Object.defineProperty(exports, "getOuterHtml", { enumerable: true, get: function () { return HtmlFunctions_1.getOuterHtml; } });
const NativeEventFunctions_1 = require("./Functions/NativeEventFunctions");
Object.defineProperty(exports, "click", { enumerable: true, get: function () { return NativeEventFunctions_1.click; } });
Object.defineProperty(exports, "KEYS", { enumerable: true, get: function () { return NativeEventFunctions_1.KEYS; } });
Object.defineProperty(exports, "keyup", { enumerable: true, get: function () { return NativeEventFunctions_1.keyup; } });
const TextFunctions_1 = require("./Functions/TextFunctions");
Object.defineProperty(exports, "getTextContent", { enumerable: true, get: function () { return TextFunctions_1.getTextContent; } });
const VueEventFunctions_1 = require("./Functions/VueEventFunctions");
Object.defineProperty(exports, "emitVueEvent", { enumerable: true, get: function () { return VueEventFunctions_1.emitVueEvent; } });
Object.defineProperty(exports, "setVueEventListener", { enumerable: true, get: function () { return VueEventFunctions_1.setVueEventListener; } });
const Utilities_1 = require("./Utilities");
exports.utils = {
    isVueComponent: Utilities_1.isVueComponent,
    getHtmlElement: Utilities_1.getHtmlElement,
};
class EasyVueTest {
    constructor(vm) {
        this._vm = vm;
    }
    static configure(newConfig) {
        Object.assign(EasyVueTest._config, newConfig);
    }
    static mounted(component, options) {
        const clonedVue = cloneVue(vue_1.default);
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
    static mountedAsMixin(mixin, options) {
        const component = vue_1.default.component("MixinComponent", {
            render: (h) => h(),
            mixins: [mixin],
        });
        return EasyVueTest.mounted(component, options);
    }
    get(accessor) {
        return new EasyVueTest(accessor({ obj: this._vm, wrapper: this }));
    }
    getAll(accessor) {
        return accessor({ obj: this._vm, wrapper: this }).map((el) => new EasyVueTest(el));
    }
    do(action) {
        return action({ obj: this._vm, wrapper: this });
    }
    untilAsyncTasksDone(timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout || 0);
        });
    }
}
exports.default = EasyVueTest;
EasyVueTest._config = {
    defaultOptions: {},
    extraMixins: [],
};
function cloneVue(originalVue) {
    // _.cloneDeep won't work for Vue instance.
    // This implementation is simply stolen from the official vue-test-utils.
    // See https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/src/create-local-vue.js
    const clonedVue = originalVue.extend();
    Object.keys(originalVue).forEach((key) => {
        if (!clonedVue.hasOwnProperty(key)) {
            const original = originalVue[key];
            try {
                clonedVue[key] = typeof original === "object"
                    ? lodash_1.default.cloneDeep(original)
                    : original;
            }
            catch (e) {
                clonedVue[key] = original;
            }
        }
    });
    clonedVue.config = lodash_1.default.cloneDeep(originalVue.config);
    clonedVue.config.errorHandler = originalVue.config.errorHandler;
    clonedVue.config.optionMergeStrategies = originalVue.config.optionMergeStrategies;
    clonedVue.options._base = clonedVue;
    if (clonedVue._installedPlugins && clonedVue._installedPlugins.length) {
        clonedVue._installedPlugins.length = 0;
    }
    const use = clonedVue.use;
    clonedVue.use = (plugin, ...rest) => {
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
//# sourceMappingURL=main.js.map