import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/MenuItem.interface';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss'],
})
export class HorizontalBarComponent implements OnInit {
  //Creamos nuestro listado de menuItems
  MenuItems: Array<MenuItem> = [
    {
      label: 'explore',
      route: 'explore-movies',
    },
    {
      label: 'features',
      route: 'features',
    },
    {
      label: 'pricing',
      route: 'pricing',
    },
    {
      label: 'about us',
      route: 'about-us',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
