import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessageService } from '../../../../core/services/message.service';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';
import { constants } from '../../../../../constants/constants';
import { firstValueFrom } from 'rxjs';

/**
 * Products form component
 *
 * @author gvivas
 * @version 1.0
 * @since 1.0.0
 */

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
  };
  productForm!: FormGroup;
  minDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.listenToDateRelease();
  }

  /**
   * Build form adding validators
   *
   */
  buildForm() {
    this.productForm = this.fb.group({
      id: [
        { value: '', disabled: this.isEdit },
        [
          Validators.required,
          Validators.minLength(3),
          this.minLengthNoWhitespace(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.minLengthNoWhitespace(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          this.minLengthNoWhitespace(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: [
        '',
        [Validators.required, this.minDateValidator(this.minDate)],
      ],
      date_revision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  /**
   * Validate min date
   *
   */
  minDateValidator(min: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const minDate = new Date(min);
      return inputDate < minDate ? { minDate: true } : null;
    };
  }

  /**
   *Update date_revision
   *
   */
  listenToDateRelease(): void {
    this.productForm
      .get('date_release')
      ?.valueChanges.subscribe((releaseDate: string) => {
        if (releaseDate) {
          const revisionDate = this.addOneYear(releaseDate);
          this.productForm.get('date_revision')?.setValue(revisionDate);
        } else {
          this.productForm.get('date_revision')?.setValue('');
        }
      });
  }

  /**
   *Add one year to date
   *
   */
  addOneYear(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setFullYear(date.getFullYear() + 1);
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    return `${newYear}-${newMonth}-${newDay}`;
  }

  /**
   *Submit form
   *
   */
  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      // UPDATE
    } else {
      if (this.productForm.valid) {
        const isValid = await this.verificateId(this.product.id);
        if (isValid) {
          this.messageService.showMessage(
            constants.MESSAGES.PRODUCTS.ID_EXIST,
            'error'
          );
        } else {
          this.createProduct(this.product);
        }
      }
    }
  }

  /**
   *Get errors from form
   *
   */
  getFieldErrors(fieldName: string) {
    const control = this.productForm.get(fieldName);
    const touched = control?.touched;
    const errors = control?.errors;
    return {
      show: touched && control?.invalid,
      required: !!errors?.['required'],
      minlength: !!errors?.['minlength'],
      maxlength: !!errors?.['maxlength'],
      minDate: !!errors?.['minDate'],
      whitespace: !!errors?.['whitespace']
    };
  }

  /**
   *Verificate if id exists
   *
   */
  async verificateId(id: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.productService.checkIdExists(id)
      );
      return response;
    } catch (error) {
      this.messageService.showMessage(
        constants.MESSAGES.PRODUCTS.ERROR_SERVICE,
        'error'
      );
      return true;
    }
  }

  /**
   *Create product
   *
   */
  createProduct(product: Product) {
    this.productService.create(product).subscribe(
      (response) => {
        if (response.message === constants.RESPONSES.PRODUCTS.SAVE_CORRECT) {
          this.productForm.reset();
          this.messageService.showMessage(
            constants.MESSAGES.PRODUCTS.SAVE,
            'success'
          );
        } else {
          this.messageService.showMessage(
            constants.MESSAGES.PRODUCTS.ERROR_SAVE,
            'error'
          );
        }
      },
      (error) => {
        this.messageService.showMessage(
          constants.MESSAGES.PRODUCTS.ERROR_SERVICE,
          'error'
        );
      }
    );
  }

    /**
   *Validate if field has empty spaces
   *
   */
  minLengthNoWhitespace(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const trimmed = control.value.trim();
      if (trimmed.length === 0) {
        return {
          whitespace: true,
        };
      }
      if (trimmed.length < minLength) {
        return {
          minlength: true,
        };
      }
      return null;
    };
  }
}
