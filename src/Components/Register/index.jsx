import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Header, Button, Message } from "semantic-ui-react";
import { EMAIL_STR, PASSWORD_STR, REGISTER_STR, REPEAT_PASSWORD_STR, USERNAME_STR } from "../../constants/strings";
import registerMutation from "../../Mutations/registerMutation";
import { HOME } from "../../constants/routes";

const INITIAL_ERROR_STATE = {
  usernameError: "",
  emailError: "",
  passwordError: "",
};

const Register = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");

  const [inputErrors, setInputErrors] = useState({ ...INITIAL_ERROR_STATE });

  const [errorMessages, setErrorMessages] = useState([]);

  const [register, { data }] = useMutation(registerMutation);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await register({ variables: { username, email, password } });

      const { ok, errors } = res.data.register;
      if (ok) {
        history.push(HOME);
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
    <Container text>
      <Header textAlign="center" as="h2">
        {REGISTER_STR}
      </Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            label={USERNAME_STR}
            error={!!inputErrors.usernameError}
            fluid
            type="text"
            value={username}
            placeholder={USERNAME_STR}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            label={EMAIL_STR}
            error={!!inputErrors.emailError}
            fluid
            type="email"
            value={email}
            placeholder={EMAIL_STR}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            label={PASSWORD_STR}
            error={!!inputErrors.passwordError}
            fluid
            type="password"
            value={password}
            placeholder={PASSWORD_STR}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            label={REPEAT_PASSWORD_STR}
            fluid
            type="password"
            value={repeatPassword}
            placeholder={REPEAT_PASSWORD_STR}
            onChange={(event) => setRepeatPassword(event.target.value)}
            required
          />
        </Form.Field>

        <Button fluid>Submit</Button>
      </Form>
      {errorMessages.length > 0 ? (
        <Message error header="There was some errors with your submission" list={errorMessages} />
      ) : null}
    </Container>
  );
};

export default Register;
