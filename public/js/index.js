// const moment = require('moment');
var socket = io();
// console.log('Moment: ', moment().format('h mm a'));
socket.on('connect', function(){
  console.log('Connected to Server');
});

socket.on('disconnect', function(){
  console.log('Disconnected From Server');
});

socket.on('newEmail', function(email){
  console.log('New Email: ', email);
});

socket.on('newMessage', function(message){

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
    from: message.from
  });

  jQuery('#messages').append(html);

});

socket.on('newLocationMessage', function(message){

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: `https://www.google.co.in/maps/@${message.lat},${message.lng}`,
    createdAt: moment(message.createdAt).format('h:mm a'),
    from: message.from
  });

  jQuery('#messages').append(html);


  // console.log('New Message: ', message);
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_"></a>')
  // a.text(`My Location`);
  // a.attr('href', `https://www.google.co.in/maps/@${message.lat},${message.lng}`);
  // li.text(`${moment(message.createdAt).format('h:mm a')}  ${message.from}: `);
  // jQuery('#messages').append(li.append(a));
});


jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {from: 'from', text: messageTextBox.val()},
    function(data){messageTextBox.val('');}
  );
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){

  if(!navigator.geolocation) return alert('Geolocation not supported');
  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send Location');
  }, function(error){
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send Location');
  });

});
