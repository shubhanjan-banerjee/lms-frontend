import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PageLoaderComponent } from './components/loader/page-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastrComponent, ConfirmationDialogComponent, PageLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'lms-frontend';
}
