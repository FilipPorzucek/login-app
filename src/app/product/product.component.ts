import { Component, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { response } from 'express';
import { Product } from './product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddEditProductComponent } from "./add-edit-product/add-edit-product.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { FilterComponent } from "./filter/filter.component";
import { SearchComponent } from "./search/search.component";



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, AddEditProductComponent, ConfirmDialogModule, ConfirmDialogModule, ToastModule, FilterComponent, SearchComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})
export class ProductComponent implements OnDestroy{
  products: Product[]=[];
  

  constructor(private productService:ProductService,private confirmationService:ConfirmationService,private messageService:MessageService){}

  displayAddEditModal=false;
  selectedProduct:any=null;
  subscriptions:Subscription[]=[];
  pdtSubscription:Subscription=new Subscription();

  ngOnInit():void{
    this.getProductList();
  }
 getProductList(category?:string){
  this.pdtSubscription=this.productService.getProducts(category ||"").subscribe(
    response=>{
      this.products=response
    }
  )
  this.subscriptions.push(this.pdtSubscription);
 }

 showDialog(){
 
  this.displayAddEditModal=true;
   }

   hideAdd(isClosed:boolean){
  this.displayAddEditModal=!isClosed;
  if (isClosed) {
    this.selectedProduct = null; 
}
   }
   saveOrUpdateProductList(newData:any){
  if(this.selectedProduct&&newData.id==this.selectedProduct.id){
    const productIndex=this.products.findIndex(data=>data.id==newData.id);
  this.products[productIndex]=newData;}else{
    this.products.unshift(newData);
  }
   }
   showEditModal(product:Product){
    this.displayAddEditModal=true;
    this.selectedProduct=product;
    
   }

   deleteProduct(event:Event,product:Product){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          
          this.productService.deleteProduct(product.id).subscribe(
            response=>{
              this.products=this.products.filter(data=>data.id!==product.id)
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Produkt został usunięty' });
            },error=>{
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Produkt nie został usunięty' });
            }
          )
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Produkt nie został usunięty' });
      }
  });

   }
   getProductByCategory(category:string){
    this.getProductList(category);
  }
   ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }



  }
