// src/app/app.ts
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Menu } from "./menu/menu";
import { filter } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})


export class App {
  protected title = 'Telalogin';

  showMenu = false;

  Menu(){
    this.showMenu = !this.showMenu
  }

  constructor(private readonly router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showMenu = !(currentUrl.includes('/login'));
    });
  }

}
