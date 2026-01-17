"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemClass_1 = require("./ItemClass");
const IsaacItems_json_1 = __importDefault(require("../datasets/IsaacItems.json"));
const IsaacItemPool_json_1 = __importDefault(require("../datasets/IsaacItemPool.json"));
const IsaacItemMetadata_json_1 = __importDefault(require("../datasets/IsaacItemMetadata.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const allItems = new Array(732);
// instantiate 732 empty items
for (let i = 1; i < allItems.length + 1; i++) {
    allItems[i - 1] = new ItemClass_1.Item(i);
}
// get the name, category and stats of each item in the IsaacItems.json
const categories = ["passive", "active", "familiar"];
for (const category of categories) {
    for (const item of IsaacItems_json_1.default[category]) {
        const id = parseInt(item?.["@id"]);
        allItems[id - 1]?.setName(item?.["@name"]);
        allItems[id - 1].typeItem = category;
        if (item?.["@cache"]) {
            allItems[id - 1].stats = item["@cache"].split(" "); // isnt adding correctly right now
        }
        if ("@hearts" in item || "@maxhearts" in item) {
            allItems[id - 1].stats.push("health");
        }
    }
}
// get the quality value of each item in the IsaacItemMetadata.json
for (const item of IsaacItemMetadata_json_1.default["item"]) {
    const id = parseInt(item["@id"]);
    allItems[id - 1].quality = parseInt(item["@quality"]);
}
// get each itempool that an item belongs to
for (const itemPool of IsaacItemPool_json_1.default) {
    const poolName = itemPool["@Name"];
    for (const item of itemPool["Item"]) {
        const id = parseInt(item["@Id"]);
        allItems[id - 1].itemPool.push(poolName);
    }
}
// convert to json and write that json to ItemDataFinal.json
const jsonStr = JSON.stringify(allItems, null, 4);
const filePath = path_1.default.join(__dirname, "../datasets/ItemDataFinal.json");
fs_1.default.writeFile(filePath, jsonStr, "utf8", () => {
    console.log("Dataset created");
});
//# sourceMappingURL=JsonDataCreator.js.map