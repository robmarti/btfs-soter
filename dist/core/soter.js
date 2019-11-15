"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.soterApi = {
    inquiry: "https://sandbox.btfssoter.io/api/v0/inquiry",
    add: "https://sandbox.btfssoter.io/api/v0/add",
    recharge: "TMTqojR33e8QoB34bjsGi4D8zJgrFVopsr"
};
exports.soterApiTest = {
    inquiry: "https://api.btfssoter.io/api/v0/inquiry",
    add: "https://api.btfssoter.io/api/v0/add",
    recharge: "TEAxH9kfc28syd1cBrwbsBz88QG5wPL8Ek"
};
var utils_1 = require("./utils");
var axios = __importStar(require("axios"));
var Axios = axios.default;
var Soter = /** @class */ (function () {
    function Soter(tronweb, isTest) {
        if (tronweb === void 0) { tronweb = window.tronWeb; }
        if (isTest === void 0) { isTest = true; }
        this.tronweb = tronweb;
        this.api = isTest ? exports.soterApiTest : exports.soterApi;
    }
    Soter.prototype.inquiry = function (file_size) {
        return __awaiter(this, void 0, void 0, function () {
            var user_address, _a, status, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_address = this.tronweb.defaultAddress.base58;
                        return [4 /*yield*/, Axios.get(this.api.inquiry, {
                                params: {
                                    user_address: user_address,
                                    file_size: file_size
                                }
                            })];
                    case 1:
                        _a = _b.sent(), status = _a.status, data = _a.data;
                        console.log(status, data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    Soter.prototype.recharge = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tronweb.trx.sendTransaction(this.api.recharge, amount, "1002000")];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/];
                }
            });
        });
    };
    Soter.prototype.add = function (file, progressHandler) {
        return __awaiter(this, void 0, void 0, function () {
            var request_user, signed_user, request_id, timestamp, raw_data, signature, formData, _a, status, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        request_user = this.tronweb.defaultAddress.base58;
                        signed_user = this.tronweb.default.base58;
                        request_id = utils_1.uuidv4();
                        timestamp = utils_1.ts();
                        raw_data = {
                            request_user: request_user,
                            signed_user: signed_user,
                            request_id: request_id,
                            timestamp: timestamp
                        };
                        return [4 /*yield*/, this.tronweb.trx.sign(this.tronweb.toHex(JSON.stringify(raw_data)))];
                    case 1:
                        signature = _b.sent();
                        formData = new FormData();
                        formData.append("raw_data", JSON.stringify(raw_data));
                        formData.append("signature", signature);
                        formData.append("file", file);
                        return [4 /*yield*/, Axios.post(this.api.add, {
                                data: formData,
                                onUploadProgress: !!progressHandler ? progressHandler : undefined
                            })];
                    case 2:
                        _a = _b.sent(), status = _a.status, data = _a.data;
                        console.log(status, data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Soter;
}());
exports.Soter = Soter;
//# sourceMappingURL=soter.js.map