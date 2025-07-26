import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import productData from '../../../../assets/product-data.json';
import { not } from 'rxjs/internal/util/not';

interface Product {
  id: string;
  brand?: string;
  model?: string;
  devicePN?: string;
  devType?: string;
  rnk?: number;
  minPrice?: number;
  maxPrice?: number;
  quantity?: number;
  ePrq?: number;
  eA4q?: number;
  sku?: string;
  lUser?: string;
  category?: string;
  eUser?: string;
  greenId?: string;
  editAt?: string;
  createAt?: string;
  amazonLink?: string;
  elccq?: number;
  amazq: number;
  notes?: string;
  photoDevice?: string;
  photoPlate?: string;
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss'
})
export class EditProduct {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [''],
    sku: [''],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    category: ['', Validators.required],
    devicePN: [''],
    devType: [''],
    rnk: [0],
    minPrice: [0, [Validators.required, Validators.min(0)]],
    maxPrice: [0, [Validators.required, Validators.min(0)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    ePrq: [0],
    eA4q: [0],
    lUser: [''],
    eUser: [''],
    greenId: [''],
    editAt: [''],
    createAt: [''],
    amazonLink: [''],
    elccq: [0],
    amazq: [0],
    notes: [''],
    photoDevice: [''],
    photoPlate: [''],
  });

  listLocation = [
    { id: 'G112082', brand: 'NEC', category: 'Projectors', devicePN: 'CP34B', quantity: 52, condition: 'U/ref', user: 'Script', notes: 'No lamp' },
  ];

  ebayListings = [
    { id: '325064386872', sku: 'SRQ/P,Ne_ME331X', title: '3300 ANSI 3LCD Projector 1080p...', price: 114.27, qty: 274, inventory: 3376 },
  ];

  sameProducts = [
    { originalId: 'G112082', sameId: 'G900559', editor: 'Script' },
  ];

  loading = signal(true);
  error = signal(false);
  data = signal<Product | null>(null);

  constructor() {
    // setTimeout(() => {
      try {
        const data: Product = productData as Product;
        this.data.set(data);
        this.form.patchValue(data);
      } catch {
        this.error.set(true);
      } finally {
        this.loading.set(false);
      }
    // }, 1000);
  }

  onEdit() {
    console.log('Modal closed');
  }

  onBack() {
    console.log('Modal back');
  }

  onForward() {
    console.log('Modal forward');
  }

  onClose(): void {
    console.log('Modal closed');
  }

  onSave(): void {
    if (this.form.valid) {
      console.log('Product saved:', this.form.value);
    } else {
      console.warn('Form is invalid');
    }
  }
}
