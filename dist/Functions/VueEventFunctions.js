"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitVueEvent = exports.setVueEventListener = void 0;
function setVueEventListener(eventName, listener) {
    return ({ obj, wrapper }) => {
        obj.$on(eventName, listener);
        return wrapper;
    };
}
exports.setVueEventListener = setVueEventListener;
function emitVueEvent(eventName, ...eventData) {
    return ({ obj, wrapper }) => {
        obj.$emit(eventName, ...eventData);
        return wrapper;
    };
}
exports.emitVueEvent = emitVueEvent;
//# sourceMappingURL=VueEventFunctions.js.map