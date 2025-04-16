import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EmpleadoComponent } from './Pages/empleado/empleado.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Importa el componente de registro
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // Agrega la ruta para el registro
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'empleado/:id', component: EmpleadoComponent, canActivate: [AuthGuard] },
  // Otras rutas protegidas aquí
];