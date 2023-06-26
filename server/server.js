require('dotenv').config();
const express=require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const PORT = process.env.PORT || 3500;
// const verifyToken = require("./middleware/verifyToken");
// const coreOptions = require("./config/coreOptions");
const connectDB = require("./config/dbConn");

// connect to mongodb
connectDB();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/auth", require("./routes/auth"));

//check the connection and server run on the given port 
mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=>console.log(`Server run on ${PORT}`));
});
