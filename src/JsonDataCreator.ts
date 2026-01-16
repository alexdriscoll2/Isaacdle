import { Item } from "./ItemClass"
import itemGeneral from "../datasets/IsaacItems.json"
import itemPools from "../datasets/IsaacItemPool.json"
import itemQual from "../datasets/IsaacItemMetadata.json"
import fs from "fs"
import path from "path"

const allItems = new Array<Item>(732);

for(let i = 1; i < allItems.length+1; i++)
{
    allItems[i-1] = new Item(i);
}

const categories: (keyof typeof itemGeneral)[] = ["passive", "active", "familiar"];

for(const category of categories)
{
    for(const item of itemGeneral[category])
    {
        const id = parseInt(item?.["@id"] as string);
        allItems[id-1]?.setName(item?.["@name"]);
        allItems[id-1]!.typeItem = category;
    } 
}

const jsonStr = JSON.stringify(allItems, null, 4);
const filePath = path.join(__dirname, "../datasets/ItemDataFinal.json");

fs.writeFile(filePath, jsonStr, "utf8", () => {
    console.log("Dataset created");
})
