import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'User',
    profilePic: ''
  };

  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        this.registrationData.profilePic = res.url;  // ✅ Save returned path like /uploads/xyz.jpg
      },
      error: () => {
        alert('❌ Failed to upload image');
      }
    });
  }



  onRegister() {
    if (this.registrationData.password !== this.registrationData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.registrationData).subscribe({
      next: (res) => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      }
    });

  }
}
