const express = require("express");
const cors = require("cors");
const { BookModel } = require("./models/book");
const { connectToDb } = require("./utils/dbConnect");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/book", async (req, res) => {
    const books = await BookModel.find();
    res.json(books);
});

app.post("/book", async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) return res.sendStatus(401);
        const newBook = new BookModel({ title, author });
        await newBook.save();
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
});

app.put("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { title, author } = req.body;
        if (!title || !author) return res.sendStatus(401);
        await BookModel.findOneAndUpdate({ _id: id }, { title, author });
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

app.delete("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await BookModel.findByIdAndDelete(id);
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
});

connectToDb();
app.listen(3000, () => {
    console.log("Server running !");
});