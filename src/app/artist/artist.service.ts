export class ArtistService {
    getArtists() {

        return Object.keys(this.artists).map(id => {
            const artist = this.artists[id]
         console.log(artist)
            return {
                id: artist.id,
                name: artist.name
            };
        });
    }
    getArtist(id) {
        console.log(id)
        return this.artists[id];
    }
    private artists = {
        "630662": {
            "id": "630662",
            "name": "Jard",
            "description": "A loud sound"
        },
        "630663": {
            "id": "630663",
            "name": "Apha",
            "description": "mooomoo"
        }
    }
}
