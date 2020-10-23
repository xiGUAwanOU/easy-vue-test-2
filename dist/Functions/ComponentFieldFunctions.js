"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set$ = exports.get$ = exports.invokeMethod = exports.setComputed = exports.getComputed = exports.setData = exports.getData = exports.setProp = exports.getProp = void 0;
const lodash_1 = __importDefault(require("lodash"));
function getProp(field) {
    return ({ obj }) => {
        return lodash_1.default.get(obj.$props, field);
    };
}
exports.getProp = getProp;
function setProp(field, value) {
    return ({ obj, wrapper }) => {
        lodash_1.default.set(obj.$props, field, value);
        return wrapper;
    };
}
exports.setProp = setProp;
function getData(field) {
    return ({ obj }) => {
        return lodash_1.default.get(obj.$data, field);
    };
}
exports.getData = getData;
function setData(field, value) {
    return ({ obj, wrapper }) => {
        lodash_1.default.set(obj.$data, field, value);
        return wrapper;
    };
}
exports.setData = setData;
function getComputed(field) {
    return ({ obj }) => {
        return lodash_1.default.get(obj, field);
    };
}
exports.getComputed = getComputed;
function setComputed(field, value) {
    return ({ obj, wrapper }) => {
        lodash_1.default.set(obj, field, value);
        return wrapper;
    };
}
exports.setComputed = setComputed;
function invokeMethod(field, ...params) {
    return ({ obj }) => {
        return lodash_1.default.get(obj, field)(...params);
    };
}
exports.invokeMethod = invokeMethod;
function get$(field) {
    return ({ obj }) => {
        return lodash_1.default.get(obj.$data, `$${field}`);
    };
}
exports.get$ = get$;
function set$(field, value) {
    return ({ obj, wrapper }) => {
        lodash_1.default.set(obj.$data, `$${field}`, value);
        return wrapper;
    };
}
exports.set$ = set$;
//# sourceMappingURL=ComponentFieldFunctions.js.map