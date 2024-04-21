import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatLabel,
    MatCardTitle,
    FlexModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  signUp() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Replace 'your-api-endpoint' with your actual API endpoint URL
    this.http.post<any>(environment.apiUrl.concat("/sign-up"), userData)
      .subscribe(
        (response) => {
          localStorage.setItem('accessToken', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error creating account:', error);
          this.snackBar.open('Error creating account. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
