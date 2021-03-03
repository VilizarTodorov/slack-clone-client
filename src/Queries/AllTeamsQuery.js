import { gql } from "@apollo/client";

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default allTeamsQuery;
