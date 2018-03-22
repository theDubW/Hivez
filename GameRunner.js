import io from 'socket.io-client';
window.onload = function(){
	const socket = io('http://localhost');
	setInterval(game, 1000/30);
}
