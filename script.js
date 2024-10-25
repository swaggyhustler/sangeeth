document.addEventListener("DOMContentLoaded", function() {
    const songs = document.querySelectorAll(".card");
    const playButton = document.getElementById("play");
    const plays = document.querySelectorAll(".play");
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("previous");
    const volumeSlider = document.querySelector('input[name="volume"]');
    const seekBar = document.querySelector('.seekbar');
    const circle = document.querySelector('.circle');
    const audio = new Audio();

    let currentSongIndex = 0;
    let isDragging = false;
    let isPlaying = false; // Track whether audio is currently playing
    
    function playSong(index) {
        console.log("playSong");
        currentSongIndex = index;
        const song = songs[index];
        const audioElement = song.querySelector("audio");
        const title = song.querySelector("h2").textContent;
        const artist = song.querySelector("p").textContent;
        audio.src = audioElement.src;
        audio.play();
        playButton.src = "img/pause.svg"; // Adjust the file path for the pause button icon
        updateSongInfo(title, artist);
        updateProgressBar();
        isPlaying = true; // Update play state
    }

    function pauseSong() {
        console.log("pauseSong");
        audio.pause();
        playButton.src = "img/play.svg"; // Adjust the file path for the play button icon
        isPlaying = false; // Update play state
        updateProgressBar();
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong(currentSongIndex);
        }
    }

    function updateSongInfo(title, artist) {
        const songInfo = document.querySelector(".songinfo");
        songInfo.textContent = `${title} - ${artist}`;
    }
    
    function updateProgressBar() {
        const progress = (audio.currentTime / audio.duration) * 100;
        circle.style.left = `${progress}%`;
    }

    function playss(index) {
        console.log(index);
        playSong(index);
    }

    plays.forEach((play, index) => {
        play.addEventListener("click", () => {
            playss(index);
        });
    });

    nextButton.addEventListener("click", () => {
        console.log("next song");
        currentSongIndex = (currentSongIndex + 1)%songs.length;
        playSong(currentSongIndex);
    });

    previousButton.addEventListener("click", () => {
        console.log("prevsong");
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    playButton.addEventListener("click", () => {
        togglePlayPause(); // Toggle play/pause functionality
    });

    volumeSlider.addEventListener("input", function() {
        audio.volume = this.value / 100;
    });

    audio.addEventListener('timeupdate', () => {
        if (!isDragging) {
            updateProgressBar();
        }
    });

    seekBar.addEventListener('mousedown', () => {
        isDragging = true;
        document.addEventListener('mousemove', handleDragging);
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            document.removeEventListener('mousemove', handleDragging);
            isDragging = false;
        }
    });

    function handleDragging(event) {
        const barWidth = seekBar.offsetWidth;
        const newPosition = event.clientX - seekBar.getBoundingClientRect().left;
        const progress = (newPosition / barWidth) * 100;

        if (progress >= 0 && progress <= 100) {
            circle.style.left = `${progress}%`;
            audio.currentTime = (progress / 100) * audio.duration;
        }
    }
});

