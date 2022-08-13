const { MarkovMachine } = require('./markov'); 


describe('Testing MarkovMachine', function() {
  let text; 

  beforeEach(function() {
    let mm = new MarkovMachine('the cat in the hat');
    text = mm; 
  })

  test('testing the overall class', function() {
    text = text.makeText();

    expect(text).toBeTruthy(); 
    expect(text).toEqual(expect.any(String));
  })

  test('the make chains function', function() {
    text.makeText(); 
    expect(text.chain).toEqual(expect.any(Object));
  })
})