import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      categoryId: ["", Validators.required],
    });
  }

  add() {
    if (this.productAddForm.valid) {
      let productModel = this.productAddForm.value as Product;
      this.productService.add(productModel).subscribe({
        next: (response) => {
          console.log({ response });
          this.toastrService.success("Product is added.", "Success!");
        },
        error: (errorResponse) => {
          console.log({ errorResponse });
          if (errorResponse.error.Errors.length > 0) {
            for (const error of errorResponse.error.Errors) {
              this.toastrService.error(error.ErrorMessage, "Error!");
            }
          }
        },
        complete: () => {
          console.log("completed.");
        }
      });
    }
    else {
      this.toastrService.warning("Your form is not completed.", "Warning!");
    }
  }
}
