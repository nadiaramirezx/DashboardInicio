import type React from "react"
import "./TeamList.css"

interface Team {
  id: number
  name: string
  members: number
  projectsCount: number
}

const TeamsList: React.FC = () => {
  const teams: Team[] = [
    { id: 1, name: "Design Team", members: 5, projectsCount: 3 },
    { id: 2, name: "Development Team", members: 8, projectsCount: 5 },
    { id: 3, name: "Marketing Team", members: 4, projectsCount: 2 },
    { id: 4, name: "QA Team", members: 3, projectsCount: 5 },
  ]

  return (
    <div className="teams-list-wrapper">
    <div className="teams-list">
      <h2>Equipos</h2>
      <table className="team-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>Miembros</th>
            <th>Proyectos</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.members}</td>
              <td>{team.projectsCount}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
  
}

export default TeamsList

