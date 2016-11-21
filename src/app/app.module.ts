import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ArtistListComponent} from './artist/artist-list.component'
import {ArtistDetailComponent} from './artist/artist-detail.component'

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, ArtistListComponent, ArtistDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
