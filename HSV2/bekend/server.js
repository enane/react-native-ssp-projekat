const connection = require('./db')
const express = require('express')
const cors = require('cors');
const multer = require('multer')
const path = require('path');
const app = express()
const bodyParser = require("body-parser");
const port = 5000;
app.use(express.json())
app.use(express.static("./img"))

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './img/')     // './public/images/' directory name where save the file
    },
    filename: function (req, file, callback)  {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage}) ;

app.use('/api/hotels',require('./routes'))
app.use("/img", express.static('img'));

app.post("/addPicture", upload.single('image'), (req, res) => {
    if (req.file) {
    }
});

app.listen(5000, () => {
    console.log(`Sever working on port ${port}`)
})


