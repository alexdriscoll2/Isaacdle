import { Item } from "./ItemClass"
import itemGeneral from "../datasets/IsaacItems.json"
import itemPools from "../datasets/IsaacItemPool.json"
import itemQual from "../datasets/IsaacItemMetadata.json"
import fs from "fs"
import path from "path"

const allItems = new Array<Item>(732);

// instantiate 732 empty items
for(let i = 1; i < allItems.length+1; i++)
{
    allItems[i-1] = new Item(i);
}

// get the name, category and stats of each item in the IsaacItems.json
const categories: (keyof typeof itemGeneral)[] = ["passive", "active", "familiar"];

for(const category of categories)
{
    for(const item of itemGeneral[category])
    {
        const id = parseInt(item?.["@id"] as string);
        
        allItems[id-1]?.setName(item?.["@name"]);

        allItems[id-1]!.typeItem = category;

        if(item?.["@cache"])
        {
            allItems[id-1]!.stats = item["@cache"].split(" ");
        }
        if("@hearts" in item || "@maxhearts" in item) 
        {
            allItems[id-1]!.stats.push("health");
        }

    } 
}

// get the quality value of each item in the IsaacItemMetadata.json
for(const item of itemQual["item"])
{
    const id = parseInt(item["@id"]);
    allItems[id-1]!.quality = parseInt(item["@quality"]);
}

// get each itempool that an item belongs to
for(const itemPool of itemPools)
{
    const poolName = itemPool["@Name"];

    for(const item of itemPool["Item"])
    {
        const id = parseInt(item["@Id"]);
        allItems[id-1]!.itemPool.push(poolName);
    }
}

// convert to json and write that json to ItemDataFinal.json
const jsonStr = JSON.stringify(allItems, null, 4);
const filePath = path.join(__dirname, "../datasets/ItemDataFinal.json");

fs.writeFile(filePath, jsonStr, "utf8", () => {
    console.log("Dataset created");
})
