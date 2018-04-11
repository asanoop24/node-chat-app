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


jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'from',
      text: jQuery('[name=message]').val()
    },
    function(data){
      console.log('Got the message: ', data);
    }
  );
});
