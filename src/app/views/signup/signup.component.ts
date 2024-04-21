import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";

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
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private http: HttpClient) { }

  signUp() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Replace 'your-api-endpoint' with your actual API endpoint URL
    this.http.post(environment.apiUrl.concat("/sign-up"), userData)
      .subscribe(
        (response) => {
          console.log('Account created successfully:', response);
          // Optionally, you can redirect the user to the sign-in page
        },
        (error) => {
          console.error('Error creating account:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }
}
