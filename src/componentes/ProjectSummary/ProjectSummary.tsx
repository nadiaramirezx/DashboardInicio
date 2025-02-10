import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
        data={data}
        layout="vertical"
         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#fad37d" />
          <LabelList dataKey="Total" position="insideRight"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectSummary;

