const request = require("request");

const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1IjoiYmlndjEyIiwiYSI6ImNsbzF2b2R1eTB0NGoybXF1MmVxY2RvODgifQ.qiZreIZH1ZaKUhYBBxd21w&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("An error occured", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
      console.log("working");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
