import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  onLogin(): void {
    this.auth.login(this.loginData).subscribe({
      next: (response: any) => {
        this.auth.storeToken(response.token);
        this.auth.storeUser(response.user); 
        alert('Login Successful');
        this.router.navigate(['/podcasts']);
      },
      error: (error) => {
        alert('Login failed. Please check your credentials.');
        console.error(error);
      }
    });
  }
}
