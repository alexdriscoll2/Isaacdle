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
    let descriptorsIndex = searchForId(id, "passive");
    if (descriptorsIndex !== -1) {
        item.name = IsaacItems_json_1.default["passive"][descriptorsIndex]?.["@name"];
    }
    else // not a passive item, try to see if it's an active item
     {
        descriptorsIndex = searchForId(id, "active");
        if (descriptorsIndex !== -1) {
            item.name = IsaacItems_json_1.default["active"][descriptorsIndex]?.["@name"];
        }
        else // not passive or active, should be a familiar
         {
            descriptorsIndex = searchForId(id, "familiar");
            if (descriptorsIndex !== -1) {
                item.name = IsaacItems_json_1.default["familiar"][descriptorsIndex]?.["@name"];
            }
            else // if not a familiar, we couldn't find the item
             {
                throw new Error("Item id not found: " + id);
            }
        }
    }
    return item;
}
function searchForId(id, typeItem) {
    let min = 0;
    let max = IsaacItems_json_1.default[typeItem].length;
    let target = Math.floor((min + max) / 2);
    while (min != max) {
        target = Math.floor((min + max) / 2);
        if (id === parseInt(IsaacItems_json_1.default[typeItem][target]?.["@id"])) {
            return target;
        }
        else if (id < parseInt(IsaacItems_json_1.default[typeItem][target]?.["@id"])) {
            max = target;
        }
        else {
            min === target ? min++ : min = target;
        }
    }
    return -1;
}
//# sourceMappingURL=ItemSearcher.js.map