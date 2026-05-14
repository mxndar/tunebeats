


console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songName: "1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
];

// Load songs into UI
songItems.forEach((element, i) => {
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
});

// Update all buttons to play icon
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
    el.classList.remove('fa-circle-pause');
    el.classList.add('fa-circle-play');
  });
};

// Update master play icon
const updateMasterPlayIcon = () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  } else {
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  }
};

// Master play/pause button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
  } else {
    audioElement.pause();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-pause');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-play');
  }
  updateMasterPlayIcon();
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Seek song
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Song item play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    let clickedIndex = parseInt(e.target.id);

    if (songIndex === clickedIndex && !audioElement.paused) {
      // Pause current song
      audioElement.pause();
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
      updateMasterPlayIcon();
      return;
    }

    // Play new song
    songIndex = clickedIndex;
    makeAllPlays();
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateMasterPlayIcon();
  });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
  document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
  updateMasterPlayIcon();
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
  document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
  updateMasterPlayIcon();
});

