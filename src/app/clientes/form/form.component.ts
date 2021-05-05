import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();

  title: string = "Crear cliente";

  errores: string[] = [];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {

    this.activatedRoute.params.subscribe(params => {

      let id: number = params['id'];

      if (id) {

        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        );

      }

    });

  }

  public create(): void {

    this.clienteService.create(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes']);

        Swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito`, 'success');
      },
      err => {

        this.errores = err.error.errors as string[];

      }
    );

  }

  update(): void {

    this.clienteService.update(this.cliente).subscribe(
      response => {

        this.router.navigate(['/clientes']);

        Swal.fire('Cliente actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success');
      }
    )
  }

}
