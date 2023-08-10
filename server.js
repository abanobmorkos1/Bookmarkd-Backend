require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require("morgan")

///

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
/// book Models
const bookSchema = new mongoose.Schema({
    name: String,
    url: String
})
const book = mongoose.model('book', bookSchema)

app.get("/book", (req, res) => {
    res.send("hello world")
})

app.get('/',(req,res)=>{
    res.json({Name:"test route "})
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
