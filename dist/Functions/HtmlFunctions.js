"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOuterHtml = exports.getInnerHtml = void 0;
const Utilities_1 = require("../Utilities");
function getInnerHtml() {
    return ({ obj }) => {
        return Utilities_1.getHtmlElement(obj).innerHTML || "";
    };
}
exports.getInnerHtml = getInnerHtml;
function getOuterHtml() {
    return ({ obj }) => {
        return Utilities_1.getHtmlElement(obj).outerHTML || "";
    };
}
exports.getOuterHtml = getOuterHtml;
//# sourceMappingURL=HtmlFunctions.js.map