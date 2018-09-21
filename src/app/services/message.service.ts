import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message = new Subject<any>();
  constructor() {}

  sendMessage(msg: any) {
    this.message.next({ value: msg });
  }

  receiveMessage() {
    return this.message.asObservable();
  }

  resetMessage() {
    this.message.next();
  }
}
