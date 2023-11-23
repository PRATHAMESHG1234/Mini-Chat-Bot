// import React, { useState, useEffect, useRef } from "react";
// import { Input, Button, Placeholder } from "semantic-ui-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import baseUrl from "@/utils/baseUrl";
// import Footer from "@/Layout/footer";
// import { MdSend } from "react-icons/md";
// function Chat({ user, token }) {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isBotTyping, setIsBotTyping] = useState(false);
//   const [isBotTypingButton, setIsBotTypingButton] = useState(false);
//   const [isBotTypingSloka, setIsBotTypingSloka] = useState(false);

//   const typingRef = useRef(null); // Ref for the typing effect

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (inputValue.trim() !== "") {
//       const newMessage = {
//         id: Date.now(),
//         text: inputValue,
//         sender: "user",
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setInputValue("");
//       setIsBotTypingButton(true);
//       setIsBotTyping(true); // Show bot typing indicator

//       try {
//         const response = await axios.post(`${baseUrl}/api/chat`, {
//           headers: { Authorization: token },
//           input: inputValue,
//         });

//         typeBotResponse(response.data.response.insights);
//       } catch (error) {
//         console.error("Error:", error);
//         setIsBotTyping(false);
//         setIsBotTypingButton(false);
//       }
//     }
//   };

//   const typeBotResponse = async (insights) => {
//     if (insights.length === 0) {
//       // If there are no insights to respond with, add a default message
//       const defaultResponse = {
//         id: Date.now(),
//         sloka: `यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।
//         अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्||`,
//         sanskrit: "No relevant insight found",
//         translation:
//           "Whenever and wherever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest Myself on earth.",
//         speaker: "",
//         sender: "bot",
//       };

//       setMessages((prevMessages) => [...prevMessages, defaultResponse]);

//       if (typingRef.current) {
//         typingRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       for (let index = 0; index <= 1; index++) {
//         const insight = insights[index];
//         const responseText = {
//           id: index + 1,
//           userMessage: insight.userMessage,
//           sloka: insight.sloka,
//           sanskrit: insight.sanskrit,
//           translation: insight.translation,
//           speaker: insight.speaker,
//           sender: "bot",
//         };

//         setMessages((prevMessages) => [...prevMessages, responseText]);

//         if (typingRef.current) {
//           typingRef.current.scrollIntoView({ behavior: "smooth" });
//         }

//         setIsBotTypingSloka(true);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setIsBotTypingSloka(false);

//         await new Promise((resolve) => setTimeout(resolve, 1500));
//       }
//     }

//     setIsBotTyping(false);
//     setIsBotTypingButton(false);
//   };

//   return (
//     <>
//       <div className="chat-container">
//         <div id="chat-messages" className="chat-messages">
//           {messages.map((message, i) => (
//             <div
//               key={message.id}
//               className={`chat-message ${
//                 message.sender === "user" ? "user" : "bot"
//               }`}
//             >
//               {message.sender === "user" && (
//                 <div className="user-details">
//                   <img
//                     src={user.profilePicUrl}
//                     alt="User Profile"
//                     className="user-profile-pic"
//                   />
//                 </div>
//               )}
//               {message.sender === "bot" && (
//                 <>
//                   <div className="message-text">
//                     <div className="sloka-title">
//                       <div className="old-letter">{message.userMessage}</div>
//                     </div>
//                     <div className="sloka">
//                       {isBotTypingSloka && message.id === i ? (
//                         <div className="loading-dots">
//                           <span className="dot"></span>
//                           <span className="dot"></span>
//                           <span className="dot"></span>
//                         </div>
//                       ) : (
//                         <div className="old-letter">{message.sanskrit}</div>
//                       )}
//                     </div>
//                     <div className="translation">
//                       <div className="old-letter">{message.translation}</div>
//                     </div>
//                   </div>
//                 </>
//               )}
//               {message.sender === "user" && (
//                 <div className="message-text">{message.text}</div>
//               )}
//             </div>
//           ))}
//           {isBotTyping && (
//             <div className="chat-message bot typing">
//               <Placeholder fluid>
//                 <Placeholder.Line />
//                 <Placeholder.Line />
//               </Placeholder>
//             </div>
//           )}
//           {/* Use the ref to scroll into view */}
//           <div ref={typingRef} />
//         </div>
//       </div>
//       <div className="chat-input">
//         <Input
//           fluid
//           placeholder="Type a message..."
//           value={inputValue}
//           onChange={handleInputChange}
//           action={
//             <Button onClick={handleSendMessage} disabled={isBotTypingButton}>
//               {isBotTypingButton ? (
//                 <div className="loading-dots">
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                 </div>
//               ) : (
//                 <MdSend style={{ fontSize: "24px", color: "green" }} />
//               )}
//             </Button>
//           }
//         />
//       </div>
//     </>
//   );
// }

// export default Chat;
import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Placeholder,
  Popup,
  Modal,
  Divider,
  Form,
} from "semantic-ui-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Footer from "@/Layout/footer";
import { MdSend } from "react-icons/md";
import responseFormats from "./ResponseFormats";
import WordTypingAnimation from "./WordTypingAnimation";
import CustomText from "./CoustomText";
// ... (previous imports)

