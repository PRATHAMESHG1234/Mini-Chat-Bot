import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from problemans import predict_attributes
import json
import sys
import traceback
import matplotlib.pyplot as plt
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load the dataset from an Excel file
file_path = r'C:\Users\ghorp\OneDrive\Desktop\web-development\Myprojects\chating-bot\api\tryinpython\trainingData\bhagavad-gita.xlsx'

sheet_name = 'Bhagavad-Gita'
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Vectorize the text data (convert text to numerical features)
tfidf_vectorizer = TfidfVectorizer(max_features=5000)
X_tfidf = tfidf_vectorizer.fit_transform(df['Enlgish Translation'])

# Train a text classification model (Multinomial Naive Bayes in this example)
classifier = MultinomialNB()
classifier.fit(X_tfidf, df['Chapter'])

# Define a function to find related data


def find_related_data(input_problem):
    try:
        # Predict attributes for the input problem
        # print(input_problem)
        predictions = predict_attributes(input_problem)

        # Convert the integers to strings before concatenation
        search_text = "Verse " + \
            str(predictions['chapter']) + "." + str(predictions['verse'])
        # print(search_text)

        # Check if the search text is in the dataset
        if any(df['Verse'].str.contains(search_text)):
            # Get the row where the text was found
            matching_row = df[df['Verse'].str.contains(search_text)]

            # Access data related to that row
            chapter = matching_row['Chapter'].values[0]
            verse = matching_row['Verse'].values[0]
            shloka = matching_row['Sanskrit Anuvad'].values[0]
            Hindi_Anuvad = matching_row['Hindi Anuvad'].values[0]
            Enlgish_Translation = matching_row['Enlgish Translation'].values[0]
            Title = matching_row['Title'].values[0]

            shlokafor = predictions['shloka']

            pipe_count = shlokafor.count('।')

            # Count digits
            digit_count = sum(c.isdigit() for c in shlokafor)
            # print(shlokafor)
            # print(pipe_count)
            # print(digit_count)

            # Ternary operator to determine the output
            if pipe_count > 0 and digit_count > 0:
                shloka = shlokafor

            else:
                shloka = matching_row['Sanskrit Anuvad'].values[0]

            # Return the related data as a dictionary
            related_data = {
                "Chapter": chapter,
                "Verse": verse,
                "SanskritAnuvad": shloka,
                "PredictedSanskritAnuvad": predictions['shloka'],
                "HindiAnuvad": Hindi_Anuvad,
                "EnglishTranslation": Enlgish_Translation,
                "Title": Title
            }

            # print(related_data)
            return related_data

        else:
            print(f"Text '{search_text}' not found in the dataset.")
            return None

    except Exception as e:
        traceback.print_exc()  # Print the traceback for debugging
        print(f"Error: {str(e)}")
        return None


# inputProblem = "Arjuna seeks guidance on the difference between a person who renounces the fruits of actions and the one who performs actions. He wants to understand the nature of renunciation and yoga."


# related_data = find_related_data(inputProblem)
# print(related_data)
# if related_data:
#     print("**************", related_data)
#     related_data['Verse'] = int(related_data['Verse'])
#     related_data_json = json.dumps(related_data)

#     # Print the JSON data
#     print(related_data_json)


def convert_question(input_text):
    # Regular expression pattern to match WH questions
    pattern = r'^(what|where|when|who|why|how)\s+(.*?)\?$'

    # Search for a match in the input text
    match = re.search(pattern, input_text.lower())

    if match:
        # Extract the question type and content
        question_type = match.group(1)
        question_content = match.group(2).split()

        # Stop words to filter out
        stop_words = {'is', 'the', 'are', 'a', 'an',
                      'of', 'for', 'to', 'in', 'on', 'with'}

        # Filter out stop words and construct the sentence
        filtered_content = [
            word for word in question_content if word.lower() not in stop_words]

        # Check for specific patterns and remove them
        patterns_to_remove = ['significance', 'importance', 'meaning',
                              'purpose', 'role', 'impact', 'relation', 'relationship']
        filtered_content = [
            word for word in filtered_content if word.lower() not in patterns_to_remove]

        # Map question types to corresponding prefixes
        question_type_prefix = {
            'what': 'Arjuna inquires about the',
            'where': 'Arjuna inquires about the location of',
            'when': 'Arjuna inquires about the time for',
            'who': 'Arjuna inquires about the identity of',
            'why': 'Arjuna inquires about the reason for',
            'how': 'Arjuna inquires about the method of'
        }

        # Check if the question type is in the mapping
        if question_type in question_type_prefix:
            # Generate the converted format
            converted_format = f"{question_type_prefix[question_type]} {' '.join(filtered_content)}."
            return converted_format

    # Return the original input if no match is found
    return input_text


if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_problem = convert_question(sys.argv[1])

        related_data = find_related_data(input_problem)

        if related_data:
            related_data['Verse'] = related_data['Verse']
            # print("**************", related_data)
            related_data_json = json.dumps(related_data)

            # Print the JSON data
            print(related_data_json)

    else:
        print("Input problem not provided.")


# Hardcoded user input
# user_input = "What is the significance of self-control for a person who aspires to practice yoga?"

# # Convert and print the result
# converted_text = convert_question(user_input)
# print(converted_text)

# plt.figure(figsize=(10, 6))
# df.plot(kind='scatter', x='Chapter',
#         y='Verse', title='Chapter vs. Verse')
# plt.xlabel('Chapter')
# plt.ylabel('Verse')
# plt.show()
