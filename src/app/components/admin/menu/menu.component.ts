import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user?: Observable<firebase.User | null>;

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authServ.authUser();
  }

  sair(){
    this.authServ.logout().then(()=>this.router.navigate(['/']));
  }
}
