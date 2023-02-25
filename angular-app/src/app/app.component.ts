import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chat-app';
  data: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ data: string }>('/api/data')
      .subscribe((data: { data: string }) => {
        this.data = data.data;
      });
  }
}
