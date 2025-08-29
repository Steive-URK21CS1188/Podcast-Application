import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
selector: 'app-top-navbar',
templateUrl: './top-navbar.component.html',
styleUrls: ['./top-navbar.component.css']
})

export class TopNavbarComponent {
  showBack = false;
  showDummy = false;
  constructor(private router: Router, private location: Location) {
    const currentUrl = this.router.url;
    this.showBack = currentUrl.includes('/podcasts/') || currentUrl.includes('/subscriptions') || currentUrl.includes('/profile');
    this.showDummy = currentUrl.includes('/podcasts') && !(currentUrl.includes('/podcasts/'));

  }

  goBack(): void {
    this.location.back();
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/exit']);
  }
}
