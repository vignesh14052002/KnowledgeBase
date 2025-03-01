import { useState, useEffect } from "react";
import { Container } from "./Styles.js";
import { IconContext } from "react-icons";
import LeftSide from "./LeftSide.js";
import RightSide from "./RightSide.js";
import ChatBotSocket from "./useSocket.js";
import { v4 as uuidv4 } from 'uuid'
import "./App.css";

let timeoutId;
function App() {
  const [sessions, setSessions] = useState([{index:0,id:uuidv4(),title:"New session",history:[]}]);
  const [typing, setTyping] = useState([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
  const [socket, setSocket] = useState(null);

  function addUserMessage(message) {
    setSessions((prev) => {
      let newSessions = [...prev];
      // add to selected contact
      newSessions[selectedSessionIndex].history.push({
        message,
        sender: "user",
      });
      return newSessions;
  })
};
function createNewSession(){
  setSessions((prev) => {
    let newSessions = [...prev];
    newSessions.push({index:prev.length, id:uuidv4(),title:"New session",history:[]});
    return newSessions;
  })
  setSelectedSessionIndex(sessions.length)
}

  let states = {
    socket,
    selectedSessionIndex,
    setSelectedSessionIndex,
    sessions,
    setSessions,
    typing,
    setTyping,
    addUserMessage,
    createNewSession
  };
  if (typing.length !== 0) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setTyping([]);
    }, 200);
  }
  useEffect(() => {
    const _socket = new ChatBotSocket()
    setSocket(_socket)
    _socket.onGetAnswer((data) => {
      console.log("got answer", data);
      setSessions((prev) => {
        let newSessions = [...prev];
        for (const session of newSessions) {
          if (session.id === data["sessionID"]) {
            session.title = data["title"];
            session.history.push({
              message: data.answer,
              sender: "Bot",
              referencePaths : data.reference_filepaths
            });
            return newSessions;
          } 
        }
        return newSessions;
      });
    })
  }, []);

  return (
    <>
      <IconContext.Provider
        value={{
          size: "1.8em",
          color: "#8696a0",
          className: "global-class-name",
        }}
      >
        <Container>
          <LeftSide states={states} />
          <RightSide
            states={states}
          />
        </Container>
      </IconContext.Provider>
    </>
  );
}

export default App;
