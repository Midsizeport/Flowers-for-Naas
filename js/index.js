const title = document.querySelector('.title')
const text = "Hi, My Cinnabon <3".split('')
const sectext =  "I couldn't get roses,".split('')
const thirdtext = " but these flowers might".split('')
const fourthtext = "make it up to you.".split('')

// Create container for better responsive layout
title.style.display = 'flex'
title.style.flexWrap = 'wrap'
title.style.justifyContent = 'center'
title.style.gap = '0.2rem'

for (let index = 0; index < text.length; index++) {
  if (text[index] !== ' ') {
    title.innerHTML += `<span>${text[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

// Add line break between texts
title.innerHTML += '<div style="width: 100%; height: 0; margin-bottom: 1.5rem;"></div>'

for (let index = 0; index < sectext.length; index++) {
  if (sectext[index] !== ' ') {
    title.innerHTML += `<span>${sectext[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

// Add line break between texts
title.innerHTML += '<div style="width: 100%; height: 0;"></div>'

for (let index = 0; index < thirdtext.length; index++) {
  if (thirdtext[index] !== ' ') {
    title.innerHTML += `<span>${thirdtext[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
};

// Add line break between texts
title.innerHTML += '<div style="width: 100%; height: 0;"></div>'

for (let index = 0; index < fourthtext.length; index++) {
  if (fourthtext[index] !== ' ') {
    title.innerHTML += `<span>${fourthtext[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

// Set flag to indicate user clicked the Open button
document.querySelector('.btn').addEventListener('click', function(event) {
  sessionStorage.setItem('userClickedOpen', 'true');
});