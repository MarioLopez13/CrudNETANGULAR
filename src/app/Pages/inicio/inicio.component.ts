import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private empleadoServicio = inject(EmpleadoService);
  private authService = inject(AuthService); // Inyecta el servicio de autenticación
  private router = inject(Router);
  public listaEmpleados: Empleado[] = [];
  public displayedColumns: string[] = ['nombreCompleto', 'correo', 'sueldo', 'fechaContrato', 'accion'];

  obtenerEmpleados() {
    this.empleadoServicio.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaEmpleados = data;
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  constructor() {
    this.obtenerEmpleados();
  }

  refrescar() {
    this.obtenerEmpleados();
  }

  nuevo() {
    this.router.navigate(['/empleado', 0]);
  }

  editar(objeto: Empleado) {
    this.router.navigate(['/empleado', objeto.idEmpleado]);
  }

  eliminar(objeto: Empleado) {
    if (confirm("Desea eliminar el empleado" + objeto.nombreCompleto)) {
      this.empleadoServicio.eliminar(objeto.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados();
          } else {
            alert("no se pudo eliminar");
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}