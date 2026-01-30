"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemSearcher_1 = require("./ItemSearcher");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/api/data/byid/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log("attempting to fetch item: " + id.toString());
        const item = (0, ItemSearcher_1.fetchItembyId)(id);
        if (item) {
            console.log("Item found!");
            res.json(item);
        }
        else {
            console.log("Error, item not found!");
            res.status(404).json({ error: "Item not found!" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/api/data/byname/:name", (req, res) => {
    try {
        const name = req.params.name;
        console.log("attempting to fetch item: " + name);
        const item = (0, ItemSearcher_1.fetchItemByName)(name);
        if (item) {
            console.log("Item found!");
            res.json(item);
        }
        else {
            console.log("Error, item not found!");
            res.status(404).json({ error: "Item not found!" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/api/data/compare/:name1/:name2", (req, res) => {
    try {
        console.log("attempting to fetch items.");
        const item1 = (0, ItemSearcher_1.fetchItemByName)(req.params.name1);
        const item2 = (0, ItemSearcher_1.fetchItemByName)(req.params.name2);
        console.log("item 1: " + item1.name + "\nitem 2: " + item2.name);
        console.log("items successfully fetched! comparing items");
        res.json((0, ItemSearcher_1.compareItems)(item1, item2));
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(4000, () => console.log("Server is running"));
//# sourceMappingURL=index.js.map