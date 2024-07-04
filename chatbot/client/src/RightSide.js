import { useState, useEffect } from "react";

import {
  Profilepic,
  Header,
  ChatArea,
  MessageArea,
  MessageField,
  Message,
  Input,
  SendButton,
  LastMessage,
  TypingWave,
} from "./Styles.js";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useRef } from "react";
import { getProfileImg } from "./utils.js";

export default function RightSide(props) {
  console.log("rightside component");
  const states = props.states;
  const textfield = useRef();
  const lastmessage = useRef();
  const selectedSession = states.sessions[states.selectedSessionIndex];
  const messages = selectedSession.history;

  function handleSend(e) {
    const msg = textfield.current.value;
    console.log("emited", msg);
    console.log(textfield, lastmessage);
    const current = new Date();

    states.addUserMessage(msg);
    states.socket.sendObjective({
      question: msg,
      sessionID: selectedSession.id,
    });
    lastmessage.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  function handleTyping(e) {
    if (e.key === "Enter") {
      handleSend();
    }

    // states.socket.emit("typing", {
    //   sender: states.user.name,
    //   sender_email: states.user.email,
    //   receiver: states.selectedContact.name,
    //   receiver_email: states.selectedContact.email,
    // });
  }
  return (
    <MessageArea>
      <Header>
        <Profilepic src={getProfileImg(10)} />
        <div>
          <h2>{selectedSession.title}</h2>
        </div>
      </Header>
      <ChatArea>
        {messages.map((m, i) => (
          <Message key={i} mine={m.sender === "user"}>
            <p>{m.sender}</p>
            <h2>{m.message}</h2>
            <p className="createdAt">{m.createdAt}</p>
          </Message>
        ))}

        {messages.length>0 && messages[messages.length-1].sender === "user" && (
          <Message mine={false}>
            <p>
              Bot
            </p>
            <h2>
              <TypingWave>
                <span className="dot one"></span>
                <span className="dot two"></span>
                <span className="dot three"></span>
              </TypingWave>
            </h2>
          </Message>
        )}
        <LastMessage ref={lastmessage}></LastMessage>
      </ChatArea>
      <MessageField>
        {/* <SendButton>
          <BsEmojiLaughing />
        </SendButton> */}

        <Input
          type="text"
          placeholder="Type Something"
          ref={textfield}
          onKeyDown={handleTyping}
        ></Input>
        <SendButton onClick={handleSend}>
          <IoSend />
        </SendButton>
      </MessageField>
    </MessageArea>
  );
}
