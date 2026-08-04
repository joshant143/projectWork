import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { LoaderService } from './core/service/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly loaderService = inject(LoaderService);

  protected readonly title = signal('claimsPortal');
  protected readonly isLoading = this.loaderService.isLoading;
}
