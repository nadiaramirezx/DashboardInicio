import type React from "react"
import type { Project } from "../Dashboardd/Dashboard"
import "./RecentProjects.css"
import { useState } from "react"
import { Table,Modal, Button, Form } from "react-bootstrap"



interface RecentProjectsProps {
  projects: Project[];
  onAddProject: () => void; //callback para boton agregar proyecto
  onUpdateProject: (updatedProject: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, onAddProject, onUpdateProject, onDeleteProject }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [filter, setFilter] = useState<string>("");
  

   // Filtra y ordena los proyectos por la fecha de entrega
   const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase())
  );

  //ordena los proyects por fecha
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
  );

  //clic para boton de editar
  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditFormVisible(true);
  };

  //envio del form de edicion
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if ( selectedProject) {
      onUpdateProject(selectedProject)
    }
    setIsEditFormVisible(false);
  };

 // Maneja el clic en el botón de eliminar
 const handleDeleteClick = (projectId: number) => {
  onDeleteProject(projectId)// Aquí podrías eliminar el proyecto del estado general de la aplicación
};


  return (
      <div className="recent-projects">
        <h2>Proyectos Recientes</h2>
        <div className="table-controls">
          <Form.Control 
            type="text"
            placeholder="Filtrar proyectos"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="me-2"
          />
          <Button onClick={onAddProject} className="boton-agregar">
          Agregar Proyecto
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Equipo</th>
              <th>Progreso</th>
              <th>Fecha de Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.team}</td>
                <td>{project.progress}%</td>
                <td>{project.dueDate}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditClick(project)} className="me-3">
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteClick(project.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
                    onChange={(e) =>
                      setSelectedProject({ ...selectedProject, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formProjectStatus" className="mt-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProject.status}
                    onChange={(e) =>
                      setSelectedProject({ ...selectedProject, status: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formProjectTeam" className="mt-3">
                  <Form.Label>Equipo</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProject.team}
                    onChange={(e) =>
                      setSelectedProject({ ...selectedProject, team: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formProjectProgress" className="mt-3">
                  <Form.Label>Progreso</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedProject.progress}
                    onChange={(e) =>
                      setSelectedProject({ ...selectedProject, progress: parseInt(e.target.value) })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formProjectDueDate" className="mt-3">
                  <Form.Label>Fecha de Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedProject.dueDate}
                    onChange={(e) =>
                      setSelectedProject({ ...selectedProject, dueDate: e.target.value })
                    }
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

