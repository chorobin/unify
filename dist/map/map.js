"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var immutable_1 = require("immutable");
var operators_1 = require("rxjs/operators");
var maybe_1 = require("../maybe/maybe");
exports.map = function (f) { return function (monad) {
    var result;
    if (rxjs_1.isObservable(monad)) {
        result = operators_1.map(f)(monad);
    }
    else if (immutable_1.Iterable.isIterable(monad)) {
        result = monad.map(f);
    }
    else if (maybe_1.isMaybe(monad)) {
        result = maybe_1.map(f)(monad);
    }
    else if (Array.isArray(monad)) {
        result = monad.map(f);
    }
    else {
        throw new Error('Invalid type');
    }
    return result;
}; };
