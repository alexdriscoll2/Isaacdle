import { fetchItembyId, fetchItemByName, compareItems, Turnout, Result } from "./ItemSearcher";


describe("Fetch Item Tests: ", () =>
{
    it("should retrieve all passive items", () =>
    {
        const item1 = fetchItembyId(1);
        const item2 = fetchItembyId(2);
        const item3 = fetchItembyId(731);
        const item4 = fetchItembyId(732);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("The Sad Onion");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("The Inner Eye");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Stye");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Moms Ring");
    })

    it("should retrieve all active items", () =>
    {
        const item1 = fetchItembyId(33);
        const item2 = fetchItembyId(34);
        const item3 = fetchItembyId(728);
        const item4 = fetchItembyId(729);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("The Bible");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("The Book Of Belial");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Gello");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Decap Attack");
    })

    it("should retrieve all familiar items", () =>
    {
        const item1 = fetchItembyId(8);
        const item2 = fetchItembyId(10);
        const item3 = fetchItembyId(697);
        const item4 = fetchItembyId(698);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("Brother Bobby");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("Halo Of Flies");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("Vanishing Twin");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("Twisted Pair");
    })

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

})

describe("Compare Item Tests: ", () =>
{
    it("should compare an item to itself correctly", () =>
    {
        const item1 = fetchItembyId(1);
        const item2 = fetchItembyId(1);

        expect(compareItems(item1, item2)).toEqual([1, 1, 1, 1]); // signifies all greens
    })

    it("should compare item type correctly", () =>
    {
        const item1 = fetchItembyId(1); // passive
        const item2 = fetchItembyId(2); // passive

        expect(compareItems(item1, item2)[Result.TYPEITEM]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItembyId(8); // familiar

        expect(compareItems(item1, item3)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItembyId(33); // active

        expect(compareItems(item1, item4)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match
        expect(compareItems(item3, item4)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match
    })

    it("should compare quality correctly", () => 
    {
        const item1 = fetchItembyId(1); // q3
        const item2 = fetchItembyId(3); // q3

        expect(compareItems(item1, item2)[Result.QUALITY]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItembyId(2); // q2

        // does not match and the guess (arg2) is lower quality than the actual item (arg1)
        expect(compareItems(item1, item3)[Result.QUALITY]).toEqual(Turnout.REDUP);

        const item4 = fetchItembyId(4); // q4

        // does not match and the guess (arg2) is higher quality than the actual item (arg1)
        expect(compareItems(item1, item4)[Result.QUALITY]).toEqual(Turnout.REDDOWN);
    })

    it("should compare stats correctly", () => 
    {
        const item1 = fetchItembyId(25); // health
        const item2 = fetchItembyId(26); // health

        expect(compareItems(item1, item2)[Result.STATS]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItembyId(27); // speed

        expect(compareItems(item1, item3)[Result.STATS]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItembyId(342); // shotspeed firedelay health

        expect(compareItems(item1, item4)[Result.STATS]).toEqual(Turnout.YELLOW); // partially matches
        expect(compareItems(item4, item1)[Result.STATS]).toEqual(Turnout.YELLOW); // partially matches
    })

    it("should compare item pools correctly", () => 
    {
        const item1 = fetchItembyId(24); // boss, beggar
        const item2 = fetchItembyId(25); // boss, beggar

        expect(compareItems(item1, item2)[Result.ITEMPOOL]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItembyId(1); // treasure

        expect(compareItems(item1, item3)[Result.ITEMPOOL]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItembyId(26); // boss, beggar, rotten beggar

        expect(compareItems(item1, item4)[Result.ITEMPOOL]).toEqual(Turnout.YELLOW); // partially matches
        expect(compareItems(item4, item1)[Result.ITEMPOOL]).toEqual(Turnout.YELLOW); // partially matches
    })
})
