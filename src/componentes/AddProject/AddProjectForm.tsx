import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Project } from "../Dashboardd/Dashboard";

interface Props {
  show: boolean;
  onHide: () => void;
  onAddProject: (newProject: Omit<Project, "id" | "lastUpdated">) => void;
}

const AddProjectForm: React.FC<Props> = ({ show, onHide, onAddProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"In Progress" | "Completed" | "Pending">("Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("El nombre del proyecto es obligatorio");

    onAddProject({ name, description, status });
    setName("");
    setDescription("");
    setStatus("Pending");
    onHide(); // Cerrar modal después de guardar
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Proyecto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción del proyecto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="Pending">Pendiente</option>
              <option value="In Progress">En Progreso</option>
              <option value="Completed">Completado</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
              Guardar Proyecto
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProjectForm;
