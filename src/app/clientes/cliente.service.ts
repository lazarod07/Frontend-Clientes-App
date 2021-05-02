import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api';

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.urlEndPoint+'/clientes');

  }

  constructor(private http: HttpClient) { }
}
