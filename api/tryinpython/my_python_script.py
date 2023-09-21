# my_python_script.py
import sys
from api.tryinpython.a import generate_response

# Function to read input and generate a response


def main():
    while True:
        # Read input from stdin
        user_input = input()
        # Generate a response
        response = generate_response(user_input)
        # Print the response to stdout
        print(response)
        # Ensure the output is flushed to stdout
        sys.stdout.flush()


if __name__ == "__main__":
    main()
