const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logRoutes = require("./routes/log");
const userRoutes = require("./routes/user");

require('dotenv').config();
// import mongoose

//db connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true    
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware

app.use("/api", userRoutes);
app.use("/api", logRoutes);

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log("Listening on port 8001");
});
