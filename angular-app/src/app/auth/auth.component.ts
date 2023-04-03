import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(username: string, password: string): void {
    const user = {
      "username": username,
      "password": password
    };

    const req = this.http.post("/login", user);

    req.subscribe((res) => {
      console.log("LOGIN: ", res);
      this.router.navigate(["createRoom"]);

    })
  }
}
