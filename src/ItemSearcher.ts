import { Item } from "./ItemClass"
import items from "../datasets/IsaacItems.json"

export function fetchItem(id: number): Item
{
    const item = new Item(id);

    let descriptors = searchForId(id, "passive");
    if(descriptors === undefined)
        descriptors = searchForId(id, "active");
    if(descriptors === undefined)
        descriptors = searchForId(id, "familiar");

    item.name = descriptors as string;
    
    return item;
}

function searchForId(id: number, typeItem: keyof typeof items) // return index instead and access all i need to
{  
    let min = 0;
    let max = items[typeItem].length;

    let target = Math.floor((min + max) / 2);

    while (min != max)
    {
        target = Math.floor((min + max) / 2);
        if(id === parseInt(items[typeItem][target]?.["@id"] as string))
        {
            return items[typeItem][target]?.["@name"];
        }
        else if(id <= parseInt(items[typeItem][target]?.["@id"] as string))
        {
            max = target;
        }
        else
        {
            min = target;
        }
    }
    if(id === parseInt(items[typeItem][target]?.["@id"] as string))
    {
        return items[typeItem][target]?.["@name"];
    }
}
