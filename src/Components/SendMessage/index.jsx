import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import { createMessageMutation } from "../../Mutations";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY_CODE = 13;

const SendMessage = ({ channelName, channelId }) => {
  const [createMessage, { date }] = useMutation(createMessageMutation);
  const [message, setMessage] = useState("");
  const onSubmit = async (event) => {
    if (event.keyCode !== ENTER_KEY_CODE) {
      return;
    }

    if (!message || !message.trim()) {
      return;
    }

    await createMessage({ variables: { channelId, text: message } });
    setMessage("");
  };
  return (
    <SendMessageWrapper>
      <Input
        fluid
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={onSubmit}
        placeholder={`Message #${channelName}`}
      ></Input>
    </SendMessageWrapper>
  );
};

export default SendMessage;
