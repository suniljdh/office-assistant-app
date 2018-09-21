import { Injectable } from "@angular/core";
import { DataService } from "../utilities/data.service";
import { Observable } from "rxjs";
import { IMessage } from "../model/i-message";
import { IClient } from "../model/i-client";
import { IClientType } from "../model/i-client-type";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  constructor(private data: DataService) {}

  FetchClientType() {
    const serviceMethod = '/getclienttype';
    return this.data.getData(serviceMethod);
  }

  SaveClientData(data: IClient): Observable<IMessage> {
    const serviceMethod = '/saveclient';
    return this.data.postData(serviceMethod, data) as Observable<IMessage>;
  }

  FetchClientData(id: Number, mode: string): Observable<IClient> {
    const serviceMethod = '/fetchclient?id=' + id + '&mode=' + mode;
    return this.data.getData(serviceMethod) as Observable<IClient>;
  }

  DeleteClientData(id?: Number): Observable<IMessage> {
    const serviceMethod = '/deleteclient?id=' + id;
    return this.data.getData(serviceMethod) as Observable<IMessage>;
  }

  FetchAllClients(): Observable<IClient[]> {
    const serviceMethod = '/fetchallclients';
    return this.data.getData(serviceMethod) as Observable<IClient[]>;
  }
}
