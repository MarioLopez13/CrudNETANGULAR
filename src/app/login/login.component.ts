import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule // Importa RouterModule aquí
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      this.authService.login(usuario!, contrasena!).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          alert('Credenciales incorrectas');
          console.error(error);
        }
      });
    }
  }
}