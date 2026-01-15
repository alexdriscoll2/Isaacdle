"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemSearcher_1 = require("./ItemSearcher");
describe("Fetch Item Tests: ", () => {
    it("should retrieve all passive items", () => {
        const item1 = (0, ItemSearcher_1.fetchItem)(1);
        const item2 = (0, ItemSearcher_1.fetchItem)(2);
        const item3 = (0, ItemSearcher_1.fetchItem)(731);
        const item4 = (0, ItemSearcher_1.fetchItem)(732);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#THE_SAD_ONION_NAME");
    });
});
//# sourceMappingURL=ItemFetcher.test.js.map