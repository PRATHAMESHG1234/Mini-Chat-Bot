from trainingData.chapter10 import chapter10

print("All Problems:")
for index, problem_data in enumerate(chapter10, start=1):
    problem_text = problem_data.get("problem")
    print(f"{index}. {problem_text}")
