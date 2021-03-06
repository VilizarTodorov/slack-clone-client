import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Form, Header, Button, Message } from "semantic-ui-react";
import { HOME } from "../../constants/routes";
import { EMAIL_STR, FORM_ERROR_MESSAGE_HEADER_STR, LOGIN_STR, PASSWORD_STR, SUBMIT } from "../../constants/strings";
import { loginMutation } from "../../Mutations";

const getPreviousPathFromLocation = (location) => {
  const { from } = location.state || { from: HOME };
  return from;
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const [login, { data }] = useMutation(loginMutation);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await login({ variables: { email, password } });
      const { errors, ok, refreshToken, token } = res.data.login;

      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        const from = getPreviousPathFromLocation(location);

        history.replace(from);
      } else {
        const messagesList = [];

        errors.forEach(({ path, message }) => {
          messagesList.push(message);
        });

        setErrorMessages(messagesList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header textAlign="center" as="h2">
        {LOGIN_STR}
      </Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            fluid
            label={EMAIL_STR}
            type="email"
            value={email}
            placeholder={EMAIL_STR}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            fluid
            label={PASSWORD_STR}
            type="password"
            value={password}
            placeholder={PASSWORD_STR}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Field>

        <Button fluid>{SUBMIT}</Button>
      </Form>

      {errorMessages.length > 0 ? <Message error header={FORM_ERROR_MESSAGE_HEADER_STR} list={errorMessages} /> : null}
    </Container>
  );
};

export default Login;
