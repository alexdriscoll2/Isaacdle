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
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#THE_INNER_EYE_NAME");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#STYE_NAME");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#MOMS_RING_NAME");
    });
    it("should retrieve all active items", () => {
        const item1 = (0, ItemSearcher_1.fetchItem)(33);
        const item2 = (0, ItemSearcher_1.fetchItem)(34);
        const item3 = (0, ItemSearcher_1.fetchItem)(728);
        const item4 = (0, ItemSearcher_1.fetchItem)(729);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#THE_BIBLE_NAME");
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#THE_BOOK_OF_BELIAL_NAME");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#GELLO_NAME");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#DECAP_ATTACK_NAME");
    });
    it("should retrieve all familiar items", () => {
        const item1 = (0, ItemSearcher_1.fetchItem)(8);
        const item2 = (0, ItemSearcher_1.fetchItem)(10);
        const item3 = (0, ItemSearcher_1.fetchItem)(697);
        const item4 = (0, ItemSearcher_1.fetchItem)(698);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#BROTHER_BOBBY_NAME");
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#HALO_OF_FLIES_NAME");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#VANISHING_TWIN_NAME");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#TWISTED_PAIR_NAME");
    });
    // include test that all items have atleast one itempool
});
//# sourceMappingURL=ItemFetcher.test.js.map