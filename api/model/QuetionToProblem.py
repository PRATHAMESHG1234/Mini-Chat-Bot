from trainingData.quetionsToProblemChapte123 import problems_and_questions123
from trainingData.quetionsToProblemChapte9 import problems_and_questions9
from trainingData.quetionsToProblemChapte10 import problems_and_questions10
problems_and_questions = problems_and_questions123 + \
    problems_and_questions9 + problems_and_questions10

# print(len(problems_and_questions))


def get_problem_from_question(question):
    for problem_dict in problems_and_questions:
        for problem, questions in problem_dict.items():
            if question in questions:
                return problem
    return question


# Example usage:
