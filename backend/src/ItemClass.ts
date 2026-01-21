export interface ItemDetails
{
    id: number;
    name: string;
    typeItem: string;
    quality: number;
    stats: string[];
    itemPool: string[];
}

export class Item implements ItemDetails
{
    id: number;
    name: string = "";
    typeItem: string = "";
    quality: number = -1;
    stats: string[] = [];
    itemPool: string[] = [];

    constructor(id: number)
    {
        this.id = id;
    }

    getId(): number
    {
        return this.id;
    }

    setName(newName: string)
    {
        this.name = newName;
    }

}