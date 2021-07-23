console.log('work');
const socket = new WebSocket('ws://localhost:3000');

const formEl = document.forms.numbers;
formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const num = formData.get('num');
    socket.send(num);
});

socket.addEventListener('message', (ev) => {
    console.log('Message from server ', ev.data);
});