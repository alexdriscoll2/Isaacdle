import { fetchItembyId, fetchItemByName, compareItems } from "./ItemSearcher";
import express from "express";
import cors from "cors";

const app = express()

app.use(cors())

app.get("/api/data/byid/:id", (req, res) =>
{
    try
    {
        const id = parseInt(req.params.id);

        console.log("attempting to fetch item: " + id.toString());

        const item = fetchItembyId(id);

        if(item)
        {
            console.log("Item found!");
            res.json(item);
        }
        else
        {
            console.log("Error, item not found!");
            res.status(404).json({ error: "Item not found!"})
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Server error"})
    }
})

app.get("/api/data/byname/:name", (req, res) =>
{
    try
    {
        const name = req.params.name;

        console.log("attempting to fetch item: " + name);

        const item = fetchItemByName(name);

        if(item)
        {
            console.log("Item found!");
            res.json(item);
        }
        else
        {
            console.log("Error, item not found!");
            res.status(404).json({ error: "Item not found!"})
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Server error"})
    }
})

app.get("/api/data/compare/:name1/:name2", (req, res) =>
{
    try
    {
        console.log("attempting to fetch items.");
        const item1 = fetchItemByName(req.params.name1);
        const item2 = fetchItemByName(req.params.name2);

        console.log("items successfully fetched! comparing items")

        res.json(compareItems(item1, item2));
    }
    catch (error)
    {
        res.status(500).json({ error: "Server error"})
    }
})

app.listen(4000, () => console.log("Server is running"));
