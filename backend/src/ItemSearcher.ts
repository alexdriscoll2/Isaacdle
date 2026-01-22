import { Item } from "./ItemClass"
import itemsByID from "../datasets/ItemDataByID.json"
import itemsByName from "../datasets/ItemDataByName.json"

export enum Turnout
{
    GREEN = 1,
    YELLOW = 2,
    RED = 3,
    REDUP = 4,
    REDDOWN = 5
}

export enum Result 
{
    TYPEITEM = 0,
    QUALITY,
    STATS,
    ITEMPOOL
}

export function fetchItembyId(id: number): Item
{
    return (itemsByID[id-1] as Item)
}

export function fetchItemByName(identifier: string): Item
{
    return (itemsByName?.[identifier as keyof typeof itemsByName] as Item)
}


// returns how similar item2 is to item1
export function compareItems(item1: Item, item2: Item): number[]
{
    const results = new Array<number>(4);

    item1.typeItem === item2.typeItem ? results[Result.TYPEITEM] = Turnout.GREEN : results[Result.TYPEITEM] = Turnout.RED;

    item1.quality === item2.quality ? results[Result.QUALITY] = Turnout.GREEN : 
        item1.quality > item2.quality ? results[Result.QUALITY] = Turnout.REDUP :
            results[Result.QUALITY] = Turnout.REDDOWN;

    results[Result.STATS] = compareArrs(item1.stats, item2.stats);
    
    results[Result.ITEMPOOL] = compareArrs(item1.itemPool, item2.itemPool);

    return results;
}

function compareArrs(arr1: string[], arr2: string[]): number
{
    let numMatched = 0;

    for(const element of arr2) 
    {
        if(arr1.includes(element))
        {
            numMatched++;
        }
    }

    if(numMatched === arr1.length && arr1.length === arr2.length)
    {
        return Turnout.GREEN;
    }
    else if(numMatched === 0)
    {
        return Turnout.RED;
    }
    else
    {
        return Turnout.YELLOW;
    }
}
