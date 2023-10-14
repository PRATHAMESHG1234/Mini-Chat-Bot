import React from "react";
import WordTypingAnimation from "./WordTypingAnimation"; // Import the WordTypingAnimation component
import { Button } from "semantic-ui-react";

const CustomText = ({
  response,
  selectedResponse,
  showEnglishTranslation,
  toggleTranslation,
}) => {
  const errorMessageText =
    "We encoutered error while processing your request. This could be due to an invalid input or a server issue. Please make sure your input is meaningful and try again. If the problem persists, it might be a technical issue. Please contact our support team for assistance.";
  // Check if there is an error message
  if (response.error) {
    return (
      <div className={`bot-response format-1 error-message`}>
        <p>
          <strong>Error:</strong>{" "}
          <WordTypingAnimation text={errorMessageText} speed={200} />
        </p>
      </div>
    );
  }

  // If there is no error, render the selected response
  return (
    <>
      {selectedResponse.text}

      {showEnglishTranslation && (
        <Button
          className="toggle-button"
          onClick={() =>
            toggleTranslation(response.SanskritAnuvad, response.HindiAnuvad)
          }
        >
          Toggle Hindi Translation
        </Button>
      )}
    </>
  );
};

export default CustomText;
