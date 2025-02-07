import type React from "react"
import type { Project } from "../Dashboardd/Dashboard"
import "./RecentProjects.css"
import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"


interface RecentProjectsProps {
  projects: Project[]
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
  );

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditFormVisible(true);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEditFormVisible(false);
  };

  return (
    <div className="recent-projects">
      <h2>Proyectos Recientes</h2>
      <ul className="project-list">
        {sortedProjects.map((project) => (
          <li key={project.id} className="project-item">
            <span className="project-name">{project.name}</span>
            <span className={(`project-status ${project.status.toLowerCase().replace(" ", "-")}`)}>
              {project.status}
            </span>
            <span className="project-updated">{project.lastUpdated}</span>
            <button onClick={() => handleEditClick(project)} className="button-edit">Editar</button>
          </li>
        ))}
      </ul>
      {selectedProject && (
        <Modal show={isEditFormVisible} onHide={() => setIsEditFormVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formProjectName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProject.name}
                  onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                />
      </Form.Group>
              <Form.Group controlId="formProjectStatus" className="mt-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProject.status}
                  onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formProjectLastUpdated" className="mt-3">
                <Form.Label>Última Actualización</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProject.lastUpdated}
                  onChange={(e) => setSelectedProject({ ...selectedProject, lastUpdated: e.target.value })}
                />
              </Form.Group>
              <Modal.Footer className="mt-3">
                <Button variant="secondary" onClick={() => setIsEditFormVisible(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default RecentProjects

