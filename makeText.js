/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require('./markov');


const randText = (data) => {
  let mm = new MarkovMachine(data);
  console.log(mm.makeText()); 
}

const file = (path) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: `)
      console.error(err);
      process.exit(1);
    }
    randText(data); 
  })
}

const web = async (url) => {
  try {
    let res = await axios.get(url);
    let data = JSON.stringify(res.data);
    randText(data);
  } catch(err) {
    console.error(`Error fetching ${url}: `)
    console.error(err);
    process.exit(1);
  }
}

if(process.argv.length === 2) {
  process.exit(0);
} else {
  let arg = process.argv[2];
  let path = process.argv[3]; 
  if(arg === 'url') {
    web(path);
  } else if (arg === 'file') {
    file(path); 
  }
}