import { gql } from "@apollo/client";

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
        public
      }
      errors {
        path
        message
      }
    }
  }
`;

export default createChannelMutation;
