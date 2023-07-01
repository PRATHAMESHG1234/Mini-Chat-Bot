const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

let input = 'How can I manage my time?';

// Define custom list of stop words
const stopWords = ['a', 'an', 'the', 'can', 'my'];

// Extract important words from input
const inputWords = tokenizer
  .tokenize(input.toLowerCase())
  .filter((word) => !stopWords.includes(word));

// Modify the input using getSimilarDiscreptionWords

console.log('Input Words:', inputWords);
console.log('Modified Input:', input);
