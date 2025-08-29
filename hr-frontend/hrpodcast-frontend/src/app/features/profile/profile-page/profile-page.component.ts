import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  initials: string = '';
  profileImageUrl: string = '';
  hasImage: boolean = false;

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);

      const firstName = this.user.firstName || '';
      const lastName = this.user.lastName || '';
      const phone = this.user.phoneNumber || '';
      const profilePic = this.user.profilePic || '';

      this.user.fullName = `${firstName} ${lastName}`;
      this.user.phone = phone;

      // Set initials
      const firstInitial = firstName.charAt(0) || '';
      const lastInitial = lastName.charAt(0) || '';
      this.initials = `${firstInitial}${lastInitial}`.toUpperCase();

      // Set profile image
      if (profilePic && typeof profilePic === 'string' && profilePic.trim() !== '') {
        this.profileImageUrl = 'https://localhost:5001' + this.user.profilePic;
        this.hasImage = true;
      }
    }

  }
}
