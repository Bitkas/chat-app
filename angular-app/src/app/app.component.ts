import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'chat-app';
  data = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ data: string }>('/api/data')
      .subscribe((data: { data: string }) => {
        this.data = data.data;
      });
  }
}
