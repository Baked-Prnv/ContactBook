const express = require("express");
const errorHandler = require("./middlewares/errorHandlers");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()
const path = require('path');

const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use("/contact", require("./routes/contactRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});