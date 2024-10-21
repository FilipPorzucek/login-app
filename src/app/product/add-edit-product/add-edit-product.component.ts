import { Component,Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgIf } from '@angular/common';
import { ProductService } from '../product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ButtonModule,DialogModule,ReactiveFormsModule,FormsModule,InputTextModule,InputNumberModule,InputTextareaModule,NgIf,ToastModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.sass'
})
export class AddEditProductComponent implements OnChanges{

@Input()  displayAddEditModal:boolean=true;
@Input() selectedProduct:any=null;
@Output() clickOnClose:EventEmitter<boolean>=new EventEmitter<boolean>();
@Output() clickAddEdit: EventEmitter<any>=new EventEmitter<any>();
modalType="Dodaj";



productForm=this.fb.group({
  title:["",Validators.required],
  price:[0,Validators.required],
  description:[""],
  category:["",Validators.required],
  image:["",Validators.required]
}) 
constructor(private fb:FormBuilder,private productService:ProductService,private messageService:MessageService){}

ngOnInit():void{}

ngOnChanges(): void {
    if(this.selectedProduct){
      this.modalType='Edytuj';
      this.productForm.patchValue(this.selectedProduct)
      
    }else {
      console.log('Resetting form');
      this.productForm.reset();
      this.modalType='Dodaj';
    }
}
closeModal(){
  this.productForm.reset();
  this.clickOnClose.emit(true);
  this.modalType='Dodaj';
  }

addEdtProduct(){
this.productService.saveUpdateProduct(this.productForm.value, this.selectedProduct).subscribe(
  response=>{
    this.clickAddEdit.emit(response);
    this.closeModal();
    const msg=this.modalType=='Dodaj'? 'Produkt dodany':'Produkt Zaktualizowany'
    this.messageService.add({ severity: 'success', summary: 'success', detail: msg });
  },
  error=>{
      this.messageService.add({ severity: 'Error', summary: 'Error', detail: 'Bład przy dodawaniu produktu' });
  
  }
)
}



}
