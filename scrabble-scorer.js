//* inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85*/

const input = require("readline-sync");
let word='';

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your prdogram won't work as expected. //

function initialPrompt() {
   word=input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return word;
}


let simpleScorer= {name:"Simple Score", description:"Each letter is worth 1 point", scoringFunction:simpleScore};

function simpleScore(word){
  word=word.toUpperCase();
  letterPoints=0
  for (i=0; i<word.length;i++){
    letterPoints++
  }
  return letterPoints
}

let vowelBonusScorer={name:"Bonus Vowels", description:"Vowels are 3 pts, consonants are 1 pt", scoringFunction:vowelBonusScore};

function vowelBonusScore(word){
  word=word.toUpperCase();
  letterPoints=0
  for (i=0; i<word.length;i++){
     if(word[i]== 'A'|| word[i]== 'E'||word[i]== 'I'||word[i]== 'O'||word[i]== 'U'){
       letterPoints+=3
     }else{
       letterPoints+=1
     }
  }
   return letterPoints
}

let scrabbleScorer={name:"Scrabble", description:"The traditional scoring algorithm.", scoringFunction:scrabbleScore};

function scrabbleScore(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    for (letter in newPointStructure) {
      if (letter == word[i] ) {
        letterPoints += Number(newPointStructure[letter])
      }
    }
  }
  return letterPoints;
}


const scoringAlgorithms = [simpleScorer, vowelBonusScorer,scrabbleScorer];

function scorerPrompt() {
  console.log("Which scoring method would you like to use?")
  let num=input.question( "please enter 0, 1 or 2: ")

    if (num==0) {console.log("Your Score for " + word +":" +scoringAlgorithms[0].scoreFunction(word))
  }else if (num==1){console.log("Your Score for " +word +":" +scoringAlgorithms[1].scoreFunction(word))
  }else{console.log("Your Score for " + word +":" +scoringAlgorithms[2].scoreFunction(word))
  }
  return num
}

function transform(object) {
  let newObject = {}
  for (item in object) {
    let change = 0
    while (change < object[item].length) {
      let newKey = object[item][change]
      newKey = newKey.toLowerCase()
      newObject[`${newKey}`] = Number(item);
      change++
    }
  }
  return newObject
};


let newPointStructure=transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

