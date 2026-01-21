import { fetchItembyId } from "./ItemSearcher";
import express from "express";
import cors from "cors";

const app = express()

app.use(cors())

app.get("/api/data", (req, res) =>
{
    res.json(
        {
            data: "please work!"
        }
    )
})


app.listen(4000, () => console.log("Server is running"));
