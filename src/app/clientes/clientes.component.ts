import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);

  }

  delete(cliente: Cliente): void {

    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {

            this.clientes = this.clientes.filter(cli => cli != cliente);
            
            Swal.fire(
              'Eliminado!',
              'El cliente ha sido eliminado',
              'success'
            )
          }
        );
      }
    })

  }

}
