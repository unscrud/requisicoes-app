import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private user;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }
}
