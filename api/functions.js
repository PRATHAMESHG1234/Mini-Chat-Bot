const natural = require('natural');
const axios = require('axios');
const data = require('./data');

async function getSimilarWords(word) {
  const endpoint = `https://api.datamuse.com/words?ml=${word}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    const similarWords = data.map((item) => item.word).join(' ');

    return similarWords;
  } catch (error) {
    console.error('Error fetching similar words:', error);
    return [];
  }
}
async function getSimilarDiscreptionWords(question) {
  const endpoint = `https://api.datamuse.com/words?ml=${question}`;

  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    const similardescription = data.map((item) => item.word).join(' ');
    return similardescription;
  } catch (error) {
    console.error('Error fetching similar questions:', error);
    return [];
  }
}
// Example usage

async function appendSimilarWordsToCategoriesAndDescreption(data) {
  for (const entry of data) {
    const similarCategory = await getSimilarWords(entry.problem_category);
    entry.problem_category = entry.problem_category + ' ' + similarCategory;

    const similardescription = await getSimilarDiscreptionWords(
      entry.problem_description
    );
    entry.problem_description =
      entry.problem_description + ' ' + similardescription;
  }
  // console.log(data);
  return data;
}

function preprocessDataset(dataset) {
  // console.log(dataset);
  const preprocessedDataset = dataset.map((entry) => {
    const insights = entry.philosophical_insights.map(
      (insight) => `${insight.sloka}: ${insight.translation}`
    );
    return {
      problem_category: entry.problem_category,
      problem_description: entry.problem_description,
      philosophical_insights: insights.join(' '),
    };
  });
  return preprocessedDataset;
}

function trainModel(preprocessedDataset) {
  const classifier = new natural.BayesClassifier();

  preprocessedDataset.forEach((entry) => {
    classifier.addDocument(
      entry.philosophical_insights,
      entry.problem_category
    );
  });

  classifier.train();

  return classifier;
}

function calculateAdjustedProbability(probability, oneWordMatches) {
  const adjustmentFactor = 0.1;
  const adjustedProbability = probability + adjustmentFactor * oneWordMatches;
  return adjustedProbability;
}

async function findMatchedEntry(input) {
  const tokenizer = new natural.WordTokenizer();
  const stopWords = ['a', 'an', 'the', 'can', 'my', 'i'];

  // Extract important words from input
  const inputWords = tokenizer
    .tokenize(input.toLowerCase())
    .filter((word) => !stopWords.includes(word));
  input = await getSimilarDiscreptionWords(inputWords);
  console.log('inputWords:', input);
  const matchedEntries = [];

  for (const entry of data) {
    const problemCategoryWords = tokenizer.tokenize(
      entry.problem_category.toLowerCase()
    );
    const problemDescriptionWords = tokenizer.tokenize(
      entry.problem_description.toLowerCase()
    );
    const oneWordMatches = inputWords.filter(
      (word) =>
        problemCategoryWords.includes(word) ||
        problemDescriptionWords.includes(word)
    );

    const matchPercentage = (oneWordMatches.length / inputWords.length) * 100;

    matchedEntries.push({
      problemCategory: entry.problem_category,
      problemDescription: entry.problem_description,
      matchPercentage: matchPercentage,
      philosophicalInsights: entry.philosophical_insights,
    });
  }

  // Find the entry with the maximum match percentage
  let maxMatchPercentage = 0;
  let maxMatchedEntry = [];

  console.log('maxMatchedEntry:', matchedEntries);
  for (const entry of matchedEntries) {
    if (entry.matchPercentage > maxMatchPercentage) {
      maxMatchPercentage = entry.matchPercentage;
      maxMatchedEntry = entry;
    }
  }
  return maxMatchedEntry;
}

async function generateResponse(userInput) {
  const classifier = await trainClassifier();

  // console.log('classifier:', classifier);
  const classifications = classifier.getClassifications(userInput);
  const sortedClassifications = classifications.sort(
    (a, b) => b.value - a.value
  );
  console.log('sortedClassifications:', sortedClassifications);
  const category = sortedClassifications[0].label;
  const response = {
    category,
    insights: [],
  };
  const input = userInput + ' ';
  console.log('input:', input);
  const matchedEntry = findMatchedEntry(input);
  // console.log('matchedEntry:', matchedEntry);
  if (matchedEntry) {
    const problemDescription = `${matchedEntry.problemDescription} ${matchedEntry.problemCategory}`;
    const userInputWords = userInput.split(' ');

    const oneWordMatches = userInputWords.filter((word) =>
      problemDescription.includes(word)
    ).length;
    response.category = matchedEntry.problemCategory;
    // Find the most relevant insight based on similarity
    const insights = matchedEntry.philosophicalInsights;
    const sortedInsights = insights.sort((a, b) => {
      const similarityA = natural.JaroWinklerDistance(userInput, a.translation);
      const similarityB = natural.JaroWinklerDistance(userInput, b.translation);
      // console.log(
      //   'similarityB - similarityA:',
      //   a.translation,
      //   'similarityAb',
      //   b.translation
      // );
      return similarityB - similarityA;
    });
    // console.log('sortedInsights:', sortedInsights);

    sortedInsights.forEach((insight) => {
      const probability = classifications.find(
        (classification) => classification.label === category
      ).value;

      const adjustedProbability =
        calculateAdjustedProbability(probability, oneWordMatches) +
        Math.random();

      if (matchedEntry.matchPercentage > 0) {
        response.insights.push({
          sloka: insight.sloka,
          speaker: insight.speaker,
          sanskrit: insight.sanskrit,
          translation: insight.translation,
          probability: adjustedProbability,
        });
      } else {
        response.insights.push({
          sloka: 'No relevant insight found',
          speaker: `Lord Krushna Say's`,
          sanskrit: `यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।
          अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥`,
          translation:
            'Whenever and wherever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest Myself on earth.',
          probability: highestProbability,
        });
      }
    });
  }

  // Handle the case when no relevant insight is found

  return response;
}

const trainClassifier = async () => {
  try {
    const updatedData = await appendSimilarWordsToCategoriesAndDescreption(
      data
    );

    const preprocessedData = preprocessDataset(updatedData);

    return trainModel(preprocessedData);
    // Train the classifier
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Example usage
// const userInput = 'How can I overcome conflicts in relationships?';
// const response = generateResponse(userInput);
// console.log(response);
module.exports = generateResponse;
