"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.Turnout = void 0;
exports.fetchItembyId = fetchItembyId;
exports.fetchItemByName = fetchItemByName;
exports.compareItems = compareItems;
const ItemDataByID_json_1 = __importDefault(require("../datasets/ItemDataByID.json"));
const ItemDataByName_json_1 = __importDefault(require("../datasets/ItemDataByName.json"));
var Turnout;
(function (Turnout) {
    Turnout[Turnout["GREEN"] = 1] = "GREEN";
    Turnout[Turnout["YELLOW"] = 2] = "YELLOW";
    Turnout[Turnout["RED"] = 3] = "RED";
    Turnout[Turnout["REDUP"] = 4] = "REDUP";
    Turnout[Turnout["REDDOWN"] = 5] = "REDDOWN";
})(Turnout || (exports.Turnout = Turnout = {}));
var Result;
(function (Result) {
    Result[Result["TYPEITEM"] = 0] = "TYPEITEM";
    Result[Result["QUALITY"] = 1] = "QUALITY";
    Result[Result["STATS"] = 2] = "STATS";
    Result[Result["ITEMPOOL"] = 3] = "ITEMPOOL";
})(Result || (exports.Result = Result = {}));
function fetchItembyId(id) {
    return ItemDataByID_json_1.default[id - 1];
}
function fetchItemByName(identifier) {
    return ItemDataByName_json_1.default?.[identifier.toLowerCase()];
}
// returns how similar item2 is to item1
function compareItems(item1, item2) {
    const results = new Array(4);
    item1.typeItem === item2.typeItem ? results[Result.TYPEITEM] = Turnout.GREEN : results[Result.TYPEITEM] = Turnout.RED;
    item1.quality === item2.quality ? results[Result.QUALITY] = Turnout.GREEN :
        item1.quality > item2.quality ? results[Result.QUALITY] = Turnout.REDUP :
            results[Result.QUALITY] = Turnout.REDDOWN;
    results[Result.STATS] = compareArrs(item1.stats, item2.stats);
    results[Result.ITEMPOOL] = compareArrs(item1.itemPool, item2.itemPool);
    return results;
}
function compareArrs(arr1, arr2) {
    let numMatched = 0;
    for (const element of arr2) {
        if (arr1.includes(element)) {
            numMatched++;
        }
    }
    if (numMatched === arr1.length && arr1.length === arr2.length) {
        return Turnout.GREEN;
    }
    else if (numMatched === 0) {
        return Turnout.RED;
    }
    else {
        return Turnout.YELLOW;
    }
}
//# sourceMappingURL=ItemSearcher.js.map