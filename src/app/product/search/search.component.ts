import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProductService } from '../product.service';
import { response } from 'express';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,AutoCompleteModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass'
})
export class SearchComponent {


  selectedProduct: any;

  productList=[];
  constructor(private autoCompleted:AutoCompleteModule,private productService:ProductService){}
  search($event:any){
this.productService.getProductsQuery($event.query).subscribe(
response=>this.productList=response
)
  }

}
