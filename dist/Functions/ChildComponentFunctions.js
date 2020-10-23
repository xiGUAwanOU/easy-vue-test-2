"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childrenBySelector = exports.childrenByName = exports.childByRef = exports.childBySelector = exports.childByName = void 0;
const ElementFunctions_1 = require("./ElementFunctions");
const HelperFunctions_1 = require("./HelperFunctions");
function childByName(name) {
    return ({ wrapper }) => {
        return findComponentByName(getAllChildrenComponents(wrapper), name);
    };
}
exports.childByName = childByName;
function childBySelector(selector, name) {
    return ({ wrapper }) => {
        const component = getOneComponentBySelector(wrapper, selector);
        return name ? findComponentByName(getAllComponentsWithSameEl(component), name) : component;
    };
}
exports.childBySelector = childBySelector;
function childByRef(ref) {
    return ({ wrapper }) => {
        return wrapper.do(HelperFunctions_1.getWrappedObject()).$refs[ref];
    };
}
exports.childByRef = childByRef;
function childrenByName(name) {
    return ({ wrapper }) => {
        return filterComponentsByName(getAllChildrenComponents(wrapper), name);
    };
}
exports.childrenByName = childrenByName;
function childrenBySelector(selector, name) {
    return ({ wrapper }) => {
        return getAllComponentsBySelector(wrapper, selector)
            .map((component) => name ? findComponentByName(getAllComponentsWithSameEl(component), name) : component);
    };
}
exports.childrenBySelector = childrenBySelector;
function getOneComponentBySelector(wrapper, selector) {
    return wrapper.get(ElementFunctions_1.element(selector)).do(HelperFunctions_1.getWrappedObject()).__vue__;
}
function getAllComponentsBySelector(wrapper, selector) {
    return wrapper.getAll(ElementFunctions_1.elements(selector)).map((e) => e.do(HelperFunctions_1.getWrappedObject()).__vue__);
}
function getAllChildrenComponents(wrapper) {
    return getAllChildrenComponentsRecursively(wrapper.do(HelperFunctions_1.getWrappedObject()));
}
function getAllComponentsWithSameEl(component) {
    const componentsWithSameEl = [component];
    let currentComponent = component;
    while (currentComponent.$parent && currentComponent.$parent.$el === currentComponent.$el) {
        componentsWithSameEl.push(currentComponent.$parent);
        currentComponent = currentComponent.$parent;
    }
    currentComponent = component;
    while (currentComponent.$children.length === 1 && currentComponent.$children[0].$el === currentComponent.$el) {
        componentsWithSameEl.push(currentComponent.$children[0]);
        currentComponent = currentComponent.$children[0];
    }
    return componentsWithSameEl;
}
function getAllChildrenComponentsRecursively(component) {
    let children = [];
    if (component.$children) {
        component.$children.forEach((child) => {
            children.push(child);
            children = children.concat(getAllChildrenComponentsRecursively(child));
        });
    }
    return children;
}
function findComponentByName(components, name) {
    return components.find((component) => component.$options._componentTag === name);
}
function filterComponentsByName(components, name) {
    return components.filter((component) => component.$options._componentTag === name);
}
//# sourceMappingURL=ChildComponentFunctions.js.map