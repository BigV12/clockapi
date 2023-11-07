const request = require("request");
const geocode = require("./geocode");

const time = (address, callback) => {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    const url =
      "https://timeapi.io/api/Time/current/coordinate?latitude=" +
      latitude +
      "&longitude=" +
      longitude;

    request({ url, json: true }, (error, { body } = {}) => {
      if (error) {
        return callback("Unable to get time", undefined);
      }

      if (body.error) {
        callback(body.error, undefined);
      } else {
        callback(undefined, {
          year: body.year,
          month: body.month,
          day: body.day,
          time: body.time,
          dayOfWeek: body.dayOfWeek,
        });
        // console.log(body.year);
        // console.log(body.month);
        // console.log(body.day);
        // console.log(body.time);
        // console.log(body.dayOfWeek);
      }
    });
  });
};

module.exports = time;
