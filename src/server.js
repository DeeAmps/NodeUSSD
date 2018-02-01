const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require('mongoose');
const ussdRoute = require("./routes/ussdRoutes");
const app = express();

require('dotenv').config();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.SESSION_DB, { useMongoClient: true }, (err) => {
    if (err) console.log(`Error connecting with Mongo DB : ${err}`);
    else {
        console.log("Connected with Mongo DB");
    }

});

app.use("/ussd", ussdRoute);
app.use("/", (req, res) => {
    return res.send("USSD API on /ussd?msisdn=XXXXXXXXX&dialogId=X&userInput=X")
})


let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})