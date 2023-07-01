const stringSimilarity = require('string-similarity');

// Define the collection of sentences
const sentences = [
  "I'm looking forward to seeing this movie.",
  'This is another sentence.',
  'Here is a sentence with different words.',
];

// Define the query sentence for which you want to find similar sentences
const query = 'This is a similar sentence.';

// Calculate the similarity score between the query and each sentence in the collection
const similarityScores = sentences.map((sentence) =>
  stringSimilarity.compareTwoStrings(query, sentence)
);

// Sort the similarity scores in descending order
const sortedScores = similarityScores
  .map((score, index) => ({ sentence: sentences[index], score }))
  .sort((a, b) => b.score - a.score);

// Print the top similar sentences
const topSimilarSentences = sortedScores
  .slice(0, 3)
  .map((result) => result.sentence);
console.log('Top similar sentences:');
console.log(topSimilarSentences);
