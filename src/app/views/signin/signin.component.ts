import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatLabel,
    MatCardTitle,
    FlexModule,
    FormsModule,
    MatAnchor,
    MatToolbar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  signIn() {
    const userData = {
      email: this.email,
      password: this.password
    };

    // Replace 'your-api-endpoint' with your actual API endpoint URL
    this.http.post<any>(environment.apiUrl.concat("/sign-on"), userData)
      .subscribe(
        (response) => {
          localStorage.setItem('accessToken', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error creating account:', error);
          this.snackBar.open('Error sign in account. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
