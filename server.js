require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const {PORT,DATABASE_URL} = process.env
/// Middlesware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
///
// MongoDB Conection
mongoose.connect(DATABASE_URL)
mongoose.connection
.on('open', () => console.log("i'm connnected"))
.on('close', () => console.log("i'm Disconected"))
.on('error', (error) => console.log(error))
//
/// book Models
const bookSchema = mongoose.Schema({
    name: String,
    url: String
})
const Books = mongoose.model('book', bookSchema)

app.get("/book", (req, res) => {
    res.send("hello world")
})

app.post("/book", async (req, res) => {
    try{
        const book = await Books.create(req.body)
        res.json(book)
    } catch (error) {
        res.status(404).json(error)
    }
})
app.listen(PORT, () => console.log(`listening on port ${PORT}`))