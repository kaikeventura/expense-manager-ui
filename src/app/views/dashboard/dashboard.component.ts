import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {SignoutComponent} from "../signout/signout.component";
import {InvoiceComponent} from "./invoice/invoice.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    SignoutComponent,
    InvoiceComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
