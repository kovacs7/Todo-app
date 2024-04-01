import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/features/taskSlice";
import { useLocalStorageEffect } from "../redux/features/taskSlice";
import { GoGoal } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";

const TaskList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.task;
  });

  useLocalStorageEffect(state);

  const cards = useSelector((state) => {
    return state.task.map((taskObject) => {
      const handleDelete = () => {
        let taskId = taskObject.id;
        dispatch(deleteTask({ id: taskId }));
      };

      return (
        <Card
          bg="white"
          border="dark"
          text="dark"
          className="mt-5 mb-3"
          key={taskObject.id}>
          <CardHeader>
            <GoGoal /> {taskObject.body.title}
          </CardHeader>
          <CardBody className="d-flex justify-content-center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "15px",
              }}>
              <input
                type="checkbox"
                style={{
                  transform: "scale(2)",
                  margin: "15px",
                  accentColor: "green",
                }}
              />
              <label>{taskObject.body.disc}</label>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
              <strong style={{ display: "flex", alignItems: "center" }}>
                <RiDeleteBin6Fill style={{ marginRight: "5px" }} /> Delete
              </strong>
            </Button>
          </CardFooter>
        </Card>
      );
    });
  });

  return (
    <>
      <Container>
        <strong className="font-monospace">
          Total Task Left: {state.length}
        </strong>
        {cards}
      </Container>
    </>
  );
};

export default TaskList;
