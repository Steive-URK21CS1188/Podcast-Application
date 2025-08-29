import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSidebar = false;
  title = 'hrpodcast-frontend';
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.showSidebar = !!token;
  }
  
}
