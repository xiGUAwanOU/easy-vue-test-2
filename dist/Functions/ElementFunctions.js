"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkElementExistence = exports.elements = exports.element = void 0;
const Utilities_1 = require("../Utilities");
function element(selector) {
    return ({ obj }) => {
        return Utilities_1.getHtmlElement(obj).querySelector(selector);
    };
}
exports.element = element;
function elements(selector) {
    return ({ obj }) => {
        return Array.from(Utilities_1.getHtmlElement(obj).querySelectorAll(selector));
    };
}
exports.elements = elements;
function checkElementExistence(selector) {
    return ({ obj }) => {
        return !!Utilities_1.getHtmlElement(obj).querySelector(selector);
    };
}
exports.checkElementExistence = checkElementExistence;
//# sourceMappingURL=ElementFunctions.js.map