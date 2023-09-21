from nltk.corpus import stopwords
import requests
import nltk
import json  # Import the json module
from nltk.tokenize import word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.metrics import jaccard_distance
import random

# Load NLTK stopwords


data = [
    {
        'problem_category': 'Relationships ',
        'problem_description': 'Dealing with conflicts ',
        'philosophical_insights': [
            {
                'sloka': 'Chapter 2, Verse 47',
                'speaker': 'Lord Krushna Say\'s',
                'sanskrit': 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते संगोऽस्त्वकर्मणि॥',
                'translation': 'You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.'
            },
            {
                'sloka': 'Chapter 2, Verse 3',
                'speaker': 'Lord Krushna Say\'s',
                'sanskrit': 'क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते। क्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परंतप॥',
                'translation': 'O Partha (Arjuna), do not yield to unmanliness. It does not befit you. Give up such petty weakness of heart and arise, O chastiser of enemies!'
            },
            {
                'sloka': 'Chapter 2, Verse 31',
                'speaker': 'Lord Krushna Say\'s',
                'sanskrit': 'स्वधर्ममपि चावेक्ष्य न विकम्पितुमर्हसि। धर्म्याद्धि युद्धाछ्रेयोऽन्यत्क्षत्रियस्य न विद्यते॥',
                'translation': 'Considering your specific duty as a warrior, you should not waver. Indeed, for a warrior, there is no better engagement than fighting for a righteous cause.'
            },
        ]
    },
    {
        'problem_category': 'Self-Improvement ',
        'problem_description': 'Overcoming self-doubt ',
        'philosophical_insights': [
            {
                'sloka': 'Chapter 6, Verse 5',
                'speaker': 'Lord Krushna Say\'s',
                'sanskrit': 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
                'translation': 'One must elevate oneself by one’s own mind, not degrade oneself. The mind alone is the friend of the self, and the mind alone is the enemy of the self.'
            },
            {
                'sloka': 'Chapter 6, Verse 6',
                'speaker': 'Lord Krushna Say\'s',
                'sanskrit': 'बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः। अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥',
                'translation': 'For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.'
            },
        ]
    },
    {
        'problem_category': 'Stress Management',
        'problem_description': 'Coping with overwhelming stress',
        'philosophical_insights': [
            {
                'sloka': 'Chapter 2, Verse 48',
                'speaker': 'Lord Krishna',
                'sanskrit': 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
                'translation': 'Perform your duties in an equipoised manner, O Arjuna, abandoning attachment to success and failure. Such equanimity is called yoga.'
            },
            {
                'sloka': 'Chapter 2, Verse 50',
                'speaker': 'Lord Krishna',
                'sanskrit': 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते। तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥',
                'translation': 'A person equipped with wisdom gives up both good and bad deeds in this world. Therefore, strive for yoga, which is the art of skillful action.'
            },
        ]
    },
    {
        'problem_category': 'Decision Making',
        'problem_description': 'Making wise and discerning choices',
        'philosophical_insights': [
            {
                'sloka': 'Chapter 2, Verse 41',
                'speaker': 'Lord Krishna',
                'sanskrit': 'व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन। बहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥',
                'translation': 'O Arjuna, the intellect of those who are indecisive is many-branched and endless. But the intellect of those who are steadfast and resolute is one-pointed and focused.'
            },
            {
                'sloka': 'Chapter 2, Verse 47',
                'speaker': 'Lord Krishna',
                'sanskrit': 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते संगोऽस्त्वकर्मणि॥',
                'translation': 'You have the right to perform your prescribed duties, but you should not be attached to the results. Do not consider yourself solely responsible for the outcomes and do not give up performing your duties.'
            },
        ]
    },
    # Add more data entries as needed
]

stop_words = set(stopwords.words('english'))


def extract_important_words(user_input):
    words = word_tokenize(user_input.lower())
    important_words = [
        word for word in words if word not in stop_words and word.isalpha()]
    return ' '.join(important_words)


def get_similar_words(word):
    endpoint = f"https://api.datamuse.com/words?ml={word}"
    try:
        response = requests.get(endpoint)
        data = response.json()
        similar_words = ' '.join([item['word'] for item in data])
        return similar_words
    except Exception as e:
        return []


