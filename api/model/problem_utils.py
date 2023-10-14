import re
import nltk


def convert_question(input_text):
    pattern = r'^(what|where|when|who|why|how)\s+(.*?)\?$'
    match = re.search(pattern, input_text.lower())

    if match:
        question_type = match.group(1)
        question_content = match.group(2).split()
        stop_words = set(nltk.corpus.stopwords.words('english'))
        filtered_content = [
            word for word in question_content if word.lower() not in stop_words]
        patterns_to_remove = ['significance', 'importance', 'meaning',
                              'purpose', 'role', 'impact', 'relation', 'relationship']
        filtered_content = [
            word for word in filtered_content if word.lower() not in patterns_to_remove]

        question_type_prefix = {
            'what': 'Arjuna inquires about the',
            'where': 'Arjuna inquires about the location of',
            'when': 'Arjuna inquires about the time for',
            'who': 'Arjuna inquires about the identity of',
            'why': 'Arjuna inquires about the reason for',
            'how': 'Arjuna inquires about the method of'
        }

        if question_type in question_type_prefix:
            converted_format = f"{question_type_prefix[question_type]} {' '.join(filtered_content)}."
            return converted_format

    return input_text
