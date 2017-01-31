import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { CounterComponent } from './components/counter/counter.component';
import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
   BrowserModule,
   ReactiveFormsModule,
   HttpModule,
   RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent, 
    UsersComponent,
    CounterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }