import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/Auth';

  constructor(private http: HttpClient) { }

  // ✅ Login
  login(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.baseUrl}/login`, data).subscribe({
        next: (response) => {
          if (response && response.token && response.user) {
            this.storeToken(response.token);  // You may skip if not using token
            this.storeUser(response.user);
          }
          observer.next(response);
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  }

  
  getRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }


  // ✅ Register
  register(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.baseUrl}/register`, data).subscribe({
        next: (response) => {
          if (response && response.token && response.user) {
            this.storeToken(response.token);
            this.storeUser(response.user);
          }
          observer.next(response);
        },
        error: err => {
          observer.error(err);
        }
      });
    });
  }

  // ✅ Store token
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ Retrieve token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Store user object
  storeUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // ✅ Retrieve user object
  getUser(): any {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  // ✅ Clear session
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
