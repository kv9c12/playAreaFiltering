
const { Venue, connect, close } = require("../Utils/DBConnection/connection");

exports.getAllVenues = async () => {
    try {
        await connect();
        const venues = await Venue.find().lean();
        console.log("Fetched Total Venues: ", venues.length);
        close();
        return venues;
    } catch (err) {
        console.log("Error Occurred: ", err)
        return [];
    }
};