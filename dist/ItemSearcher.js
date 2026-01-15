"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchItem = fetchItem;
const ItemClass_1 = require("./ItemClass");
const IsaacItems_json_1 = __importDefault(require("../datasets/IsaacItems.json"));
function fetchItem(id) {
    const item = new ItemClass_1.Item(id);
    let descriptors = searchForId(id, "passive");
    item.name = descriptors;
    return item;
}
function searchForId(id, typeItem) {
    let min = 0;
    let max = IsaacItems_json_1.default[typeItem].length;
    let target = Math.floor((min + max) / 2);
    while (min != max) {
        target = Math.floor((min + max) / 2);
        if (id === parseInt(IsaacItems_json_1.default[typeItem][target]?.["@id"])) {
            return IsaacItems_json_1.default[typeItem][target]?.["@name"];
        }
        else if (id <= parseInt(IsaacItems_json_1.default[typeItem][target]?.["@id"])) {
            max = target;
        }
        else {
            min = target;
        }
    }
    if (id === parseInt(IsaacItems_json_1.default[typeItem][target]?.["@id"])) {
        return IsaacItems_json_1.default[typeItem][target]?.["@name"];
    }
}
//# sourceMappingURL=ItemSearcher.js.map