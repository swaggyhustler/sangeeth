
// Other existing code...

console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

// Song data
let songs = [
    {songName: "Arjan vailly", filePath: "gaane/Arjan Vailly Animal 320 Kbps.mp3", coverPath: "covers/animal.png"},
    
    // Add more songs here...
];

// Update song list
const updateSongList = () => {
    songs.forEach((song, i) => { 
        document.getElementById(`songItemPlay${i}`).addEventListener('click', () => { 
            playSong(i); 
        });
    });
};

// Play a song
// const playSong = (index) => {
//     songIndex = index;
//     audioElement.src = songs[index].filePath;
//     masterSongName.innerText = songs[index].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     gif.style.opacity = 1;
//     masterPlay.classList.remove('fa-play-circle');
//     masterPlay.classList.add('fa-pause-circle');
// };

// Play/Pause button click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Next button click
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous button click
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Initialize song list
updateSongList();

