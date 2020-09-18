let header = document.querySelector(".header");
let content = document.querySelector("#content");
let click = document.querySelector("#click");
let clap = document.querySelector("#clap");
let play = document.querySelector("#play");
let count = 0;
let clicked = 0;
let even = document.querySelectorAll(".even");
let time = 30;
let minutes = 0;
let seconds = 0;
let counter = document.querySelector("#counter");
let interval = setInterval(setint, 1000);

function setint() {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  time--;
  counter.innerHTML = minutes + " : " + seconds;
  if (seconds == 0 && clicked < count) {
    clearInterval(interval);
    document.getElementById("counter").innerHTML = "Game Over";
    content.style.display = "none";
    header.innerHTML = "Oh no! You didn't click all the even numbers";
    voice("Oh no", "You didn't click all the even numbers");

    // alert('ERROR')
  } else if (seconds == 0 && clicked == count) {
    clearInterval(interval);
    document.getElementById("counter").innerHTML = "Game Over";
  }
}

even.forEach(e => {
  e.textContent = Math.floor(Math.random() * 50) + 1;
  if (e.textContent % 2 == 0) {
    count++;
  }
  e.addEventListener("click", function func() {
    if (e.textContent % 2 == 0) {
      // e.style.display = "none";
      e.style.color = "green";
      click.play();
      clicked++;
      e.removeEventListener("click", func);
    }
    if (clicked == count && time > 0) {
      header.innerHTML = "Congratulations! All even numbers clicked!";
      // list of languages is probably not loaded, wait for it
      voice("Congratulation", "You clicked all the even numbers");
      clapping();
    }
  });
});

function voice(a, b) {
  let first = a;
  let second = b;
  if (window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener("voiceschanged", function() {
      textToSpeech(a, b);
    });
  } else {
    // languages list available, no need to wait
    textToSpeech(a, b);
  }
}

function textToSpeech(first, second) {
  // get all voices that browser offers
  var available_voices = window.speechSynthesis.getVoices();
  // this will hold an english voice
  var english_voice = [];
  // find voice by language locale "en-US"
  // if not then select the first voice
  for (var i = 0; i < available_voices.length; i++) {
    if (available_voices[i].lang === "en-US") {
      english_voice.push(available_voices[i]);
      // break;
    }
  }
  // new SpeechSynthesisUtterance object
  var utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
  utter.pitch = 0.2;
  utter.text = first + window.localStorage.getItem("name", name) + second;
  utter.voice = english_voice[1];

  // speak
  window.speechSynthesis.speak(utter);
}

play.addEventListener("click", function() {
  window.location.reload();
});

function clapping () {
  var playMe = () => {
    clap.play();
    clearInterval(delay);
  };
  var delay = setInterval(playMe, 2000);
}

