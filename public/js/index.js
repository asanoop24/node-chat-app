var socket = io();

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
  console.log('New Message: ', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  console.log('New Message: ', message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_"></a>')
  a.text(`My Location`);
  a.attr('href', `https://www.google.co.in/maps/@${message.lat},${message.lng},16z`);
  li.text(`${message.from}: `);
  jQuery('#messages').append(li.append(a));
});


jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {from: 'from', text: jQuery('[name=message]').val()},
    function(data){console.log('Got the message: ', data);}
  );
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){

  if(!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
    socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
  }, function(error){
    alert('Unable to fetch location');
  });

});
