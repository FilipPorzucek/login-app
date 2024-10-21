import { Component, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { response } from 'express';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DropdownModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass'
})
export class FilterComponent {

constructor(private productService:ProductService){};

  selectedCategory:string='';
  categories: string [] = [];
  @Output() selectCategory:EventEmitter<string>=new EventEmitter<string>();
ngOnInit(){
this.getCategories();
}

getCategories(){
  this.productService.getCategory().subscribe(
    response =>{ this.categories=response;}
  );
}

onChangeCategory($event:any){
  this.selectCategory.emit($event.value);
}

}
