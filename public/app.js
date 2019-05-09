let min = 1;
let max = 6;
let rand = Math.floor(Math.random() * (max - min)) + min;
let alertClass;

switch (rand) {
  case 1:
  alertClass = 'secondary';
  break;
  case 2:
  alertClass = 'danger';
  break;
  case 3:
  alertClass = 'success';
  break;
  case 4:
  alertClass = 'warning';
  break;
  case 5:
  alertClass = 'info';
  break;
  case 6:
  alertClass = 'light';
  break;
}

$(function() {
  let socket = io.connect();
  let form = $('.form');
  let textarea = $('.textarea');
  let out_mes = $('.out-message');
  let name = $('.name');

  form.submit(function(e) {
    e.preventDefault();
    socket.emit('send_mess', {
      message: textarea.val(), 
      name: name.val(),
      className: alertClass,
    });
    textarea.val('');
  });

  socket.on('new_mess', function(data) {
    out_mes.append("<div class='alert alert-" + data.className + "'><b>" + data.name + ": </b>" + data.message + '</div>');
  });
});