import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { messagesQuery } from "../../Queries";
import Message from "./Message";

const MessagesWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
`;

const Messages = ({ channelId }) => {
  const { loading, error, data } = useQuery(messagesQuery, { variables: { channelId } });
  if (loading) {
    return <div>...Loading</div>;
  }

  if (data) {
    console.log(channelId);
    console.log(data);
    return <div>done</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <MessagesWrapper>
      {/* <ul className="messages-list">
        {messages.map((message, index) => (
          <Message key={index}>{message}</Message>
        ))}
      </ul> */}
    </MessagesWrapper>
  );
};

export default Messages;
