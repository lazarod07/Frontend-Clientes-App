import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Cliente } from './cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(this.urlEndPoint);

  }

  create(cliente: Cliente): Observable<Cliente> {

    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeader }).pipe(
      map(
        (response: any) => response.cliente as Cliente
      ),
      catchError(e => {

        Swal.fire(e.error.mensaje, e.error.error, 'error');

        return throwError(e);

      })
    );

  }

  update(cliente: Cliente): Observable<any> {

    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeader }).pipe(
      catchError(e => {

        Swal.fire(e.error.mensaje, e.error.error, 'error');

        return throwError(e);

      })
    );

  }

  delete(id: number): Observable<Cliente> {

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeader }).pipe(
      catchError(e => {

        Swal.fire(e.error.mensaje, e.error.error, 'error');

        return throwError(e);

      })
    );

  }

  getCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');

        this.router.navigate(['/clientes']);

        return throwError(e);
      })
    );

  }

}
