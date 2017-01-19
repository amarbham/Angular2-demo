import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users.component';


@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
