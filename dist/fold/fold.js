"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var maybe_1 = require("../maybe");
var immutable_1 = require("immutable");
exports.fold = function (f, seed) { return function (monad) {
    var result;
    if (rxjs_1.isObservable(monad)) {
        result = operators_1.reduce(f, seed)(monad);
    }
    else if (maybe_1.isMaybe(monad)) {
        result = maybe_1.foldLeft(f, seed)(monad);
    }
    else if (immutable_1.Iterable.isIterable(monad)) {
        result = monad.reduce(f, seed);
    }
    else if (Array.isArray(monad)) {
        result = monad.reduce(f, seed);
    }
    else {
        throw new Error('Invalid type!');
    }
    return result;
}; };
