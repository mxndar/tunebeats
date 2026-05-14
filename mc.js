
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
    { songName: "Tujhe Bhula Diya", filePath: "Mohit Chouhan/hm1.mp3", coverPath: "covers/hmc1.jpg" },
    { songName: "Abhi Kuch Dino Se", filePath: "Mohit Chouhan/hm2.mp3", coverPath: "covers/hmc2.jpg" },
    { songName: "Bheegi Si Bhaagi Si", filePath: "Mohit Chouhan/hm3.mp3", coverPath: "covers/hmc3.jpg" },
    { songName: "Dooba Dooba", filePath: "Mohit Chouhan/hm4.mp3", coverPath: "covers/hmc4.jpg" },
    { songName: "Masakali", filePath: "Mohit Chouhan/hm5.mp3", coverPath: "covers/hmc5.jpg" },
    { songName: "Is This Love", filePath: "Mohit Chouhan/hm6.mp3", coverPath: "covers/hmc6.jpg" },
    { songName: "Pee Loon", filePath: "Mohit Chouhan/hm7.mp3", coverPath: "covers/hmc7.jpg" },
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

