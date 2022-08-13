/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {};
    let words = this.words;
    words.forEach((el, i, arr) => {
      if(arr[i + 1] === undefined){arr[i + 1] = null}
      if (el in chain){
        chain[el].push(arr[i + 1]);
      } else {
        chain[el] = [arr[i + 1]]; 
      }
    })
    this.chain = chain; 
    // console.log(chain);
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let phrase = []; 
    let key = this.getRandom(Object.keys(this.chain)); 
    while(phrase.length < numWords && key !== null){
      phrase.push(key);
      key = this.getRandom(this.chain[key]); 
    }

    console.log(phrase.join(' ')); 
    return phrase.join(' '); 
  }

  getRandom(arr){
    return arr[Math.floor(Math.random() * arr.length)]; 
  }
}

// let mm = new MarkovMachine('the cat in the hat');
// mm.makeText();

module.exports = {
  MarkovMachine
}