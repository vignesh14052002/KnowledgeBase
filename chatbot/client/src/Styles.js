import styled, { keyframes } from "styled-components";

const scrollbar = `
/* width */
&::-webkit-scrollbar {
  width: 5px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: transparent; 
}
 
/* Handle */
&::-webkit-scrollbar-thumb {
  background: #374045; 
}
`;
const Container = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: space-around;
  gap: 0em;
  /* padding: 10px 0px; */
`;
const ContactsContainer = styled.div`
  margin: 10px 2px 10px 10px;
  flex-basis: 20%;
  background-color: #111b21;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2em;
  border-radius: 1px;
  .scroll {
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    ${scrollbar}
  }
`;
const MessageArea = styled.div`
  margin: 10px 10px 10px 2px;
  flex-basis: 80%;
  /* background-color:green; */
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  height: 98%;
`;
const ChatArea = styled.div`
  height: 90%;
  background-color: #0b141a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;
  ${scrollbar}
`;
const Message = styled.div`
  /* width: 60%; */
  display: flex;
  flex-direction: column;
  min-width: 5%;
  padding: 5px;
  background-color: ${(props) => (props.mine ? "#005c4b" : "#202c33")};
  color: #e9edef;
  border-radius: 10px;
  margin: 10px;
  align-self: ${(props) => (props.mine ? "flex-end" : "flex-start")};
  .sender {
    font-size: 1.1em;
    color: #9db137;
  }
  .message-body {
    font-size: 1em;
    color: white;
  }
  .createdAt {
    font-size: 0.7em;
    align-self: flex-end;
    color: #8696a0;
  }
`;
const LastMessage = styled.div`
  width: 100px;
  padding-top: 100px;
`;

const MessageField = styled.div`
  height: 10%;
  background-color: #202c33;
  border-radius: 5px;
  display: flex;
`;
const Input = styled.input`
  align-self: center;
  flex-basis: 100%;
  height: 50%;
  outline: none;
  border: none;
  background-color: #2a3942;
  border-radius: 5px;
  padding-left: 20px;
  margin-left: 20px;
  color: white;
  &::placeholder {
    color: #8696a0;
  }
`;
//inside textbox #2a3942
//light grey #8696a0
const SendButton = styled.div`
  flex-basis: 10%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Contact = styled.div`
  position: relative;
  width: 95%;
  font-size: 0.8em;
  color: #e9edef;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#2a3942" : "")};
  &:hover {
    background-color: ${(props) => (props.selected ? "#2a3942" : "#202c33")};
    cursor: pointer;
  }
  p {
    height: 20px;
  }
`;

const Header = styled(Contact)`
  position: relative;
  margin-bottom: 5px;
  margin-left: 1px;
  width: 100%;
  background-color: #202c33;
  color: #e9edef;
  font-size: 0.8em;
  border-radius: 5px;
`;
const Profilepic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
`;
const Search = styled.div`
  display: flex;
  gap: 1em;
  width: 90%;
  input {
    width: 90%;
    height: 25px;
    outline: none;
    border: none;
    background-color: #2a3942;
    border-radius: 5px;
    padding-left: 20px;
    color: #8696a0;

    &::placeholder {
      color: #8696a0;
    }
  }
`;
const WaveAnimation = keyframes`
  0%,
	60%,
	100% {
    transform: initial;
  }
  30% {
    transform: translateY(-10px);
  }
`;
const TypingWave = styled.div`
  text-align: center;
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 5px;
    background: #aaa;
    animation: ${WaveAnimation} 1s linear infinite;
    animation-delay: -0.9s;
  }
  .dot.two {
    animation-delay: -0.7s;
  }
  .dot.three {
    animation-delay: -0.6s;
  }
`;
export {
  TypingWave,
  Search,
  Profilepic,
  Header,
  ChatArea,
  Contact,
  ContactsContainer,
  Container,
  MessageArea,
  MessageField,
  Message,
  Input,
  SendButton,
  LastMessage,
};
