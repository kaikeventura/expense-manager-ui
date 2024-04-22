import { Component } from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [
    MatFabButton, MatIcon
  ],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {

  signOut() {
    localStorage.clear()
    window.location.href = '/signin'
  }
}
