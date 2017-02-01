import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersResolver } from './components/users/users.resolver';
import { UsersComponent } from './components/users/users.component';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    UsersComponent,
    CounterComponent,
    AppComponent
  ],
  providers: [
    UsersResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }