"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextContent = void 0;
const Utilities_1 = require("../Utilities");
function getTextContent() {
    return ({ obj }) => {
        return Utilities_1.getHtmlElement(obj).textContent || "";
    };
}
exports.getTextContent = getTextContent;
//# sourceMappingURL=TextFunctions.js.map