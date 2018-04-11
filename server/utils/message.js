var generateMessage = function(from, text){
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  }
}
var generateLocationMessage = function(from, lat, lng){
  return {
    from: from,
    lat: lat,
    lng: lng,
    createdAt: new Date().getTime()
  }
}




module.exports.generateMessage = generateMessage;
module.exports.generateLocationMessage = generateLocationMessage;
