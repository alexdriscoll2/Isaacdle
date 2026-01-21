"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(id) {
        this.name = "";
        this.typeItem = "";
        this.quality = -1;
        this.stats = [];
        this.itemPool = [];
        this.id = id;
    }
    Item.prototype.getId = function () {
        return this.id;
    };
    Item.prototype.setName = function (newName) {
        this.name = newName;
    };
    return Item;
}());
exports.Item = Item;
