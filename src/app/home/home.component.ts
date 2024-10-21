import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  constructor(private router:Router){}

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['login'])

  }

}
