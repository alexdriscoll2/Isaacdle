"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemSearcher_1 = require("./ItemSearcher");
let item = (0, ItemSearcher_1.fetchItem)("2"); // Math.floor(Math.random() * 732) + 1
console.log(item.getId());
console.log(item.name);
//# sourceMappingURL=index.js.map