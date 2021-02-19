import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery(allUsersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }
  return data.allUsers.map(({ id }) => (
    <div key={id}>
      <p>{id}</p>
    </div>
  ));
}

export default App;

const allUsersQuery = gql`
  {
    allUsers {
      id
    }
  }
`;
