import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { usernameValidator } from '../Validators/username-validator';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../shared/password.match';
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { error } from 'console';
import { User } from '../interface/auth';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CardModule,NgIf,ButtonModule,RouterLink,ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  
  registerForm=this.fb.group({
    fullName:['',[Validators.required,usernameValidator]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required ]]
  },
  {
    validators:passwordMatchValidator
  }

)
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private messageService:MessageService,
    private router:Router
  ){}

  get fullName(){
  return this.registerForm.controls['fullName'];
 }
  get email(){
  return this.registerForm.controls['email'];
 }
 get password(){
  return this.registerForm.controls['password'];
 }
 get confirmPassword(){
  return this.registerForm.controls['confirmPassword'];
 }
 submitDetails(){
 const postData={...this.registerForm.value};
 delete postData.confirmPassword;
 this.authService.register(postData as User).subscribe(
  response=>{
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Rejestracja się powiodła' });
    this.router.navigate(['login'])
  },
  error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rejestracja się nie powiodła' });
  }
 )

 }

}
