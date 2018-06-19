"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var immutable_1 = require("immutable");
var maybe_1 = require("../maybe");
var flatMapArray = function (f) { return function (arr) { return arr.reduce(function (acc, current) { return acc.concat(f(current)); }, []); }; };
exports.flatMap = function (f) { return function (monad) {
    var result;
    if (rxjs_1.isObservable(monad)) {
        result = operators_1.flatMap(f)(monad);
    }
    else if (immutable_1.Iterable.isIterable(monad)) {
        result = monad.flatMap(f);
    }
    else if (maybe_1.isMaybe(monad)) {
        result = maybe_1.flatMap(f)(monad);
    }
    else if (Array.isArray(monad)) {
        result = flatMapArray(f)(monad);
    }
    else {
        throw new Error('Invalid type');
    }
    return result;
}; };
