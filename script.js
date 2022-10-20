const quotes = [
  'Things are only impossible until they are not',
  'It is possible to commit no errors and still lose. That is not a weakness. That is life',
  'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
  'Without freedom of choice there is no creativity',
  'Logic is the beginning of wisdom, not the end',
  'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
  'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");

//let targetWord;
//just for testing the function
let wordQueue;
let quoteText;
let highlightPosition;
// declare variable when someone starts the game
let startTime;

function startGame() {
  console.log("Game Started!");
  console.log(quotes.length);

  // Math.floor in js to transform every variable in a number
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  // Math.random does random the quotes, so it mixes up the quotes, so the order is different
  // will return a random number from 1 to 7

  // text appears below the start button
  // targetWord = "typeme";
  // Satz einsetzen
  // den nächsten Quote brauch ma nimma
  //quoteText = "Improve a mechanical";
  // takes the number you get above and takes this quote
  quoteText = quotes[quoteIndex];
  // diesen Satz wieder teilen bei den Leerzeichen
  wordQueue = quoteText.split(" ");

  document.body.className = "";
  start.className = "start";

  message.innerHTML = "";

  //quote.innerHTML = `<span>${targetWord}</span>`;
  // instead this:
  quote.innerHTML = wordQueue.map((word) => `<span>${word}</span>`).join("");

  // starts markin with the first word
  highlightPosition = 0;
  //
  quote.childNodes[highlightPosition].className = "highlight";

  startTime = new Date().getTime();
  //console.log(startTime);
  setTimeout(()=> {
    start.className = "button";
  }, 2000);
}

function checkInput() {
  // console.log("checking", input.value);
  //const currentWord = targetWord;
  const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
  //const typedValue = input.value;
  const typedValue = input.value.trim();
  //console.log("no trim:", input.value, "with trim:" typedValue);
  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? "" : "error";
    return;
  }

  wordQueue.shift();
  // if word right in the end, it disappears
  input.value = "";

  // grab the paragraph/the childnodes a specific position and reset the highlighting
  // so not highlighted anymore
  quote.childNodes[highlightPosition].className = "";

  //if no more text to check
if (wordQueue.length === 0){
  //then end the game, there is no more word to write
  gameOver();
  return;
}

  // add to the highlightPosition for the next round
  highlightPosition++;
  quote.childNodes[highlightPosition].className = "highlight";
}

// define the gameover function: we need to define a end in the html
function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  document.body.className = "winner";
  message.innerHTML= `<span class="congrats">Congratulation"!</span><br>
  You finished in ${elapsedTime / 1000} seconds`;
}



//check if what I am writing is the same, if not --> display red background

//element.addEventListener(event, function);
input.addEventListener("input", checkInput);
start.addEventListener("click", startGame);
