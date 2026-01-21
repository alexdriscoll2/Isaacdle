"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var ItemClass_1 = require("./ItemClass");
var IsaacItems_json_1 = require("../datasets/IsaacItems.json");
var IsaacItemPool_json_1 = require("../datasets/IsaacItemPool.json");
var IsaacItemMetadata_json_1 = require("../datasets/IsaacItemMetadata.json");
var fs_1 = require("fs");
var path_1 = require("path");
var allItems = new Array(732);
// instantiate 732 empty items
for (var i = 1; i < allItems.length + 1; i++) {
    allItems[i - 1] = new ItemClass_1.Item(i);
}
// get the name, category and stats of each item in the IsaacItems.json
var categories = ["passive", "active", "familiar"];
for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
    var category = categories_1[_i];
    for (var _b = 0, _c = IsaacItems_json_1.default[category]; _b < _c.length; _b++) {
        var item = _c[_b];
        var id = parseInt(item === null || item === void 0 ? void 0 : item["@id"]);
        (_a = allItems[id - 1]) === null || _a === void 0 ? void 0 : _a.setName(item === null || item === void 0 ? void 0 : item["@name"]);
        allItems[id - 1].typeItem = category;
        if (item === null || item === void 0 ? void 0 : item["@cache"]) {
            allItems[id - 1].stats = item["@cache"].split(" "); // isnt adding correctly right now
        }
        if ("@hearts" in item || "@maxhearts" in item) {
            allItems[id - 1].stats.push("health");
        }
    }
}
// get the quality value of each item in the IsaacItemMetadata.json
for (var _d = 0, _e = IsaacItemMetadata_json_1.default["item"]; _d < _e.length; _d++) {
    var item = _e[_d];
    var id = parseInt(item["@id"]);
    allItems[id - 1].quality = parseInt(item["@quality"]);
}
// get each itempool that an item belongs to
for (var _f = 0, itemPools_1 = IsaacItemPool_json_1.default; _f < itemPools_1.length; _f++) {
    var itemPool = itemPools_1[_f];
    var poolName = itemPool["@Name"];
    for (var _g = 0, _h = itemPool["Item"]; _g < _h.length; _g++) {
        var item = _h[_g];
        var id = parseInt(item["@Id"]);
        allItems[id - 1].itemPool.push(poolName);
    }
}
var dict = {};
for (var _j = 0, allItems_1 = allItems; _j < allItems_1.length; _j++) {
    var item = allItems_1[_j];
    dict[item.name] = item;
    dict[item.id.toString()] = item;
}
// convert to json and write that json to ItemDataFinal.json
var jsonStr = JSON.stringify(dict, null, 4);
var filePath = path_1.default.join(__dirname, "../datasets/ItemDataFinal.json");
fs_1.default.writeFile(filePath, jsonStr, "utf8", function () {
    console.log("Dataset created");
});
