import React, { useState, useEffect, useRef } from "react";

const WordTypingAnimation = ({ text, speed }) => {
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState([]);
  const [blinkCursor, setBlinkCursor] = useState(false);
  const currentIndexRef = useRef(0);
  console.log(currentIndexRef.current, words.length);
  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current !== words.length &&
        setVisibleWords((prevVisibleWords) => {
          const updatedVisibleWords = [
            ...prevVisibleWords,
            words[currentIndexRef.current],
          ];
          currentIndexRef.current++;

          setBlinkCursor(true);

          if (currentIndexRef.current === words.length) {
            setBlinkCursor(false);
            clearInterval(interval);
          }

          return updatedVisibleWords;
        });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, words]);

  return (
    <div>
      <p className="typing-text">
        {visibleWords.join(" ")}
        {blinkCursor && <span className="blinking-cursor"></span>}
      </p>
    </div>
  );
};

export default WordTypingAnimation;
