"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInputValue = exports.getInputValue = void 0;
const Utilities_1 = require("../Utilities");
function getInputValue() {
    return ({ obj }) => {
        return Utilities_1.getHtmlElement(obj).value;
    };
}
exports.getInputValue = getInputValue;
function setInputValue(value) {
    return ({ obj, wrapper }) => {
        const inputElement = Utilities_1.getHtmlElement(obj);
        inputElement.value = value;
        inputElement.dispatchEvent(new Event("input"));
        return wrapper;
    };
}
exports.setInputValue = setInputValue;
//# sourceMappingURL=FormInteractionFunctions.js.map