import { Component } from '@angular/core';
import { materialImports } from '../../shared/materials/material-imports';

@Component({
  selector: 'app-header',
  imports: [...materialImports],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
