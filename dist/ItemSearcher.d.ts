import { Item } from "./ItemClass";
import items from "../datasets/ItemDataFinal.json";
export declare enum Turnout {
    GREEN = 1,
    YELLOW = 2,
    RED = 3,
    REDUP = 4,
    REDDOWN = 5
}
export declare enum Result {
    TYPEITEM = 0,
    QUALITY = 1,
    STATS = 2,
    ITEMPOOL = 3
}
export declare function fetchItem(identifier: keyof typeof items): Item;
export declare function compareItems(item1: Item, item2: Item): number[];
//# sourceMappingURL=ItemSearcher.d.ts.map