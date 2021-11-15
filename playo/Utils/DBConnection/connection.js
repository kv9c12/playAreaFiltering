const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config()

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

const venueSchema = require("../../Models/venueSchema");

exports.Venue = mongoose.model('Venue', venueSchema);

exports.connect = async () => {
    try {
        await mongoose
            .connect(DB, {
                useNewUrlParser: true,
            })
        console.log('DB connection successful!');
    } catch (err) {
        console.log("Error occurred: ", error)
    }
}

exports.close = () => {
    try {
        mongoose.connection.close()
        console.log("DB Connection closed.");
    } catch (err) {
        console.log("Error Occurred while closing DB Connection: ", err);
    }
}
