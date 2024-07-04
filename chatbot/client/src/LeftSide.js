import { useState, useEffect } from "react";

import { IoSearch, IoExitOutline } from "react-icons/io5";
import { RiChatNewFill } from "react-icons/ri";
import {
  Search,
  Profilepic,
  Header,
  Contact,
  ContactsContainer,
} from "./Styles.js";
import { Navigate } from "react-router-dom";

import {
  handleAddContact,
  handleSearch,
  handleContact,
  getProfileImg,
} from "./utils.js";

export default function LeftSide(props) {
  const states = props.states;

  const sessions = states.sessions;

  const [displaySessions, setDisplaySessions] = useState([
    ...states.sessions,
  ]);

  useEffect(() => {
    setDisplaySessions(sessions);
  }, [sessions]);

  const selectedSession = states.sessions[states.selectedSessionIndex];
  return (
    <ContactsContainer>
      <Header>
        <Profilepic src={getProfileImg(1)} />
        <h2>Chat with knowledge base</h2>
        
      </Header>
      {/* <input type="text" id="addcontact"/>
        <button onClick={handleAddContact}>
          Add contact
        </button> */}
      <Search>
        <IoSearch size={25} />
        <input
          type="text"
          placeholder="Search chat"
          onInput={(e) =>
            handleSearch(e, { sessions, setDisplaySessions })
          }
        ></input>
      <RiChatNewFill style={{cursor:"pointer"}} onClick={states.createNewSession}/>
      </Search>
      <div className="scroll">
        {displaySessions.map((d, i) => (
          <Contact
            key={i}
            onClick={() => states.setSelectedSessionIndex(i)}
            selected={selectedSession.title === d.title}
          >
            <Profilepic src={getProfileImg(50)} />
            <div>
              <h2>{d.title}</h2>
              <p>{d.history[0]?.message}</p>
            </div>
            {d.isonline && (
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#00cc00",
                  borderRadius: "50%",
                  position: "absolute",
                  right: "10px",
                }}
              >
                .
              </span>
            )}
          </Contact>
        ))}
      </div>
    </ContactsContainer>
  );
}
