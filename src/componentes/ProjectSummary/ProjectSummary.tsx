import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Project } from "../Dashboardd/Dashboard";
import "./ProjectSummary.css";

interface ProjectSummaryProps {
  projects: Project[];
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ projects }) => {
  const projectStatuses = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {} as Record<Project["status"], number>);

  const data = Object.keys(projectStatuses).map((status) => ({
    name: status,
    Total: projectStatuses[status],
  }));

  return (
    <div className="project-summary">
      <h2>Estados</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#fad37d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectSummary;

