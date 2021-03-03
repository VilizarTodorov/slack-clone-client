import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Message, Modal } from "semantic-ui-react";
import {
  ADD_CHANNEL_STR,
  CANCEL_STR,
  CHANNEL_NAME_STR,
  FORM_ERROR_MESSAGE_HEADER_STR,
  SUBMIT,
} from "../../constants/strings";
import { createChannelMutation } from "../../Mutations";

const INITIAL_ERROR_STATE = {
  nameError: "",
};

const AddChannelModal = ({ isOpen, onClose, teamId }) => {
  const [name, setName] = useState("");
  const [createChannel, { data }] = useMutation(createChannelMutation);
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputErrors, setInputErrors] = useState({ ...INITIAL_ERROR_STATE });

  const onCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let response = null;

    try {
      response = await createChannel({ variables: { teamId, name } });
    } catch (error) {
      console.log("there was an error");
      console.log(error);
    }

    const { ok, errors } = response.data.createChannel;

    if (ok) {
      // history.push(`${VIEW_TEAM_LINK_ROUTE}/${team.id}`);
      console.log(ok);
      console.log("success");
      onClose();
    } else {
      const err = { ...INITIAL_ERROR_STATE };
      const messagesList = [];

      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
        messagesList.push(message);
      });

      setInputErrors(err);
      setErrorMessages(messagesList);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>{ADD_CHANNEL_STR}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Form.Input
              fluid
              error={!!inputErrors.nameError}
              label={CHANNEL_NAME_STR}
              type="text"
              value={name}
              placeholder={CHANNEL_NAME_STR}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Button onClick={onCancel} fluid>
              {CANCEL_STR}
            </Button>
            <Button fluid>{SUBMIT}</Button>
          </Form.Group>
        </Form>
        {errorMessages.length > 0 ? (
          <Message error header={FORM_ERROR_MESSAGE_HEADER_STR} list={errorMessages} />
        ) : null}
      </Modal.Content>
    </Modal>
  );
};

export default AddChannelModal;
