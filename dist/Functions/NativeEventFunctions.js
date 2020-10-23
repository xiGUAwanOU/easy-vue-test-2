"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYS = exports.keyup = exports.click = void 0;
const Utilities_1 = require("../Utilities");
function click() {
    return ({ obj, wrapper }) => {
        Utilities_1.getHtmlElement(obj).click();
        return wrapper;
    };
}
exports.click = click;
function keyup(keyAttr = exports.KEYS.ENTER) {
    return ({ obj, wrapper }) => {
        Utilities_1.getHtmlElement(obj).dispatchEvent(new window.KeyboardEvent("keyup", Object.assign(Object.assign({}, keyAttr), { bubbles: true, cancelable: true })));
        return wrapper;
    };
}
exports.keyup = keyup;
exports.KEYS = {
    ENTER: { code: "Enter", key: "Enter", keyCode: 13, location: 0 },
    ESCAPE: { code: "Escape", key: "Escape", keyCode: 27, location: 0 },
    BACKSPACE: { code: "Backspace", key: "Backspace", keyCode: 8, location: 0 },
    SPACE: { code: "Space", key: " ", keyCode: 32, location: 0 },
    ARROW_LEFT: { code: "ArrowLeft", key: "ArrowLeft", keyCode: 37, location: 0 },
    ARROW_UP: { code: "ArrowUp", key: "ArrowUp", keyCode: 38, location: 0 },
    ARROW_RIGHT: { code: "ArrowRight", key: "ArrowRight", keyCode: 39, location: 0 },
    ARROW_DOWN: { code: "ArrowDown", key: "ArrowDown", keyCode: 40, location: 0 },
};
//# sourceMappingURL=NativeEventFunctions.js.map