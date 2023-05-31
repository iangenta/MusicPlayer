 songList = [
    {
        title: "Highway to Hell",
        artist: "AC/DC",
        img: "acdc-highway-to-hell.jpg",
        audio: "acdc-highway-to-hell.mp3"
    },
    {
        title: "You Shook Me All Night Long",
        artist: "AC/DC",
        img: "ysmanl.png",
        audio: "ACDC-You-Shook-Me-All-Night-Long.mp3"
    },
    {
        title: "Welcome to the Jungle",
        artist: "Guns N' Roses",
        img: "guns-welcome-to-the-jungle.jpg",
        audio: "GNR-WelcomeToTheJungle.mp3"
    }
];

function openNav() {
    document.getElementById("sideNavigation").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

let currentSong = null;

const songsList = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", togglePlay);
prev.addEventListener("click", playPreviousSong);
next.addEventListener("click", playNextSong);

function loadSongs() {
    songList.forEach((song, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = song.title + ' - ' + song.artist;
        link.href = "#";
        link.addEventListener("click", () => loadSong(index));
        li.appendChild(link);
        songsList.appendChild(li);
    });
}

function loadSong(songIndex) {
    if (songIndex !== currentSong) {
        changeActiveClass(currentSong, songIndex);
        currentSong = songIndex;
        audio.src = "../assets/audio/" + songList[songIndex].audio;
        playSong();
        changeSongTitle(songIndex);
        changeCover(songIndex);
    }
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
}

function setProgress(event) {
    const totalWidth = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / totalWidth) * duration;
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    audio.play();
    play.innerHTML = '<span class="material-icons-round">pause</span>';
}

function pauseSong() {
    audio.pause();
    play.innerHTML = '<span class="material-icons-round">play_arrow</span>';
}

function playPreviousSong() {
    if (currentSong > 0) {
        loadSong(currentSong - 1);
    } else {
        loadSong(songList.length - 1);
    }
}

function playNextSong() {
    if (currentSong < songList.length - 1) {
        loadSong(currentSong + 1);
    } else {
        loadSong(0);
    }
}

function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}

function changeCover(songIndex) {
    cover.src = "../assets/img/" + songList[songIndex].img;
}

function changeSongTitle(songIndex) {
    title.innerText = songList[songIndex].title;
    artist.innerText = songList[songIndex].artist;
}

audio.addEventListener("ended", playNextSong);

loadSongs();
