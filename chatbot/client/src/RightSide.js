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
import { RANDOM_INT } from "./constants.js";
import RenderMarkdown from "./components/RenderMarkdown.js";
export default function RightSide(props) {
  console.log("rightside component");
  const states = props.states;
  const textfield = useRef();
  const lastmessage = useRef();
  const selectedSession = states.sessions[states.selectedSessionIndex];
  const messages = selectedSession.history;

  function handleSend(e) {
    const msg = textfield.current.value;
    textfield.current.value = "";
    const current = new Date();

    states.socket.sendObjective({
      history: selectedSession.history.slice(-10),
      question: msg,
      sessionID: selectedSession.id,
    });
    states.addUserMessage(msg);
    lastmessage.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  function handleTyping(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }
  return ( 
    <MessageArea>
      <Header>
        <Profilepic src={getProfileImg(states.selectedSessionIndex + RANDOM_INT)} />
        <div>
          <h2>{selectedSession.title}</h2>
        </div>
      </Header>
      <ChatArea>
        {messages.map((m, i) => (
          <Message key={i} mine={m.sender === "user"}>
            <p className="sender">{m.sender}</p>
            <RenderMarkdown  markdown={m.message} />
            
            {m.sender !== "user" &&
            <div style={{display:"flex",gap:"1em",paddingTop:"5px"}}>
            {m.referencePaths.length>0 &&
            <>
            <p style={{color:"white",fontSize:"1em"}}>Reference : </p>
            <p style={{display:"flex", gap:"1em"}}> { m.referencePaths.map((reference, i) => <a key={i} href={reference.file_path}>  #{reference.file_name}</a>)} </p>
            </>
            }
            </div>
            }
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
