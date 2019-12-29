const request = require('request');

const geocode = (url, callback) => {
     request(url, (err, res, resBody) => {
        if(err) {
            throw err;
        } else {
            const locationDetails = JSON.parse(resBody);
            console.log(`location details :`);
            console.log(locationDetails);
            callback(err, locationDetails);
        }
    })
};

const darkSky = (url, callback) => {
     request(url, (error, whetherData, whetherDataBody) => {
        const whether = JSON.parse(whetherDataBody);
        console.log(whether);
        callback(error, {
            "latitude": whether.latitude,
            "longitude": whether.longitude,
            "timezone": whether.timezone,
            "Summary": whether.currently.summary
        });
    })
};
module.exports = {
    darkSky,
    geocode
};