function Chat({ user, token }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isBotTypingButton, setIsBotTypingButton] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(true);
  const [popupContent, setPopupContent] = useState({
    sanskrit: "",
    HindiAnuvad: "",
  });

  const toggleTranslation = (sanskritAnuvad, HindiAnuvad) => {
    setPopupContent({
      sanskrit: sanskritAnuvad,
      HindiAnuvad: HindiAnuvad,
    });
  };
  const typingRef = useRef(null);

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
      setIsBotTyping(true);

      try {
        const { data } = await axios.post(`${baseUrl}/api/chat`, {
          headers: { Authorization: token },
          input: inputValue,
        });
        console.log(data);

        typeBotResponse(data.response);
      } catch (error) {
        console.error("Error:", error);
        setIsBotTyping(false);
        setIsBotTypingButton(false);
      }
    }
  };

  const typeBotResponse = async (response) => {
    const responseFormatsWithData = responseFormats(
      response,
      showEnglishTranslation
    );

    const selectedResponse =
      responseFormatsWithData[
        Math.floor(Math.random() * responseFormatsWithData.length)
      ];

    const botMessage = {
      id: Date.now(),
      sender: "bot",
      text: (
        <>
          <CustomText
            response={response}
            selectedResponse={selectedResponse}
            showEnglishTranslation={showEnglishTranslation}
            toggleTranslation={toggleTranslation}
          />
        </>
      ),
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);

    if (typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const wordsInEnglishTranslation =
      response.EnglishTranslation &&
      response.EnglishTranslation.split(" ").length;
    const animationDuration = wordsInEnglishTranslation * 200 + 20;

    setIsBotTyping(false);
    setTimeout(() => {
      setIsBotTypingButton(false);
    }, animationDuration);
  };

  return (
    <>
      {popupContent.HindiAnuvad !== "" && (
        <Modal
          open={true}
          onClose={() =>
            setPopupContent({
              sanskrit: "",
              HindiAnuvad: "",
            })
          }
          size="small"
          closeIcon={{ style: { color: "red" }, name: "close" }}
          centered={false}
          dimmer="blurring"
          animation="fade"
        >
          <Modal.Header style={{ textAlign: "center" }}>
            Sanskrit Anuvad
          </Modal.Header>
          <Modal.Content scrolling>
            <p style={{ textAlign: "center" }}>{popupContent.sanskrit}</p>
          </Modal.Content>
          <Divider />
          <Divider hidden />

          <Divider />
          <Modal.Header style={{ textAlign: "center" }}>
            Hindi Translation
          </Modal.Header>
          <Modal.Content scrolling>
            <p style={{ textAlign: "center" }}>{popupContent.HindiAnuvad}</p>
          </Modal.Content>
        </Modal>
      )}
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
                <div className="message-text">{message.text}</div>
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
          <div ref={typingRef} />
        </div>
      </div>
      <div className="chat-input">
        <Form onSubmit={handleSendMessage}>
          <Input
            fluid
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            action={
              <Button type="submit" disabled={isBotTypingButton}>
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
        </Form>
      </div>
    </>
  );
}

export default Chat;
