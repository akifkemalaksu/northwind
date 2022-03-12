import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Product[], filterText: string): Product[] {
    filterText = (filterText) ? filterText.toLocaleLowerCase() : "";
    if (filterText) {
      value = value.filter((product: Product) =>
        product.productName.toLocaleLowerCase().includes(filterText)
      );
    }
    return value;
  }

}
