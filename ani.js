console.log("Welcome to Tunebeats");

// Initialize variables
let songIndex = 0;
const audioElement = new Audio();
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));
const songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

const songs = [
    { songName: "Vatthi Coming", filePath: "songs/ani1.mp3", coverPath: "covers/ani1.webp" },
    { songName: "Dippam Dippam", filePath: "songs/ani2.mp3", coverPath: "covers/ani2.webp" },
    { songName: "Chellamma", filePath: "songs/ani3.mp3", coverPath: "covers/ani3.jpg" },
    { songName: "Vikram title track", filePath: "songs/ani4.mp3", coverPath: "covers/ani4.jpg" },
    { songName: "Badass", filePath: "songs/ani5.mp3", coverPath: "covers/ani5.jpg" },
    { songName: "Hayyoda", filePath: "songs/ani6.mp3", coverPath: "covers/ani6.jpg" },
    { songName: "Why this kolaveridi", filePath: "songs/ani7.mp3", coverPath: "covers/ani7.jpeg" },
   
];

// Load song data into UI and set the correct ID for play buttons
songItems.forEach((element, i) => {
    const imgElement = element.querySelector("img");
    const nameElement = element.querySelector(".songName");
    const playButton = element.querySelector(".songItemPlay"); // Get the play button in this item

    if (imgElement) {
        imgElement.src = songs[i].coverPath;
    }
    if (nameElement) {
        nameElement.innerText = songs[i].songName;
    }
    if (playButton) {
        playButton.id = i.toString(); // Set the ID to the current index
    }
});

// Play a specific song
const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.error("Playback failed:", error);
        // Optionally handle the error, e.g., display a message to the user
    });
    songIndex = index;
    updatePlayPauseIcons();
    gif.style.opacity = 1;
};

// Pause the current song
const pauseSong = () => {
    audioElement.pause();
    updatePlayPauseIcons();
    gif.style.opacity = 0;
};

// Update play/pause icons
const updatePlayPauseIcons = () => {
    songItemPlays.forEach((el, i) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
        if (i === songIndex && !audioElement.paused) {
            el.classList.remove('fa-circle-play');
            el.classList.add('fa-circle-pause');
        }
    });

    if (audioElement.paused) {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    } else {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
};

// Master play/pause button functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        playSong(songIndex);
    } else {
        pauseSong();
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek song functionality
myProgressBar.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    }
});

// Song item play button functionality
songItemPlays.forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id); // Now this ID will be correct
        if (clickedIndex === songIndex) {
            if (audioElement.paused) {
                playSong(songIndex);
            } else {
                pauseSong();
            }
        } else {
            playSong(clickedIndex);
        }
    });
});

// Next button functionality
nextButton.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous button functionality
previousButton.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Play the first song on load (optional)
// playSong(songIndex);