const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const coverImg = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__play');
const volumeSlider = document.querySelector('.volume__slider');
const wave = document.getElementById('wave');

// son names
const songs = ['Matrang & Баста - Привет', 'MATRANG - Провода', 'MATRANG - Руки на руке', ]

// default song
let songIndex = 0

const loadSong = (song) => {
	title.innerHTML = song
	audio.src = `assets/${song}.mp3`
	coverImg.src = `assets/cover${songIndex + 1}.png`

}

loadSong(songs[songIndex])

// play
function playMusic() {
	player.classList.add('play')
	coverImg.classList.add('activeBanner')
	imgSrc.src = './assets/pause.png'
	wave.classList.add('loader');
	audio.play();
}
// pause
function pauseMusic() {
	player.classList.remove('play')
	coverImg.classList.remove('activeBanner')
	imgSrc.src = `assets/play.png`
	wave.classList.remove('loader');
	audio.pause();
}
// listener play
playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying) {
		pauseMusic()
	} else {
		playMusic()
	}
})


// next
function nextMusic() {
	songIndex++
	if (songIndex > songs.length - 1) {
		return songIndex = 0
	}
	loadSong(songs[songIndex])
	playMusic()
}

// listener next
nextBtn.addEventListener('click', () => {
	nextMusic()
})

// prev
function prevMusic() {
	songIndex--
	if (songIndex < 0) {
		return songIndex = songs.length - 1
	}
	loadSong(songs[songIndex])
	playMusic()
}
// listener
prevBtn.addEventListener('click', () => {
	prevMusic()
})

// progress line
function progressline(e) {
	const { currentTime, duration } = e.srcElement
	const progressMusicLine = (currentTime / duration) * 100
	progress.style.width = `${progressMusicLine}%`
}

// listener progressMusicLine
audio.addEventListener('timeupdate', progressline)

// set peogres music
function setProgress(e) {
	const width = this.clientWidth
	const getCordinateX = e.offsetX
	const durationMusic = audio.duration
	console.log(durationMusic)
	console.log(getCordinateX)
	audio.currentTime = (getCordinateX / width) * durationMusic
}

// listener setProgress
progressContainer.addEventListener('click', setProgress)

// autoplay
audio.addEventListener('ended', ()=>{
	player.classList.remove('play')
	coverImg.classList.remove('activeBanner')
	wave.classList.remove('loader');
	imgSrc.src = `assets/play.jpg`
	nextMusic()
})

// volume
function setVolume() {
	audio.volume = volumeSlider.value / 100;
}
