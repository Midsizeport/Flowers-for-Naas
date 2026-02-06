
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('I miss you, my Naasiah').split('')
    const secondLine = 'Enjoy the song, baby <3'.split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 100);
      } else {
        // Add line break and start second line
        titleElement.innerHTML += '<br>';
        appendSecondLine();
      }
    }

    let secondIndex = 0;
    function appendSecondLine() {
      if (secondIndex < secondLine.length) {
        titleElement.innerHTML += secondLine[secondIndex];
        secondIndex++;
        setTimeout(appendSecondLine, 100);
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};

// Music Player Functionality
const songs = [
  'ALWAYS BEEN YOU - Chris Grey.mp3',
  'Belong to you - Josh Makazo.mp3',
  'Closer - Ne-yo.mp3',
  'Compass - The Neighbourhood.mp3',
  'Flight\'s Booked - Drake.mp3',
  'Let Me Love You ft - Ariana Grande.mp3',
  'Mirrors - Justin Timberlake.mp3',
  'Miss Independent - Ne-yo.mp3',
  'ON UR MIND - PARTYNEXTDOOR.mp3',
  'Part of the list - Ne-yo.mp3',
  'Soft Spot - Keshi.mp3',
  'Thinking Bout You - Ariana Grande.mp3',
  'Touch It - Ariana Grande.mp3',
  'US AGAINST THE WORLD - Chris Grey.mp3'
];

let currentSongIndex = 1; // Start with "Belong to you - Josh Makazo.mp3"

const audio = document.getElementById('bgMusic');
const songDisplay = document.getElementById('songDisplay');
const nextSongBtn = document.getElementById('nextSongBtn');

function updateSongDisplay() {
  const songName = songs[currentSongIndex].replace('.mp3', '');
  songDisplay.textContent = songName;
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  const newSongPath = 'audio/' + songs[currentSongIndex];
  
  audio.src = newSongPath;
  updateSongDisplay();
  audio.play().catch(function(error) {
    console.log('Could not play audio:', error);
  });
}

nextSongBtn.addEventListener('click', playNextSong);

// Play music when page loads
window.addEventListener('load', function() {
  updateSongDisplay();
  audio.play().catch(function(error) {
    console.log('Autoplay was prevented:', error);
  });
});

// Polaroid Image Carousel Functionality
const images = [
  'Pictures/1.jpeg',
  'Pictures/2.jpeg',
  'Pictures/3.png',
  'Pictures/4.jpeg',
  'Pictures/5.jpeg'
];

let currentImageIndex = 0;
let carouselAutoplayInterval;

const polaroidImage = document.getElementById('polaroidImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateImage(index) {
  polaroidImage.style.opacity = '0';
  
  setTimeout(() => {
    polaroidImage.src = images[index];
    polaroidImage.style.opacity = '1';
  }, 250);
  
  currentImageIndex = index;
  resetAutoplay();
}

function showNextImage() {
  const nextIndex = (currentImageIndex + 1) % images.length;
  updateImage(nextIndex);
}

function showPrevImage() {
  const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage(prevIndex);
}

function resetAutoplay() {
  clearInterval(carouselAutoplayInterval);
  startAutoplay();
}

function startAutoplay() {
  carouselAutoplayInterval = setInterval(showNextImage, 10000); // Change every 10 seconds
}

// Event listeners for buttons
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Start autoplay when page loads
window.addEventListener('load', function() {
  startAutoplay();
});
