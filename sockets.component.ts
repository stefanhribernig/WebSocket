import { Component, OnInit } from '@angular/core';
import io from 'C:/Users/Acer/Desktop/WebSocket_PPT/websockets/node_modules/socket.io-client/dist/socket.io.js';


@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.css']
})
export class SocketsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const socket = io('localhost:3001');
    const connections = document.getElementById('connections');
    const log = document.getElementById('log');
    const name = (<HTMLFormElement>document.getElementById('name'));
    const chatWindow = document.getElementById('log');
    const texthtml = (<HTMLFormElement>document.getElementById('sendtext'));
    const btn = document.getElementById('btn');


    socket.on('news', function (data) {
      console.log(data.users);
      connections.innerHTML = data.users;
    });

    socket.on('msg', function (data) {
      console.log(data);
      log.innerHTML += (data.name + ' : ' + data.data + '<br>');
    });

    btn.addEventListener('click', function () {
      if (name.checkValidity()) {
        socket.send({
          type: 'message',
          name: name.value,
          data: texthtml.value
        });
        texthtml.value = '';
      } else {
        window.alert('you need a name to chat!'); }
    });
  }

}
