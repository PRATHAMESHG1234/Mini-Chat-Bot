import sys
import json
from problem_utils import convert_question
from data_utils import load_data, find_related_data
from meaning import is_meaningful_sentence
# input_problem = "whdd d udwduduwgduewu ds ssyusy dycd  dc dc dc dsc c uhbdchbdchb dcb jds nsndhud;w;bdbdhbbyucbyucycyudscdc"
# print(is_meaningful_sentence(inputProblem))
# df = load_data()
# related_data = find_related_data(inputProblem, df)
# print(related_data)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_problem = convert_question(sys.argv[1])
    if is_meaningful_sentence(input_problem):
        df = load_data()
        related_data = find_related_data(input_problem, df)
        # print(related_data)
        if related_data:
            related_data['Verse'] = related_data['Verse']
            related_data_json = json.dumps(related_data)
            print(related_data_json)
        else:
            error_message = {
                "error": "Data not found",
                "message": "Please check your query or input."
            }
            print(json.dumps(error_message))
    else:
        error_message = {
            "error": "Invalid input",
            "message": "Please enter a meaningful sentence."
        }
        print(json.dumps(error_message))
