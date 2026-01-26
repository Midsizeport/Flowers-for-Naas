
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