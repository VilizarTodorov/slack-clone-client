import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Container, Form, Header, Message } from "semantic-ui-react";
import { CREATE_TEAM_STR, SUBMIT, FORM_ERROR_MESSAGE_HEADER_STR, TEAM_NAME_STR } from "../../constants/strings";
import { createTeamMutation } from "../../Mutations";

const INITIAL_ERROR_STATE = {
  nameError: "",
};

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputErrors, setInputErrors] = useState({ ...INITIAL_ERROR_STATE });
  const [createTeam, { data }] = useMutation(createTeamMutation);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await createTeam({ variables: { name } });
      const { ok, errors } = res.data.createTeam;
      if (ok) {
        console.log(ok);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header textAlign="center" as="h2">
        {CREATE_TEAM_STR}
      </Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            fluid
            error={!!inputErrors.nameError}
            label={TEAM_NAME_STR}
            type="text"
            value={name}
            placeholder={TEAM_NAME_STR}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Field>
        <Button fluid>{SUBMIT}</Button>
      </Form>
      {errorMessages.length > 0 ? <Message error header={FORM_ERROR_MESSAGE_HEADER_STR} list={errorMessages} /> : null}
    </Container>
  );
};

export default CreateTeam;
