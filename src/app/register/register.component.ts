import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
    confirmarContrasena: ['', Validators.required]
  }, { validators: this.mustMatch('contrasena', 'confirmarContrasena') });

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { usuario, contrasena } = this.registerForm.value;
      this.authService.register(usuario!, contrasena!).subscribe({
        next: (response) => {
          alert('Usuario registrado exitosamente. Por favor, inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          alert('Error al registrar el usuario.');
          console.error(error);
        }
      });
    }
  }
}