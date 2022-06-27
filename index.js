// import module
require('dotenv').config()
const express = require("express")
const multer = require('multer')
const morgan = require('morgan')
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}



// import
const { getProduct, postProduct, updateProduct, deleteProduct, searchProduct, getAll } = require('./src/controllers/ProductController')
const uploadFilter = require('./src/middleware/multer')


const app = express()
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions))
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies


// ------------------- Route ----------------------

// get data product
// app.get('/', getProduct)
app.get('/all', getAll)
app.post('/add', uploadFilter, postProduct)
app.get('/cari', searchProduct)
app.patch('/update/:id', uploadFilter, updateProduct)
app.delete('/delete/:id', deleteProduct)

// ------------------------------------------------

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`SERVER CONNECT IN PORT ${PORT}`)
})