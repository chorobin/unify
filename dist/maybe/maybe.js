"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nothing_1 = require("./nothing");
exports.isMaybe = function (couldBeMaybe) { return couldBeMaybe.isNothing !== undefined; };
exports.isNothing = function (maybe) { return maybe === nothing_1.nothing; };
exports.maybe = function (get) { return get ? { get: get } : nothing_1.nothing; };
exports.fold = function (ifJust, ifNothing) { return function (maybe) {
    return exports.isNothing(maybe) ? ifNothing : ifJust(maybe.get);
}; };
exports.map = function (f) { return exports.fold(function (get) { return exports.maybe(f(get)); }, nothing_1.nothing); };
exports.flatMap = function (f) { return exports.fold(f, nothing_1.nothing); };
