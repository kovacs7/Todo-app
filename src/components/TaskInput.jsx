import {
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/features/taskSlice";
import { useState } from "react";
import { useLocalStorageEffect } from "../redux/features/taskSlice";
import { AiOutlineFileDone } from "react-icons/ai";
import Alert from "react-bootstrap/Alert";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("title");
  const [disc, setDisc] = useState("disc");
  const state = useSelector((state) => {
    return state.task;
  });

  useLocalStorageEffect(state);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDisc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        title: title,
        disc: disc,
      })
    );
    setTitle("");
    setDisc("");
  };

  return (
    <>
      <Container>
        <Form className="mt-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>
              <strong>YOUR TASK:</strong>
            </FormLabel>
            <FormControl
              type="text"
              size="lg"
              placeholder="Task Heading..."
              onChange={handleTitleChange}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <strong>DESCRIPTION:</strong>
            </FormLabel>
            <FormControl
              type="text"
              size="lg"
              placeholder="Add your task details..."
              onChange={handleDescriptionChange}
              required={true}
            />
          </FormGroup>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            onClick={() => setShow(true)}>
            <strong>
              <AiOutlineFileDone /> Submit Task
            </strong>
          </Button>

          <Alert show={show} variant="success">
            <Alert.Heading>Submitted</Alert.Heading>
            <p>Your task has been added to the Task List.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close
              </Button>
            </div>
          </Alert>
        </Form>
      </Container>
    </>
  );
};

export default TaskInput;
