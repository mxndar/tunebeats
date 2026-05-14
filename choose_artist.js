document.addEventListener('DOMContentLoaded', () => {
    const artistContainer = document.querySelector('.artist-container');
    const artists = [
        { name: "Imagine Dragons", image: "images/imagine_dragons.jpg", genre: "Pop Rock" },
        { name: "Billie Eilish", image: "images/billie_eilish.jpg", genre: "Pop" },
        { name: "The Weeknd", image: "images/the_weeknd.jpg", genre: "R&B" },
        { name: "Queen", image: "images/queen.jpg", genre: "Rock" },
        { name: "Dua Lipa", image: "images/dua_lipa.jpg", genre: "Pop" },
        { name: "Coldplay", image: "images/coldplay.jpg", genre: "Alternative Rock" },
        // Add more artists here
    ];

    artists.forEach((artist, index) => {
        const artistItem = document.createElement('div');
        artistItem.classList.add('artist-item');
        artistItem.dataset.artistId = index; // Store an ID if needed later

        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = artist.name;

        const name = document.createElement('div');
        name.classList.add('artist-name');
        name.textContent = artist.name;

        const genre = document.createElement('div');
        genre.classList.add('artist-genre');
        genre.textContent = artist.genre;

        artistItem.appendChild(img);
        artistItem.appendChild(name);
        artistItem.appendChild(genre);

        artistItem.addEventListener('click', () => {
            // Handle artist selection here
            const selectedArtist = artists[index].name;
            console.log(`Artist selected: ${selectedArtist}`);
            // You might want to redirect to a page showing songs by this artist
            // or update the main music player's state.
            // Example:
            // window.location.href = `artist_songs.html?artist=${selectedArtist}`;
        });

        artistContainer.appendChild(artistItem);
    });
});