// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Shine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "My Heart", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// -------------------- FUNCTIONS --------------------

// Function to play a song
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// Function to make all plays inactive
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// -------------------- EVENT LISTENERS --------------------

// Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress Bar Update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next Button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    playSong();
});

// Previous Button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    playSong();
});

// Auto-Play Next Song when current ends
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    playSong();
});

// Initialize song items
initializeSongItems();
