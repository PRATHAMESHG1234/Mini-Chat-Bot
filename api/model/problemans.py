from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
import pandas as pd


from trainingData.chapter123 import chapter123
from trainingData.chapter4 import chapter4
from trainingData.chapter5 import chapter5
from trainingData.chapter6 import chapter6
from trainingData.chapter7 import chapter7
from trainingData.chapter8 import chapter8
from trainingData.chapter9 import chapter9
from trainingData.chapter10 import chapter10
from trainingData.chapter11 import chapter11
from trainingData.chapter12 import chapter12
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer


def combine_data():
    # Combine chapter data
    data = chapter123 + chapter4 + chapter5 + chapter6 + chapter7 + \
        chapter8 + chapter9 + chapter10 + chapter11 + chapter12
    return data


def preprocess_data(data):
    # Convert the data to a DataFrame
    df = pd.DataFrame(
        data, columns=['problem', 'answer', 'chapter', 'verse', 'shloka'])

    # Preprocess text data
    df['problem'] = df['problem'].str.lower()

    # Specify the dummy value
    dummy_value = 'your_dummy_value'

    df.dropna(inplace=True)

    # Print the DataFrame after filling NaN values
    # print(df)

    return df


def train_models(df):
    # Define features and target columns
    X = df['problem']
    y = df[['answer', 'chapter', 'verse', 'shloka']]  # Include all fields in y
    # Convert text data to TF-IDF features
    vectorizer = TfidfVectorizer(max_features=5000)
    X_tfidf = vectorizer.fit_transform(X)

    # Define and train the models (Logistic Regression) for all fields in y simultaneously
    models = {}
    for field in y.columns:

        model = LogisticRegression()
        model.fit(X_tfidf, y[field])
        models[field] = model
    return vectorizer, models


def predict_attributes(vectorizer, models, input_problem):
    input_problem = input_problem.lower()
    input_tfidf = vectorizer.transform([input_problem])
    predicted_values_dict = {}
    for field, model in models.items():
        predicted_values_dict[field] = model.predict(input_tfidf)[0]
    return predicted_values_dict


def index(input_problem):
    data = combine_data()
    df = preprocess_data(data)
    result = calculate_word_presence_percentage(df, input_problem)
    if result:
        vectorizer, models = train_models(df)
        predictions = predict_attributes(vectorizer, models, input_problem)
        return predictions


def calculate_word_presence_percentage(dataframe, sentence):
    """
    Calculate the percentage of words from the given sentence that are present in the 'problem' column of the DataFrame.

    Args:
    dataframe (pandas.DataFrame): DataFrame containing 'problem' column.
    sentence (str): The sentence to calculate word presence percentage from.

    Returns:
    float: Percentage of words from the sentence present in 'problem' fields.
    """
    # Split the input sentence into words
    words_in_sentence = set(sentence.lower().split())

    # Count how many words from the sentence are present in any 'problem' field
    total_words_in_sentence = len(words_in_sentence)
    matching_words_count = 0
    for problem in dataframe['problem']:
        problem_words = set(problem.lower().split())
        matching_words_count += len(
            words_in_sentence.intersection(problem_words))

    # Calculate the percentage of words present in 'problem' fields
    if total_words_in_sentence > 0:
        percentage = (matching_words_count / total_words_in_sentence) * 100
    else:
        percentage = 0

    return percentage


# Example Usage
# input_problem = "Sanjaya describes how Duryodhana, upon observing the Pandava army arranged for battle, approached his teacher Drona and spoke the following words."
# predictions = index(input_problem)
# print(predictions)
