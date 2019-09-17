import { Action, WrappedObject } from "../CommonTypes";
import { getHtmlElement } from "../Utilities";

export function getInnerHtml(): Action<WrappedObject, string> {
  return ({ obj }): string => {
    return getHtmlElement(obj).innerHTML || "";
  };
}

export function getOuterHtml(): Action<WrappedObject, string> {
  return ({ obj }): string => {
    return getHtmlElement(obj).outerHTML || "";
  };
}
