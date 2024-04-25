import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {SignoutComponent} from "../signout/signout.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    SignoutComponent,
    InvoiceComponent,
    MatTabGroup,
    MatTab,
    MatIcon,
    MatTabLabel
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
