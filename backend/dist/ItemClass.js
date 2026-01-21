"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    id;
    name = "";
    typeItem = "";
    quality = -1;
    stats = [];
    itemPool = [];
    constructor(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setName(newName) {
        this.name = newName;
    }
}
exports.Item = Item;
//# sourceMappingURL=ItemClass.js.map