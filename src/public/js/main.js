const socket = io();

Notification.requestPermission().then((result) => {
  console.log('Estado de notificaciones:', result);
});

function notifyMe(message = 'Un nuevo SMS') {
  let notification;
  if (!('Notification' in window)) {
    alert('El navegador no soporta notificaciones');
  } else if (Notification.permission === 'granted') {
    notification = new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        notification = new Notification(message);
      }
    });
  }
}

socket.on('new message', (data) => {
  const messagesList = document.getElementById('messagesList');
  const li = document.createElement('li');

  notifyMe(data.body);

  li.classList = 'list-group-item list-group-item-action';

  li.innerHTML = `
    <p class="text-success">
      <i class="fas fa-comment-dots text-muted mr-1"></i>
      ${data.body}
      <span class="text-white-50">
        - ${timeago.format(data.createdAt, 'es')}
      </span>
    </p>
    <small class="text-muted d-block">
      <i class="fas fa-mobile-alt mr-1"></i>
      ${data.from}
    </small>
    <small class="text-muted">
      <i class="fas fa-database mr-1"></i>
      ${data._id}
    </small>
  `;

  // Agregando al inicio de la lista
  messagesList.prepend(li);
});
