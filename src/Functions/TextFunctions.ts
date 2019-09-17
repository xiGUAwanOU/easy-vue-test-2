import { Action, WrappedObject } from "../CommonTypes";
import { getHtmlElement } from "../Utilities";

export function getTextContent(): Action<WrappedObject, string> {
  return ({ obj }) => {
    return getHtmlElement(obj).textContent || "";
  };
}
