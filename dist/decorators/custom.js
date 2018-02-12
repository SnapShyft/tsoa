"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = "tsoa_custom_parameter";
function CustomParameter(getParam) {
    return function (target, key, index) {
        if (!target[METADATA_KEY]) {
            target[METADATA_KEY] = {};
        }
        var details = {
            getParam: getParam,
            index: index,
        };
        if (target[METADATA_KEY][key]) {
            target[METADATA_KEY][key].push(details);
        }
        else {
            target[METADATA_KEY][key] = [details];
        }
    };
}
exports.CustomParameter = CustomParameter;
function CustomParameters() {
    return function (target, key, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            target[METADATA_KEY][key].forEach(function (_a) {
                var getParam = _a.getParam, index = _a.index;
                args[index] = getParam(args[index]);
            });
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.CustomParameters = CustomParameters;
//# sourceMappingURL=custom.js.map