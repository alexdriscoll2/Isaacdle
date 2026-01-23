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
/*
TODO:
lowercase the key name for item data by name, to create case-insensitive searching
spacing for item pools and stats
*/
// instantiate 732 empty items
for (let i = 1; i < allItems.length + 1; i++) {
    allItems[i - 1] = new ItemClass_1.Item(i);
}
// get the name, category and stats of each item in the IsaacItems.json
const categories = ["Passive", "Active", "Familiar"];
for (const category of categories) {
    for (const item of IsaacItems_json_1.default[category]) {
        const id = parseInt(item?.["@id"]);
        // these two lines take the # and the _NAME part out of each name, put the name into lowercase, then capitalize the first letter of each word
        let nameFixed = item?.["@name"].substring(1, item?.["@name"].length - 5).toLowerCase();
        nameFixed = nameFixed.split("_").map(word => word[0]?.toUpperCase() + word.substring(1, word.length)).join().replaceAll(",", " ");
        allItems[id - 1]?.setName(nameFixed);
        allItems[id - 1].typeItem = category;
        if (item?.["@cache"]) // get all parts of cache and uppercase the first letter
         {
            allItems[id - 1].stats = item["@cache"].split(" ").map(element => element[0].toUpperCase() + element.substring(1, element.length));
        }
        if ("@hearts" in item || "@maxhearts" in item) // health up/down doesn't appear in cache, have to check like this
         {
            allItems[id - 1].stats.push("Health");
        }
        if (allItems[id - 1].stats.length === 0) {
            allItems[id - 1].stats.push("None");
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
        allItems[id - 1].itemPool.push(poolName[0]?.toUpperCase() + poolName.substring(1, poolName.length));
    }
}
// create reference by name dict
let dict = {};
for (const item of allItems) {
    dict[item.name.toLowerCase()] = item;
}
// convert both by id and by string to jsons
const jsonID = JSON.stringify(allItems, null, 4);
const jsonName = JSON.stringify(dict, null, 4);
const filePath = path_1.default.join(__dirname, "../datasets/");
fs_1.default.writeFile(path_1.default.join(filePath, "ItemDataByID.json"), jsonID, "utf8", () => {
    console.log("ID Dataset created");
});
fs_1.default.writeFile(path_1.default.join(filePath, "ItemDataByName.json"), jsonName, "utf8", () => {
    console.log("Name Dataset created");
});
//# sourceMappingURL=JsonDataCreator.js.map