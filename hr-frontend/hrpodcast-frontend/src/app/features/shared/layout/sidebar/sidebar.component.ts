import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
  }

  goBack(): void {
    this.location.back();
  }
}
