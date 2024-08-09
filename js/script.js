// Плавные якоря героя
const anchors = document.querySelectorAll('a.scroll-to');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const blockID = anchor.getAttribute('href');
    
    document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth' ,
        // behavior: 'smooth или auto' ,
        block: 'center',
        // block: 'start, center, end или nearest',
    });
  })
};
// 



// Модальные окна

// Библиотека создает функцию closest. 
// Используя её мы можем искать элемент, который находится выше по дереву 
// и класс которого совпадает с тем который мы ищем.
!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
// 

document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
    };
}, false);

document.addEventListener('DOMContentLoaded', function() {
    let modalButtons = document.querySelectorAll('.js-open-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');
    
    modalButtons.forEach(function(item){
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var modalId = this.getAttribute('data-modal'),
            modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
            modalElem.classList.add('active');
        });
    });

    closeButtons.forEach(function(item) {
        item.addEventListener('click', function(e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
        });
    });
});
// 

// Функционал плеера телефона
let trackPic = document.querySelector(".hero__phone-album-cover"),
    trackName = document.querySelector(".hero__phone-song-title"),
    trackArtist = document.querySelector(".hero__phone-song-artist");

let playPauseBtn = document.querySelector(".hero__btn-playpause"),
    prevBtn = document.querySelector(".hero__btn-before"),
    nextBtn = document.querySelector(".hero__btn-after");

let seekSlider = document.querySelector(".seek-slider"),
    volumeSlider = document.querySelector(".volume-slider"),
    curr_track = document.createElement("audio");

let track_index = 0;
let isPLaying = false;
let updateTimer;

const music_list = [
    {
        img : "/pics/phoneEllipse.png",
        name : "Rain and Thunder - Nature Sounds",
        artist : "JuliusH",
        music : "/musics/RainAndThunder-NatureSounds.mp3"
    },
    {
        img : "/pics/undertale.jpg",
        name : "Start Menu",
        artist : "Toby Fox",
        music : "/musics/StartMenu.mp3"
    },
    {
        img : "/pics/ostrovSokrovishc.jpg",
        name : "Шанс!",
        artist : "Остров сокровищ",
        music : "/musics/OstrovSokrovishcChance.mp3"
    },
    {
        img : "/pics/undertale.jpg",
        name : "Your Best Friend",
        artist : "Toby Fox",
        music : "/musics/YourBestFriend.mp3"
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    trackPic.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    trackName.textContent = music_list[track_index].name;
    trackArtist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);
}

function reset(){
    seekSlider.value = 0;
}

function repeatTrack() {
    let curr_index = track_index;
    loadTrack(curr_index);
    playTrack();
}

function playPauseTrack(){
    isPLaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPLaying = true;
    trackPic.classList.add("rotate");
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPLaying = false;
    trackPic.classList.remove("rotate");
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function nextTrack() {
    if(track_index < music_list.length - 1){
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if(track_index > 0){
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seekSlider.value / 100);
    curr_track.curentTime = seekto;
}

function setVolume(){
    curr_track.volume = volumeSlider.value / 100;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seekSlider.value = seekPosition;
    }
}