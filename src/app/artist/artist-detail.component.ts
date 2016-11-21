import { Component } from '@angular/core';
import { ArtistService } from './artist.service';

@Component({
    selector: 'artist-detail',
    template: require('./artist-detail.component.html')
})

export class ArtistDetailComponent {
    artist;
    artistId: '630662';

  constructor(private artistService: ArtistService) {
    this.artist = this.artistService.getArtist('630662');
  }
}