const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const triquity = require("./controllers/Triquity");
const fs = require("fs");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const pdf = require("html-pdf");
const multer = require('multer')


const ayaReg = require('./routes/Route')
var session = require('express-session');




dotenv.config()

const app = express()
app.use(bodyParser.json());

const port = process.env.port || 8109


// for testing
app.get('/', (req, res) => {
    res.send("api is working")
})



mongoose.set('strictQuery', false)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed');
    }
}

app.use('/uploads', express.static('uploads'))

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());



// app.use('/upload', express.static('upload'));

// app.use(session({
//   secret: 'webslesson',
//   cookie: { maxAge: 60000 },
//   saveUninitialized: false,
//   resave: false
// }));


app.use(session({
    secret: 'webslesson',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
}));






app.use(ayaReg)


app.listen(port, () => {
    connect();
    console.log('server listing on port', port);
})







