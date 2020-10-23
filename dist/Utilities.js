"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlElement = exports.isVueComponent = void 0;
function isVueComponent(obj) {
    return "$el" in obj || "$options" in obj;
}
exports.isVueComponent = isVueComponent;
function getHtmlElement(obj) {
    return (isVueComponent(obj) ? obj.$el : obj);
}
exports.getHtmlElement = getHtmlElement;
//# sourceMappingURL=Utilities.js.map