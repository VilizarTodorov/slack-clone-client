import { gql, useQuery } from "@apollo/client";
import Routes from "./Pages/Routes";
import { Fragment } from "react";

function App() {
  // const { loading, error, data } = useQuery(allUsersQuery);

  // if (loading) return <p>Loading...</p>;
  // if (error) {
  //   console.log(error);
  //   return <p>Error</p>;
  // }
  return (
    <Fragment>
      {/* {data.allUsers.map(({ id, email, username }) => (
        <div key={id}>
          <p>
            {id} : {email} : {username}
          </p>
        </div>
      ))} */}
      <Routes></Routes>
    </Fragment>
  );
}

export default App;

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;
