import _ from "lodash";
import { MultipleAccessor, SingleAccessor, VueComponent } from "../CommonTypes";
import { element, elements } from "./ElementFunctions";
import { getWrappedObject } from "./HelperFunctions";

export function childByName(componentName: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return getFilteredChildrenByNameRecursively(wrapper.do(getWrappedObject()), componentName)[0];
  };
}

export function childBySelector(selector: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return (wrapper.get(element(selector)).do(getWrappedObject()) as any).__vue__;
  };
}

export function childByRef(ref: string): SingleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return wrapper.do(getWrappedObject()).$refs[ref] as VueComponent;
  };
}

export function childrenByName(componentName: string): MultipleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return getFilteredChildrenByNameRecursively(wrapper.do(getWrappedObject()), componentName);
  };
}

export function childrenBySelector(selector: string): MultipleAccessor<VueComponent, VueComponent> {
  return ({ wrapper }) => {
    return wrapper.getAll(elements(selector)).map((e) => (e.do(getWrappedObject()) as any).__vue__);
  };
}

function getFilteredChildrenByNameRecursively(
  component: VueComponent,
  childComponentName: string,
): VueComponent[] {
  return _.filter(
    getAllChildrenRecursively(component),
    (childComponent) => (childComponent.$options as any)._componentTag === childComponentName,
  );
}

function getAllChildrenRecursively(component: VueComponent): VueComponent[] {
  let children: VueComponent[] = [];

  if (component.$children) {
    component.$children.forEach((child) => {
      children.push(child);
      children = children.concat(getAllChildrenRecursively(child));
    });
  }

  return children;
}
