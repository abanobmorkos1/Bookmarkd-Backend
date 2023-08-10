//work please man121
require("dotenv").config()
const {PORT, DATABASE_URL} = process.env
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require("morgan")


// MongoDB Conection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection
.on('open', () => console.log("i'm connnected"))
.on('close', () => console.log("i'm Disconected"))
.on('error', (error) => console.log(error))
//
const BookSchema = new mongoose.Schema({
    name: String,
    url: String
})
const Book = mongoose.model('book', BookSchema)

/// Middlesware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
/// book Models

// IDUCS
app.get("/book", async (req, res) => {
    try {
        res.json(await Book.find({}))

    } catch (error) {
        res.status(400).json(error)
    }
});
app.post("/book", async (req, res) => {
    try {
        res.json(await Book.create(req.body))

    } catch (error) {
        res.status(400).json(error)
    }
});
app.get("/book/:id", async (req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
app.put("/book/:id", async (req, res) => {
    try {
        res.json(await Book.findByIdAndUpdate(req.params.id))

    } catch (error) {
        res.status(400).json(error)
    }
});
app.delete("/book/:id", async (req,res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        res.status(204).json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
// test route
app.get('/', (req,res) => {
    res.json({Name:"test route "})
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))