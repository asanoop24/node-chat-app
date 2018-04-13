const moment = require('moment');

var generateMessage = function(from, text){
  return {
    from: from,
    text: text,
    createdAt: moment()
  }
}
var generateLocationMessage = function(from, lat, lng){
  return {
    from: from,
    lat: lat,
    lng: lng,
    createdAt: moment()
  }
}




module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;
