const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;