import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client'

@Injectable()
export class ChatService {
  private url = '';
  private socket;

  usuario: string;
  ganador: string;

  constructor() {
    this.socket = io(this.url);
  }

  public meterUsuario(usuario){
    this.usuario = usuario;
  }

  public listo() {
    this.socket.emit('listo', this.usuario);
  }

  public sendMessage(data) {
    this.socket.emit('chat message', data);
  }

  public elegirCarta(carta) {
    this.socket.emit('elegirCarta', {jugador:this.usuario,carta:carta});
  }

  public empezar = () => {
    return Observable.create((observer) => {
      this.socket.on('empezar', (data) => {
        observer.next(data);
      });
    })
  };

  public jugadores = () => {
    return Observable.create((observer) => {
      this.socket.on('jugadores', (data) => {
        observer.next(data);
      });
    })
  };

  public puntos = () => {
    return Observable.create((observer) => {
      this.socket.on('puntos', (data) => {
        observer.next(data);
      });
    })
  };

  public resultado = () => {
    return Observable.create((observer) => {
      this.socket.on('resultado', (data) => {
        this.ganador = data;
        observer.next(data);
      });
    })
  };

  public acabar = () => {
    return Observable.create((observer) => {
      this.socket.on('acabar', (data) => {
        observer.next(data);
        setTimeout(() => {this.socket.emit('salir-sala')}, 1000);
      });
      });
    };

  public habilitar = () => {
    return Observable.create((observer) => {
      this.socket.on('habilitar', (data) => {
        observer.next(data);
      });
    })
  };

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('chat message', (data) => {
        observer.next(data);
      });
    })
  };

}
