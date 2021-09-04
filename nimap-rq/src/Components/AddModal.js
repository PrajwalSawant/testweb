import React, { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddModal = ({ show, handleClose, handleSubmit }) => {
  const taskRef = useRef();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit(e, taskRef.current.value)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                placeholder="Enter Your Task Here"
                type="text"
                ref={taskRef}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
