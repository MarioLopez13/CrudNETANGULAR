import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from './Settings/appsettings';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "Auth";

  constructor() { }

  login(usuario: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { nombreUsuario: usuario, contrasena: contrasena });
  }
  register(usuario: string, contrasena: string): Observable<any> { 
    return this.http.post(`${this.apiUrl}/register`, { nombreUsuario: usuario, contrasena: contrasena });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token.trim() !== '';
  }
  
}