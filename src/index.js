const radicals = require('./radicals.json');
const HanziWriter = require('hanzi-writer');
const lottie = require('lottie-web');

const banner = lottie.loadAnimation({
  container: document.querySelector('#banner'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'banner.json' // the path to the animation json
});

banner.addEventListener('complete', () => {
  const event = new Event('start');
  document.dispatchEvent(event);
});

const infinite = lottie.loadAnimation({
  container: document.querySelector('#infinite'), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'infinite.json' // the path to the animation json
});

const button = document.querySelector('button');
const img = document.querySelector('img');
const meaning = document.querySelector('#meaning');
const no = document.querySelector('#no');
const strokeCount = document.querySelector('#count');
const frequency = document.querySelector('#freq');
const pinyin = document.querySelector('#pinyin');
const note = document.querySelector('#note');
let showOutline = true;
let nCorrect = 0;

const writer = HanziWriter.create('character', character.character, {
  width: 500,
  height: 500,
  drawingColor: '#000',
  strokeColor: '#000',
  showOutline: true,
  showCharacter: false,
  showHintAfterMisses: 1,
  drawingWidth: 20,
});

button.addEventListener('click', () => {
  showOutline = !showOutline;
  if (showOutline) {
    writer.showOutline();
    img.src = 'eye-regular.svg';
  } else {
    writer.hideOutline();
    img.src = 'eye-slash-regular.svg';
  }
});

const event = new Event('start');

document.addEventListener('start', () => {
  const character = radicals[Math.floor(Math.random() * radicals.length)];
  meaning.textContent = character.meaning;
  no.textContent = `No : ${character.no}`;
  strokeCount.textContent = `Stroke count: ${character.strokeCount}`;
  frequency.textContent = `Frequency : ${character.frequency}`;
  pinyin.textContent = `Pinyin : ${character.pinyin}`;
  note.textContent = character.note;

  // while (origin.firstChild) {
  //   origin.removeChild(origin.lastChild);
  // }

  // character.glyphOrigin.forEach((src) => {
  //   const img = document.createElement('img');
  //   img.src = `img/${src}`;
  //   origin.appendChild(img);
  // });

  writer.setCharacter(character.radical[0]);
  writer.quiz({
    onComplete: () => {
      nCorrect++;
      setTimeout(() => {
        banner.goToAndPlay(0, false);
      }, 1000);
    },
  });
});

document.dispatchEvent(event);
