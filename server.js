require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
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
const book = mongoose.model('book', bookSchema)
// IDUCS
app.get("/book",async(req,res)=>{
    try {
        const response = await book.find({})
        res.json(response)
    } catch (error) {
        res.status(400).json(error)
    }
});
app.post("/book",async(req,res)=>{
    try {
        const book = await book.create(req.body)
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
app.get("/book/:id", async(req,res)=>{
    try {
        const book = await book.findById(req.params.id)
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
app.put("/book/:id", async(req,res)=>{
    try {
        const book = await book.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
app.delete("/book/:id", async(req,res)=>{
    try {
        const book = await book.findByIdAndDelete(req.params.id)
        res.status(204).json(book)
    } catch (error) {
        res.status(400).json(error)
    }
});
// test route
app.get('/',(req,res)=>{
    res.json({Name:"test route "})
})
app.listen(PORT, () => console.log(`listening on port ${PORT}`))