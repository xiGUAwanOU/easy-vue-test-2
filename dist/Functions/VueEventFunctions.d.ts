import { Action, VueComponent } from "../CommonTypes";
import EasyVueTest from "../main";
export declare function setVueEventListener(eventName: string, listener: any): Action<VueComponent, EasyVueTest>;
export declare function emitVueEvent(eventName: string, ...eventData: any[]): Action<VueComponent, EasyVueTest>;
