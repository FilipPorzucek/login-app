import { ApplicationConfig } from '@angular/core';
import { provideRouter, Route, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MessageService } from 'primeng/api';
import { authguardTsGuard } from './guards/authguard.ts.guard';



const routes:Routes=[
  {
path:'login',
component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'home',
  component:HomeComponent,
  canActivate:[authguardTsGuard]
},
{
path: '', redirectTo: 'home', pathMatch: 'full'
},
{
  path:'**',redirectTo:'home'
}


]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes ),
    MessageService
    
    
  ],
  
  
};