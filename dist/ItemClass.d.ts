export interface ItemDetails {
    id: number;
    name: string;
    typeItem: string;
    quality: number;
    stats: string[];
    itemPool: string[];
}
export declare class Item implements ItemDetails {
    id: number;
    name: string;
    typeItem: string;
    quality: number;
    stats: string[];
    itemPool: string[];
    constructor(id: number);
    getId(): number;
    setName(newName: string): void;
}
//# sourceMappingURL=ItemClass.d.ts.map