const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STR)
        console.log("MongoDB connected...\nHOST:", connect.connection.host, "\nNAME: "+connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb ;