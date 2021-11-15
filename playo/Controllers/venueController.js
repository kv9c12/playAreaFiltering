
const { getAllVenues } = require("../Service/venues");
const { paginateResults } = require("../Utils/utility")

let pageNumber = 1;
let venues = [];

exports.requestHandler = async (req, res, next) => {
    pageNumber = req.body.pageNumber || 1;
    venues = await getAllVenues();
    next();
}

exports.filterVenue = async (req, res) => {
    try {
        if (!venues) return [];
        let { city, sports, booking, avgRating, amenities } = req.body;
        let venueList = [];

        if (city) {
            venueList = venues.filter(venue => venue.city === city)
        }

        if (sports && sports.length > 0) {
            venueList = venueList.filter(venue => venue.sports.some(item => sports.includes(item)))
        }

        if (booking) {
            venueList = venueList.filter(venue => venue.category === booking)
        }

        if (avgRating !== undefined) {
            venueList = venueList.filter(venue => venue.avgRating === avgRating)
        }

        if (amenities && amenities.length > 0) {
            venueList = venueList.filter(venue => venue.amenities.some(item => amenities.includes(item)))
        }

        res.send(paginateResults(venueList, pageNumber))
    }
    catch (error) {
        console.log("Error Occurred: ", error);
        res.send(paginateResults([], 1));
    }
    res.end();
};

exports.search = (req, res) => {
    try {
        let { name, city, area } = req.body;
        let venueList = venues.filter(venue => {
            let check = true;
            if (!!name)
                check = check && venue.name === name
            if (!!city)
                check = check && venue.city === city
            if (!!area)
                check = check && venue.area === area
            return check;
        });

        res.send(paginateResults(venueList, pageNumber));
    }
    catch (error) {
        console.log("Error Occurred: ", error);
        res.send(paginateResults([], 1));
    }
    res.end();
}

exports.sort = (req, res) => {
    try {
        let { avgRating, ratingCount, order } = req.body;
        venueList = venues.sort((x, y) => {
            if (avgRating) {
                var n = x.avgRating - y.avgRating;
                if (n !== 0) {
                    return n;
                }
            }
            if (ratingCount)
                return x.ratingCount - y.ratingCount;
        })
        if (order === "desc") venueList = venueList.reverse()

        res.send(paginateResults(venueList, pageNumber))
    }
    catch (error) {
        console.log("Error Occurred: ", error);
        res.send(paginateResults([], 1));
    }
    res.end()

}
