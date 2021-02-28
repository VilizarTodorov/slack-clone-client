import styled from "styled-components";
import Message from "./Message";

const MessagesWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
`;

const Messages = ({ messages }) => {
  return (
    <MessagesWrapper>
      <ul className="messages-list">
        {messages.map((message, index) => (
          <Message key={index}>{message}</Message>
        ))}
      </ul>
    </MessagesWrapper>
  );
};

export default Messages;
