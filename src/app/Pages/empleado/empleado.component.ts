import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  @Input('id') idEmpleado!: number;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado: FormGroup = this.formBuild.group({
    nombreCompleto: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    sueldo: [0, [Validators.required, Validators.min(0)]],
    fechaContrato: ['', Validators.required]
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idEmpleado && this.idEmpleado != 0) {
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next: (data) => {
          this.formEmpleado.patchValue({
            nombreCompleto: data.nombreCompleto,
            correo: data.correo,
            sueldo: data.sueldo,
            fechaContrato: data.fechaContrato
          });
        },
        error: (err) => {
          console.error(err.message);
        }
      });
    }
  }

  guardar(): void {
    const empleado: Empleado = {
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      correo: this.formEmpleado.value.correo,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: this.formEmpleado.value.fechaContrato
    };

    if (this.idEmpleado == 0) {
      this.empleadoServicio.crear(empleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al crear');
          }
        },
        error: (err) => {
          console.error(err.message);
        }
      });
    } else {
      this.empleadoServicio.editar(empleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al editar');
          }
        },
        error: (err) => {
          console.error(err.message);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  limpiar(): void {
    this.formEmpleado.reset({
      nombreCompleto: '',
      correo: '',
      sueldo: 0,
      fechaContrato: ''
    });
  }
}
