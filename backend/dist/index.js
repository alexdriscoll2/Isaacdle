"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/api/data", (req, res) => {
    res.json({
        data: "please work!"
    });
});
app.listen(4000, () => console.log("Server is running"));
//# sourceMappingURL=index.js.map