"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemSearcher_1 = require("./ItemSearcher");
describe("Fetch Item Tests: ", () => {
    it("should retrieve all passive items", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(1);
        const item2 = (0, ItemSearcher_1.fetchItembyId)(2);
        const item3 = (0, ItemSearcher_1.fetchItembyId)(731);
        const item4 = (0, ItemSearcher_1.fetchItembyId)(732);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("The Sad Onion");
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("The Inner Eye");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Stye");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Moms Ring");
    });
    it("should retrieve all active items", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(33);
        const item2 = (0, ItemSearcher_1.fetchItembyId)(34);
        const item3 = (0, ItemSearcher_1.fetchItembyId)(728);
        const item4 = (0, ItemSearcher_1.fetchItembyId)(729);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("The Bible");
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("The Book Of Belial");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Gello");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Decap Attack");
    });
    it("should retrieve all familiar items", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(8);
        const item2 = (0, ItemSearcher_1.fetchItembyId)(10);
        const item3 = (0, ItemSearcher_1.fetchItembyId)(697);
        const item4 = (0, ItemSearcher_1.fetchItembyId)(698);
        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("Brother Bobby");
        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("Halo Of Flies");
        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Vanishing Twin");
        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Twisted Pair");
    });
    // include test that all items have atleast one itempool
    // it("every item should have an item pool *", () =>
    // {
    //     const arr = new Array<number>();
    //     for(let i = 1; i <= 732; i++)
    //     {
    //         if(fetchItembyId(i).itemPool.length === 0)
    //         {
    //             arr.push(i);
    //         }
    //     }
    //     if(arr.length > 0)
    //     {
    //         throw new Error("ids with no item pool: " + arr.toString());
    //     }
    //     expect(arr.length).toBe(0);
    // });
});
describe("Compare Item Tests: ", () => {
    it("should compare an item to itself correctly", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(1);
        const item2 = (0, ItemSearcher_1.fetchItembyId)(1);
        expect((0, ItemSearcher_1.compareItems)(item1, item2)).toEqual([1, 1, 1, 1]); // signifies all greens
    });
    it("should compare item type correctly", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(1); // passive
        const item2 = (0, ItemSearcher_1.fetchItembyId)(2); // passive
        expect((0, ItemSearcher_1.compareItems)(item1, item2)[ItemSearcher_1.Result.TYPEITEM]).toEqual(ItemSearcher_1.Turnout.GREEN); // matches
        const item3 = (0, ItemSearcher_1.fetchItembyId)(8); // familiar
        expect((0, ItemSearcher_1.compareItems)(item1, item3)[ItemSearcher_1.Result.TYPEITEM]).toEqual(ItemSearcher_1.Turnout.RED); // doesn't match
        const item4 = (0, ItemSearcher_1.fetchItembyId)(33); // active
        expect((0, ItemSearcher_1.compareItems)(item1, item4)[ItemSearcher_1.Result.TYPEITEM]).toEqual(ItemSearcher_1.Turnout.RED); // doesn't match
        expect((0, ItemSearcher_1.compareItems)(item3, item4)[ItemSearcher_1.Result.TYPEITEM]).toEqual(ItemSearcher_1.Turnout.RED); // doesn't match
    });
    it("should compare quality correctly", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(1); // q3
        const item2 = (0, ItemSearcher_1.fetchItembyId)(3); // q3
        expect((0, ItemSearcher_1.compareItems)(item1, item2)[ItemSearcher_1.Result.QUALITY]).toEqual(ItemSearcher_1.Turnout.GREEN); // matches
        const item3 = (0, ItemSearcher_1.fetchItembyId)(2); // q2
        // does not match and the guess (arg2) is lower quality than the actual item (arg1)
        expect((0, ItemSearcher_1.compareItems)(item1, item3)[ItemSearcher_1.Result.QUALITY]).toEqual(ItemSearcher_1.Turnout.REDUP);
        const item4 = (0, ItemSearcher_1.fetchItembyId)(4); // q4
        // does not match and the guess (arg2) is higher quality than the actual item (arg1)
        expect((0, ItemSearcher_1.compareItems)(item1, item4)[ItemSearcher_1.Result.QUALITY]).toEqual(ItemSearcher_1.Turnout.REDDOWN);
    });
    it("should compare stats correctly", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(25); // health
        const item2 = (0, ItemSearcher_1.fetchItembyId)(26); // health
        expect((0, ItemSearcher_1.compareItems)(item1, item2)[ItemSearcher_1.Result.STATS]).toEqual(ItemSearcher_1.Turnout.GREEN); // matches
        const item3 = (0, ItemSearcher_1.fetchItembyId)(27); // speed
        expect((0, ItemSearcher_1.compareItems)(item1, item3)[ItemSearcher_1.Result.STATS]).toEqual(ItemSearcher_1.Turnout.RED); // doesn't match
        const item4 = (0, ItemSearcher_1.fetchItembyId)(342); // shotspeed firedelay health
        expect((0, ItemSearcher_1.compareItems)(item1, item4)[ItemSearcher_1.Result.STATS]).toEqual(ItemSearcher_1.Turnout.YELLOW); // partially matches
        expect((0, ItemSearcher_1.compareItems)(item4, item1)[ItemSearcher_1.Result.STATS]).toEqual(ItemSearcher_1.Turnout.YELLOW); // partially matches
    });
    it("should compare item pools correctly", () => {
        const item1 = (0, ItemSearcher_1.fetchItembyId)(24); // boss, beggar
        const item2 = (0, ItemSearcher_1.fetchItembyId)(25); // boss, beggar
        expect((0, ItemSearcher_1.compareItems)(item1, item2)[ItemSearcher_1.Result.ITEMPOOL]).toEqual(ItemSearcher_1.Turnout.GREEN); // matches
        const item3 = (0, ItemSearcher_1.fetchItembyId)(1); // treasure
        expect((0, ItemSearcher_1.compareItems)(item1, item3)[ItemSearcher_1.Result.ITEMPOOL]).toEqual(ItemSearcher_1.Turnout.RED); // doesn't match
        const item4 = (0, ItemSearcher_1.fetchItembyId)(26); // boss, beggar, rotten beggar
        expect((0, ItemSearcher_1.compareItems)(item1, item4)[ItemSearcher_1.Result.ITEMPOOL]).toEqual(ItemSearcher_1.Turnout.YELLOW); // partially matches
        expect((0, ItemSearcher_1.compareItems)(item4, item1)[ItemSearcher_1.Result.ITEMPOOL]).toEqual(ItemSearcher_1.Turnout.YELLOW); // partially matches
    });
});
//# sourceMappingURL=ItemFetcher.test.js.map