$(function() {
  var socket = io.connect();
  var name = /^\?name=(\w+)/.exec(window.location.search)[1];

  function command(cmd) {
    socket.emit('command', name, cmd);
  }

  $('#volume-up').click(function() {
    command('volume up');
  });
  $('#volume-down').click(function() {
    command('volume down');
  });
  $('#backward').click(function() {
    command('backward');
  });
  $('#forward').click(function() {
    command('forward');
  });
  $('#play').click(function() {
    command('play/pause');
  });
});
