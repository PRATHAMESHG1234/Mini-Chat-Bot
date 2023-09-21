import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Placeholder } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Footer from "@/Layout/footer";
import { MdSend } from "react-icons/md";
function Chat({ user, token }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isBotTypingButton, setIsBotTypingButton] = useState(false);
  const [isBotTypingSloka, setIsBotTypingSloka] = useState(false);

  const typingRef = useRef(null); // Ref for the typing effect

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setIsBotTypingButton(true);
      setIsBotTyping(true); // Show bot typing indicator

      try {
        const response = await axios.post(`${baseUrl}/api/chat`, {
          headers: { Authorization: token },
          input: inputValue,
        });

        typeBotResponse(response.data.response.insights);
      } catch (error) {
        console.error("Error:", error);
        setIsBotTyping(false);
        setIsBotTypingButton(false);
      }
    }
  };

  const typeBotResponse = async (insights) => {
    if (insights.length === 0) {
      // If there are no insights to respond with, add a default message
      const defaultResponse = {
        id: Date.now(),
        sloka: `यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।
        अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्||`,
        sanskrit: "No relevant insight found",
        translation:
          "Whenever and wherever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest Myself on earth.",
        speaker: "",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, defaultResponse]);

      if (typingRef.current) {
        typingRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      for (let index = 0; index <= 1; index++) {
        const insight = insights[index];
        const responseText = {
          id: Date.now() + index,
          sloka: insight.sloka,
          sanskrit: insight.sanskrit,
          translation: insight.translation,
          speaker: insight.speaker,
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, responseText]);

        if (typingRef.current) {
          typingRef.current.scrollIntoView({ behavior: "smooth" });
        }

        setIsBotTypingSloka(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsBotTypingSloka(false);

        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    setIsBotTyping(false);
    setIsBotTypingButton(false);
  };

  return (
    <>
      <div className="chat-container">
        <div id="chat-messages" className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.sender === "user" ? "user" : "bot"
              }`}
            >
              {message.sender === "user" && (
                <div className="user-details">
                  <img
                    src={user.profilePicUrl}
                    alt="User Profile"
                    className="user-profile-pic"
                  />
                </div>
              )}
              {message.sender === "bot" && (
                <>
                  <div className="message-text">
                    <div className="sloka-title">
                      <div className="old-letter">
                        {message.sloka} {message.speaker}
                      </div>
                    </div>
                    <div className="sloka">
                      {isBotTypingSloka ? (
                        <div className="loading-dots">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      ) : (
                        <div className="old-letter">{message.sanskrit}</div>
                      )}
                    </div>
                    <div className="translation">
                      <div className="old-letter">{message.translation}</div>
                    </div>
                  </div>
                </>
              )}
              {message.sender === "user" && (
                <div className="message-text">{message.text}</div>
              )}
            </div>
          ))}
          {isBotTyping && (
            <div className="chat-message bot typing">
              <Placeholder fluid>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </div>
          )}
          {/* Use the ref to scroll into view */}
          <div ref={typingRef} />
        </div>
      </div>
      <div className="chat-input">
        <Input
          fluid
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
          action={
            <Button onClick={handleSendMessage} disabled={isBotTypingButton}>
              {isBotTypingButton ? (
                <div className="loading-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              ) : (
                <MdSend style={{ fontSize: "24px", color: "green" }} />
              )}
            </Button>
          }
        />
      </div>
    </>
  );
}

export default Chat;
