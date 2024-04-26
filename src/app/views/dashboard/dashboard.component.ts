import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {SignoutComponent} from "../signout/signout.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../../common/model/models";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
    MatTabLabel,
    MatFabButton,
    NgIf,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userDetails: UserDetails | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.getUserDetails()
  }

  getUserDetails(): void {
    this.http.get<UserDetails>(environment.apiUrl.concat("/user/details"))
      .subscribe(
        (response) => {
          this.userDetails = response
        },
        (error) => {
          console.error('Error creating account:', error);
          this.snackBar.open('Error when trying load user details', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
