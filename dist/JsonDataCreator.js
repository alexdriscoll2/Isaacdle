"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemClass_1 = require("./ItemClass");
const IsaacItems_json_1 = __importDefault(require("../datasets/IsaacItems.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const allItems = new Array(732);
for (let i = 1; i < allItems.length + 1; i++) {
    allItems[i - 1] = new ItemClass_1.Item(i);
}
const categories = ["passive", "active", "familiar"];
for (const category of categories) {
    for (const item of IsaacItems_json_1.default[category]) {
        const id = parseInt(item?.["@id"]);
        allItems[id - 1]?.setName(item?.["@name"]);
        allItems[id - 1].typeItem = category;
    }
}
const jsonStr = JSON.stringify(allItems, null, 4);
const filePath = path_1.default.join(__dirname, "../datasets/ItemDataFinal.json");
fs_1.default.writeFile(filePath, jsonStr, "utf8", () => {
    console.log("Dataset created");
});
//# sourceMappingURL=JsonDataCreator.js.map