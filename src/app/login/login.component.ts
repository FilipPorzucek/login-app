import { Component } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button'
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { response } from 'express';
import { error } from 'console';
import { NgIf } from '@angular/common';
import { usernameValidator } from '../Validators/username-validator';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PanelModule,FormsModule,ButtonModule,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  errorMessage :string|null=null;
loginForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required]]

})

constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private messageService:MessageService){};

get email(){
  return this.loginForm.controls['email'];
}
get password(){
  return this.loginForm.controls['password'];
}

loginUser(){

  const {email,password}=this.loginForm.value;
  this.authService.login(email as string).subscribe(
    response=>{
      if(response.length>0 && response[0].password===password){
        sessionStorage.setItem('email',email as string);
        this.router.navigate(['/home'])
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Logowanie się nie powiodło-wprowadź poprawne dane' });
      }
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Coś poszło nie tak' });
    }
  )

}

}
