# Assuming 'data' contains your DataFrame data
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from trainingData.chapter123 import chapter123
from trainingData.chapter4 import chapter4
from trainingData.chapter5 import chapter5
from trainingData.chapter6 import chapter6
from trainingData.chapter7 import chapter7
from trainingData.chapter8 import chapter8
from trainingData.chapter9 import chapter9

# Define the data and answers as a list of dictionaries
data = chapter123 + chapter4+chapter5+chapter6+chapter7+chapter8+chapter9
# print(data)
# Convert the list of dictionaries to a DataFrame
df = pd.DataFrame(data)

# Define the features (X) as the "problem"
X = df['problem']
# print(df)
# Vectorize the text data (convert text to numerical features)
tfidf_vectorizer = TfidfVectorizer(max_features=5000)
X_tfidf = tfidf_vectorizer.fit_transform(X)

# Train a text classification model for each attribute
classifiers = {}
attributes = ['chapter', 'verse', 'shloka']

for attribute in attributes:
    y = df[attribute]
    classifier = MultinomialNB()
    classifier.fit(X_tfidf, y)
    classifiers[attribute] = classifier

# Define a function to predict attributes for a given problem


def predict_attributes(problem):
    # Vectorize the input problem using the same TF-IDF vectorizer
    problem_tfidf = tfidf_vectorizer.transform([problem])
    # print(problem_tfidf)
    # Make predictions using the trained models
    predictions = {}
    for attribute in attributes:
        predicted_attribute = classifiers[attribute].predict(problem_tfidf)
        predictions[attribute] = predicted_attribute[0]
        # print("predict_attributes+ ", predicted_attribute)

    return predictions


# Create a DataFrame
# df = pd.DataFrame(data)

# Plot the DataFrame
# plt.figure(figsize=(10, 6))
# df.plot(kind='scatter', x='chapter', y='verse', title='Chapter vs. Verse')
# plt.xlabel('Chapter')
# plt.ylabel('Verse')
# plt.show()
