import { fetchItem, compareItems, Turnout, Result } from "./ItemSearcher";


describe("Fetch Item Tests: ", () =>
{
    it("should retrieve all passive items", () =>
    {
        const item1 = fetchItem(1);
        const item2 = fetchItem(2);
        const item3 = fetchItem(731);
        const item4 = fetchItem(732);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#THE_SAD_ONION_NAME");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#THE_INNER_EYE_NAME");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#STYE_NAME");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#MOMS_RING_NAME");
    })

    it("should retrieve all active items", () =>
    {
        const item1 = fetchItem(33);
        const item2 = fetchItem(34);
        const item3 = fetchItem(728);
        const item4 = fetchItem(729);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#THE_BIBLE_NAME");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#THE_BOOK_OF_BELIAL_NAME");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#GELLO_NAME");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#DECAP_ATTACK_NAME");
    })

    it("should retrieve all familiar items", () =>
    {
        const item1 = fetchItem(8);
        const item2 = fetchItem(10);
        const item3 = fetchItem(697);
        const item4 = fetchItem(698);

        expect(typeof item1.name).toBe("string");
        expect(item1.name).toBe("#BROTHER_BOBBY_NAME");

        expect(typeof item2.name).toBe("string");
        expect(item2.name).toBe("#HALO_OF_FLIES_NAME");

        expect(typeof item3.name).toBe("string");
        expect(item3.name).toBe("#VANISHING_TWIN_NAME");

        expect(typeof item4.name).toBe("string");
        expect(item4.name).toBe("#TWISTED_PAIR_NAME");
    })

    // include test that all items have atleast one itempool
    // it("every item should have an item pool *", () =>
    // {
    //     const arr = new Array<number>();
    //     for(let i = 1; i <= 732; i++)
    //     {
    //         if(fetchItem(i).itemPool.length === 0)
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
        const item1 = fetchItem(1);
        const item2 = fetchItem(1);

        expect(compareItems(item1, item2)).toEqual([1, 1, 1, 1]); // signifies all greens
    })

    it("should compare item type correctly", () =>
    {
        const item1 = fetchItem(1); // passive
        const item2 = fetchItem(2); // passive

        expect(compareItems(item1, item2)[Result.TYPEITEM]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItem(8); // familiar

        expect(compareItems(item1, item3)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItem(33); // active

        expect(compareItems(item1, item4)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match
        expect(compareItems(item3, item4)[Result.TYPEITEM]).toEqual(Turnout.RED); // doesn't match
    })

    it("should compare quality correctly", () => 
    {
        const item1 = fetchItem(1); // q3
        const item2 = fetchItem(3); // q3

        expect(compareItems(item1, item2)[Result.QUALITY]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItem(2); // q2

        // does not match and the guess (arg2) is lower quality than the actual item (arg1)
        expect(compareItems(item1, item3)[Result.QUALITY]).toEqual(Turnout.REDUP);

        const item4 = fetchItem(4); // q4

        // does not match and the guess (arg2) is higher quality than the actual item (arg1)
        expect(compareItems(item1, item4)[Result.QUALITY]).toEqual(Turnout.REDDOWN);
    })

    it("should compare stats correctly", () => 
    {
        const item1 = fetchItem(25); // health
        const item2 = fetchItem(26); // health

        expect(compareItems(item1, item2)[Result.STATS]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItem(27); // speed

        expect(compareItems(item1, item3)[Result.STATS]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItem(342); // shotspeed firedelay health

        expect(compareItems(item1, item4)[Result.STATS]).toEqual(Turnout.YELLOW); // partially matches
        expect(compareItems(item4, item1)[Result.STATS]).toEqual(Turnout.YELLOW); // partially matches
    })

    it("should compare item pools correctly", () => 
    {
        const item1 = fetchItem(24); // boss, beggar
        const item2 = fetchItem(25); // boss, beggar

        expect(compareItems(item1, item2)[Result.ITEMPOOL]).toEqual(Turnout.GREEN); // matches

        const item3 = fetchItem(1); // treasure

        expect(compareItems(item1, item3)[Result.ITEMPOOL]).toEqual(Turnout.RED); // doesn't match

        const item4 = fetchItem(26); // boss, beggar, rotten beggar

        expect(compareItems(item1, item4)[Result.ITEMPOOL]).toEqual(Turnout.YELLOW); // partially matches
        expect(compareItems(item4, item1)[Result.ITEMPOOL]).toEqual(Turnout.YELLOW); // partially matches
    })
})
