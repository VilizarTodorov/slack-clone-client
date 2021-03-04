import React, { useState } from "react";
import { Button, Form, Message, Modal } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_MEMBER_STR, CANCEL_STR, EMAIL_STR, FORM_ERROR_MESSAGE_HEADER_STR, SUBMIT } from "../../constants/strings";
import { addTeamMemberMutation } from "../../Mutations";

const INITIAL_ERROR_STATE = {
  emailError: "",
};

const InvitePeopleModal = ({ isOpen, onClose, teamId }) => {
  const [addTeamMember, { date }] = useMutation(addTeamMemberMutation);
  const [email, setEmail] = useState("");
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
      response = await addTeamMember({ variables: { teamId, email } });
    } catch (error) {
      console.log("there was an error");
      console.log(error);
    }

    const { ok, errors } = response.data.addTeamMember;

    if (ok) {
      console.log('member added');
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
      <Modal.Header>{ADD_MEMBER_STR}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Form.Input
              fluid
              error={!!inputErrors.emailError}
              label={EMAIL_STR}
              type="email"
              value={email}
              placeholder={EMAIL_STR}
              onChange={(event) => setEmail(event.target.value)}
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

export default InvitePeopleModal;
