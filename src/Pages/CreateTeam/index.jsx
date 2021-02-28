import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, Header, Message } from "semantic-ui-react";
import { CREATE_TEAM_STR, SUBMIT, FORM_ERROR_MESSAGE_HEADER_STR, TEAM_NAME_STR } from "../../constants/strings";
import { createTeamMutation } from "../../Mutations";
import { LOGIN } from "../../constants/routes";
import jwt_decode from "jwt-decode";
import { withAuthorization } from "../../HOCs";

const INITIAL_ERROR_STATE = {
  nameError: "",
};

const CreateTeam = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputErrors, setInputErrors] = useState({ ...INITIAL_ERROR_STATE });
  const [createTeam, { data }] = useMutation(createTeamMutation);

  const onSubmit = async (event) => {
    event.preventDefault();

    let response = null;

    try {
      response = await createTeam({ variables: { name } });
    } catch (error) {
      history.push(LOGIN);
      return;
    }

    const { ok, errors } = response.data.createTeam;

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

const condition = (user) => {
  try {
    jwt_decode(user.token);
    jwt_decode(user.refreshToken);
  } catch (error) {
    return false;
  }
  return true;
};

export default withAuthorization(condition)(CreateTeam);
