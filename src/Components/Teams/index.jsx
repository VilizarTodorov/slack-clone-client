import styled from "styled-components";
import Team from "./Team";

const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
  color: #958993;
`;

const Teams = ({ teams }) => {
  return (
    <TeamsWrapper>
      <ul>
        <li>Teams</li>
        {teams.map((team) => (
          <Team name={team}></Team>
        ))}
      </ul>
    </TeamsWrapper>
  );
};

export default Teams;