def get_similar_description_words(question):
    endpoint = f"https://api.datamuse.com/words?ml={question}"
    try:
        response = requests.get(endpoint)
        data = response.json()
        similar_description = ' '.join([item['word'] for item in data])
        return similar_description
    except Exception as e:
        return []


def append_similar_words_to_categories_and_description(data):
    for entry in data:
        similar_category = get_similar_words(entry['problem_category'])
        entry['problem_category'] += " " + similar_category

        similar_description = get_similar_description_words(
            entry['problem_description'])
        entry['problem_description'] += " " + similar_description
    return data


def preprocess_dataset(dataset):
    preprocessed_dataset = []
    for entry in dataset:
        insights = [
            f"{insight['sloka']}: {insight['translation']}" for insight in entry['philosophical_insights']]
        preprocessed_dataset.append({
            'problem_category': entry['problem_category'],
            'problem_description': entry['problem_description'],
            'philosophical_insights': ' '.join(insights)
        })
    return preprocessed_dataset


def train_model(preprocessed_dataset):
    features = [({'philosophical_insights': entry['philosophical_insights']}, entry['problem_category'])
                for entry in preprocessed_dataset]
    classifier = NaiveBayesClassifier.train(features)
    return classifier


def calculate_adjusted_probability(probability, one_word_matches):
    adjustment_factor = 0.1
    adjusted_probability = probability + adjustment_factor * one_word_matches
    return adjusted_probability


def find_matched_entry(input_text):
    input_words = word_tokenize(input_text.lower())
    matched_entries = []

    for entry in data:
        problem_category_words = word_tokenize(
            entry['problem_category'].lower())
        problem_description_words = word_tokenize(
            entry['problem_description'].lower())
        one_word_matches = [
            word for word in input_words if word in problem_category_words or word in problem_description_words]
        match_percentage = (len(one_word_matches) / len(input_words)) * 100

        matched_entries.append({
            'problem_category': entry['problem_category'],
            'problem_description': entry['problem_description'],
            'match_percentage': match_percentage,
            'philosophical_insights': entry['philosophical_insights']
        })

    max_match_percentage = 0
    max_matched_entry = None

    for entry in matched_entries:
        if entry['match_percentage'] > max_match_percentage:
            max_match_percentage = entry['match_percentage']
            max_matched_entry = entry

    if max_matched_entry:
        return max_matched_entry
    else:
        return None


def generate_response(user_input):
    important_words = extract_important_words(user_input)

    preprocessed_dataset = preprocess_dataset(data)
    classifier = train_model(preprocessed_dataset)

    # Wrap important_words in a dictionary
    input_features = {'philosophical_insights': important_words}

    classifications = classifier.prob_classify(input_features)
    category = classifications.max()
    response = {
        'category': category,
        'insights': []
    }

    similar_input = get_similar_description_words(important_words)
    input_text = f"{important_words} {similar_input}"

    matched_entry = find_matched_entry(input_text)

    if matched_entry:
        problem_description = f"{matched_entry['problem_description']} {matched_entry['problem_category']}"
        user_input_words = user_input.split(" ")

        one_word_matches = len(
            [word for word in user_input_words if word in problem_description])

        response['category'] = matched_entry['problem_category']

        insights = matched_entry['philosophical_insights']

        if len(insights) >= 2:
            sorted_insights = sorted(insights, key=lambda x: jaccard_distance(
                set(user_input), set(x['translation'])), reverse=True)

            for insight in sorted_insights:
                probability = classifications.prob(category)
                adjusted_probability = calculate_adjusted_probability(
                    probability, one_word_matches) + random.random()

                if matched_entry['match_percentage'] > 0:
                    response['insights'].append({
                        'sloka': insight['sloka'],
                        'speaker': insight['speaker'],
                        'sanskrit': insight['sanskrit'],
                        'translation': insight['translation'],
                        'probability': adjusted_probability
                    })
    return response


def update_and_preprocess_data(data):
    preprocessed_data = preprocess_dataset(data)
    return preprocessed_data


def train_classifier(preprocessed_data):
    classifier = train_model(preprocessed_data)
    return classifier


# Example usage
user_input = 'How can I manage stress?'
response = generate_response(user_input)
print(response)
