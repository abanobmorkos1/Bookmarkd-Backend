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