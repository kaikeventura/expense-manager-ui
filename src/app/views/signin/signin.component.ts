import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";

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
    FlexModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

}
