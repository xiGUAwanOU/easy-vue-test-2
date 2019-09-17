import { Action, WrappedObject } from "../CommonTypes";

export function getWrappedObject<T extends WrappedObject>(): Action<T, T> {
  return ({ obj }) => obj;
}
