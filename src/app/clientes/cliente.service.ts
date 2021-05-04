import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' })

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.urlEndPoint);

  }

  create(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeader });

  }

  update(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeader });

  }

  delete(id: number): Observable<Cliente>{

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader});

  }

  getCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);

  }

  constructor(private http: HttpClient) { }
}
