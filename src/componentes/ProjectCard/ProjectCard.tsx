import React from "react";
import { Project } from "../Dashboardd/Dashboard";
import "./ProjectCard.css";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>
          {project.status}
        </span>
      </div>
      <p>{project.description || "Sin Descripción."}</p>
      <div className="project-details">
        <small><strong>Última Actualización:</strong> {project.lastUpdated}</small>
        <small><strong>Equipo:</strong> {project.team}</small>
      </div>
    </div>
  );
};

export default ProjectCard;
