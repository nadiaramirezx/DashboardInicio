import type React from "react"
import { useEffect, useState } from "react"
import ProjectSummary from "../ProjectSummary/ProjectSummary"
import RecentProjects from "../RecentProjects/RecentProjects"
import TeamsList from "../ListaEquipos/TeamList"
import AddProjectForm from "../AddProject/AddProjectForm"
import "./Dashboard.css"
import { Button } from "react-bootstrap"
import ProjectCard from "../ProjectCard/ProjectCard"

export interface Project {
  id: number
  name: string
  description: string
  status: "In Progress" | "Completed" | "Pending"
  lastUpdated: string
  team: string;
}

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");   //carga proyectos desde localstorage al iniciar
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    // Guardar proyectos en localStorage cuando cambian
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);


  const addProject = (newProject: Omit<Project, "id" | "lastUpdated">) => {
    const project: Project = {
      ...newProject,
      id: Date.now(),
      lastUpdated: "Just now",
    };
    setProjects((prevProjects) => [project, ...prevProjects]);
  };


  
  return (
    <div className="dashboard">
      {/* ✅ Sección de Encabezado */}
      <div className="dashboard-header">
        <h2>Bienvenido, User</h2>
        
        
      </div>

      <Button 
      className="button-agregar"
      onClick={() => setShowModal(true)}>
          Agregar Proyecto
        </Button>

      {/* ✅ Sección de estadísticas */}
      <div className="stats">
        <ProjectSummary projects={projects} />
      </div>

       
      <TeamsList />
        

        {/* ✅ Sección izquierda: Proyectos recientes */}
        <div className="recientes-projects">
          <RecentProjects projects={projects} />
        </div>

       
    
      <AddProjectForm show={showModal} onHide={() => setShowModal(false)} onAddProject={addProject} />
    </div>
  );
  
}

export default Dashboard

