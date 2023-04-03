import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ParentComponent } from './parent/parent.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: AuthComponent },
  { path: "createRoom", component: ParentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
