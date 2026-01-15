import { fetchItem } from "./ItemSearcher";


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
    })
})
