import { MultipleAccessor, SingleAccessor, VueComponent } from "../CommonTypes";
export declare function childByName(name: string): SingleAccessor<VueComponent, VueComponent>;
export declare function childBySelector(selector: string, name?: string): SingleAccessor<VueComponent, VueComponent>;
export declare function childByRef(ref: string): SingleAccessor<VueComponent, VueComponent>;
export declare function childrenByName(name: string): MultipleAccessor<VueComponent, VueComponent>;
export declare function childrenBySelector(selector: string, name?: string): MultipleAccessor<VueComponent, VueComponent>;
