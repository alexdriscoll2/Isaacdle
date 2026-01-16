import { Item } from "./ItemClass"
import items from "../datasets/IsaacItems.json"

export function fetchItem(id: number): Item
{
    const item = new Item(id);

    let descriptorsIndex = searchForId(id, "passive");

    if(descriptorsIndex !== -1)
    {
        item.name = items["passive"][descriptorsIndex]?.["@name"] as string;
    }
    else // not a passive item, try to see if it's an active item
    {
        descriptorsIndex = searchForId(id, "active");
        if(descriptorsIndex !== -1)
        {
            item.name = items["active"][descriptorsIndex]?.["@name"] as string;
        }
        else // not passive or active, should be a familiar
        {
            descriptorsIndex = searchForId(id, "familiar");
            if(descriptorsIndex !== -1)
            {
                item.name = items["familiar"][descriptorsIndex]?.["@name"] as string;
            }
            else // if not a familiar, we couldn't find the item
            {
                throw new Error("Item id not found: " + id);
            }
        }
    }
    
    return item;
}

function searchForId(id: number, typeItem: keyof typeof items): number
{  
    let min = 0;
    let max = items[typeItem].length;

    let target = Math.floor((min + max) / 2);

    while (min != max)
    {
        target = Math.floor((min + max) / 2);
        if(id === parseInt(items[typeItem][target]?.["@id"] as string))
        {
            return target;
        }
        else if(id < parseInt(items[typeItem][target]?.["@id"] as string))
        {
            max = target;
        }
        else
        {
            min === target ? min++ : min = target;
        }
    }

    return -1;
}
