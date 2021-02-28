import { Input } from "semantic-ui-react";
import styled from "styled-components";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin:20px
`;

const SendMessage = ({ channelName }) => {
  return (
    <SendMessageWrapper>
      <Input fluid placeholder={`Message #${channelName}`}></Input>
    </SendMessageWrapper>
  );
};

export default SendMessage;
