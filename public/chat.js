let socket = io('http://localhost:3000');
let audio = document.querySelector('audio');

function renderMessage(message) {
  $('.messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>');
  audio.play();
}

socket.on('previousMessage', function (messages) {
  for (message of messages) {
    renderMessage(message);
  }
});

socket.on('receivedMessage', function (message) {
  renderMessage(message);
});

$('#chat').submit(function (event) {
  event.preventDefault();

  let author = $('input[name=username]').val();
  let message = $('input[name=message]').val();

  if (author.length && message.length) {
    let messageObject = {
      author: author,
      message: message,

    };
    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
  }
});