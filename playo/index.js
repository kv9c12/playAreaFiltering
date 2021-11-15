const express = require('express');
const app = express();

const { filterVenue, search, sort, requestHandler } = require("./Controllers/venueController");

app.use(express.json());

app.use('/', requestHandler)

app.get('/filterVenue', filterVenue);
app.get('/search', search);
app.get("/sort", sort)

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});

