import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { JoinRoomComponent } from './join-room/join-room.component';
import { ChatComponent } from './chat/chat.component';
import { ParentComponent } from './parent/parent.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinRoomComponent,
    ChatComponent,
    ParentComponent,
    AuthComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
