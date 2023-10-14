import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import traceback
from problemans import predict_attributes


def load_data():
    file_path = r'C:\Users\ghorp\OneDrive\Desktop\web-development\Myprojects\chating-bot\api\model\trainingData\bhagavad-gita.xlsx'
    sheet_name = 'Bhagavad-Gita'
    return pd.read_excel(file_path, sheet_name=sheet_name)


def find_related_data(input_problem, df):
    try:
        predictions = predict_attributes(input_problem)
        search_text = "Verse " + \
            str(predictions['chapter']) + "." + str(predictions['verse'])

        if any(df['Verse'].str.contains(search_text)):
            matching_row = df[df['Verse'].str.contains(search_text)]

            chapter = matching_row['Chapter'].values[0]
            verse = matching_row['Verse'].values[0]
            shloka = matching_row['Sanskrit Anuvad'].values[0]
            Hindi_Anuvad = matching_row['Hindi Anuvad'].values[0]
            Enlgish_Translation = matching_row['Enlgish Translation'].values[0]
            Title = matching_row['Title'].values[0]

            shlokafor = predictions['shloka']
            pipe_count = shlokafor.count('।')
            digit_count = sum(c.isdigit() for c in shlokafor)

            if pipe_count > 0 and digit_count > 0:
                shloka = shlokafor
            else:
                shloka = matching_row['Sanskrit Anuvad'].values[0]

            related_data = {
                "Chapter": chapter,
                "Verse": verse,
                "SanskritAnuvad": shloka,
                "PredictedSanskritAnuvad": predictions['shloka'],
                "HindiAnuvad": Hindi_Anuvad,
                "EnglishTranslation": Enlgish_Translation,
                "Title": Title
            }

            return related_data
        else:
            print(f"Text '{search_text}' not found in the dataset.")
            return None

    except Exception as e:
        traceback.print_exc()
        print(f"Error: {str(e)}")
        return None
