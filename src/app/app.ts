import { Component } from '@angular/core';
import { EditProduct } from './features/product-editor/edit-product/edit-product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditProduct],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'edit-product-app';
}
