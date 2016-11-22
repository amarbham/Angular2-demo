import { Component } from '@angular/core';
import { ArtistService } from './artist/artist.service';
import { ArtistListComponent } from './artist/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail.component';


@Component({
  selector: 'angular-tunes',
  providers: [ArtistService],
  template: `
    <div class="container">
      <artist-list *ngIf="state ==='artist-list'" 
        (artistSelect)="showArtistDetail($event)">
       </artist-list>
      <artist-detail *ngIf="state === 'artist-detail'"></artist-detail>
    </div>
    `
})

export class AppComponent {
  state = 'artist-list';
  
  showArtistDetail(artistId){
    this.state = 'artist-detail';
  }
}