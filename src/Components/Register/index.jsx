import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Form, Header, Input, Label, Button } from "semantic-ui-react";
import { EMAIL_STR, PASSWORD_STR, REGISTER_STR, REPEAT_PASSWORD_STR, USERNAME_STR } from "../../constants/strings";
import registerMutation from "../../Mutations/registerMutation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [register, { data }] = useMutation(registerMutation);

  const onSubmit = async (event) => {
    event.preventDefault();
    await register({ variables: { username, email, password } });
    console.log(data);
  };

  return (
    <Container text>
      <Header textAlign="center" as="h2">
        {REGISTER_STR}
      </Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Label>{USERNAME_STR}</Label>
          <Input
            fluid
            type="text"
            value={username}
            placeholder={USERNAME_STR}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </Form.Field>

        <Form.Field>
          <Label>{EMAIL_STR}</Label>
          <Input
            fluid
            type="email"
            value={email}
            placeholder={EMAIL_STR}
            onChange={(event) => setEmail(event.target.value)}
            required
          ></Input>
        </Form.Field>

        <Form.Field>
          <Label>{PASSWORD_STR}</Label>
          <Input
            fluid
            type="password"
            value={password}
            placeholder={PASSWORD_STR}
            onChange={(event) => setPassword(event.target.value)}
            required
          ></Input>
        </Form.Field>

        <Form.Field>
          <Label>{REPEAT_PASSWORD_STR}</Label>
          <Input
            fluid
            type="password"
            value={repeatPassword}
            placeholder={REPEAT_PASSWORD_STR}
            onChange={(event) => setRepeatPassword(event.target.value)}
            required
          ></Input>
        </Form.Field>

        <Button fluid>Submit</Button>
      </Form>
    </Container>
  );
};

export default Register;
