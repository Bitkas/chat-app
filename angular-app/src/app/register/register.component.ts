import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): void {
    const user = {
      "username": username,
      "password": password
    };

    const req = this.http.post("/register", user);

    req.subscribe((res) => {
      console.log("user created: ", res);
      this.router.navigate(["login"]);
    })
  }
}
