import styled from "styled-components";
import Team from "./Team";

const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
`;

const Teams = ({ teams }) => {
  return (
    <TeamsWrapper>
      <TeamList>
        {teams.map((team, index) => (
          <Team key={index} name={team}></Team>
        ))}
      </TeamList>
    </TeamsWrapper>
  );
};

export default Teams;
