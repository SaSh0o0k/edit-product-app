import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import productData from '../../../../assets/data/product-data.json';
import listLocationData from '../../../../assets/data/list-location-data.json';
import ebayListingsData from '../../../../assets/data/ebay-listings-data.json';
import sameProductsData from '../../../../assets/data/same-products-data.json';

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

  listLocation = listLocationData;
  ebayListings = ebayListingsData;
  sameProducts = sameProductsData;

  loading = signal(true);
  error = signal(false);
  data = signal<Product | null>(null);

  constructor() {
    try {
      const data: Product = productData as Product;

      const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${d}.${m}.${y} ${hh}:${mm}`;
      };

      this.data.set(data);
      this.form.patchValue({
        ...data,
        editAt: data.editAt ? formatDate(data.editAt) : '',
        createAt: data.createAt ? formatDate(data.createAt) : '',
      });
    } catch {
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
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
