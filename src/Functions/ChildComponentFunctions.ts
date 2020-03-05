import { MultipleAccessor, SingleAccessor, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";
import { element, elements } from "./ElementFunctions";
import { getWrappedObject } from "./HelperFunctions";

export function childByName(name: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return findComponentByName(getAllChildrenComponents(wrapper), name);
  };
}

export function childBySelector(selector: string, name?: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    const component = getOneComponentBySelector(wrapper, selector);
    return name ? findComponentByName(getAllComponentsWithSameEl(component), name) : component;
  };
}

export function childByRef(ref: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return wrapper.do(getWrappedObject()).$refs[ref] as VueComponent;
  };
}

export function childrenByName(name: string): MultipleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return filterComponentsByName(getAllChildrenComponents(wrapper), name);
  };
}

export function childrenBySelector(selector: string, name?: string): MultipleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return getAllComponentsBySelector(wrapper, selector)
      .map((component) => name ? findComponentByName(getAllComponentsWithSameEl(component), name) : component);
  };
}

function getOneComponentBySelector(wrapper: EasyVueTest<VueComponent>, selector: string): VueComponent {
  return (wrapper.get(element(selector)).do(getWrappedObject()) as any).__vue__;
}

function getAllComponentsBySelector(wrapper: EasyVueTest<VueComponent>, selector: string): VueComponent[] {
  return wrapper.getAll(elements(selector)).map((e) => (e.do(getWrappedObject()) as any).__vue__);
}

function getAllChildrenComponents(wrapper: EasyVueTest<VueComponent>): VueComponent[] {
  return getAllChildrenComponentsRecursively(wrapper.do(getWrappedObject()));
}

function getAllComponentsWithSameEl(component: VueComponent): VueComponent[] {
  const componentsWithSameEl: VueComponent[] = [component];

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

function getAllChildrenComponentsRecursively(component: VueComponent): VueComponent[] {
  let children: VueComponent[] = [];

  if (component.$children) {
    component.$children.forEach((child) => {
      children.push(child);
      children = children.concat(getAllChildrenComponentsRecursively(child));
    });
  }

  return children;
}

function findComponentByName(components: VueComponent[], name: string): VueComponent {
  return components.find((component) => (component.$options as any)._componentTag === name)!;
}

function filterComponentsByName(components: VueComponent[], name: string): VueComponent[] {
  return components.filter((component) => (component.$options as any)._componentTag === name);
}
