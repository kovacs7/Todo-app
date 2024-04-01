import { Container } from "react-bootstrap";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const initializeLocalStorage = () => {
  const existingData = window.localStorage.getItem("todo");
  if (!existingData) {
    const initialData = [
      {
        id: nanoid(),
        body: {
          title: "Title",
          disc: "Description",
        },
      },
    ];
    window.localStorage.setItem("todo", JSON.stringify(initialData));
  }
};

const App = () => {
  initializeLocalStorage();
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "15px" }}>📝TODO APP</h1>
      <BrowserRouter>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              placeContent: "center",
              marginTop: "30px",
            }}>
            <Link to="/add-task">
              <Button>
                <strong style={{ color: "white", textDecoration: "none" }}>
                  ✅ Add Task
                </strong>
              </Button>
            </Link>

            <Link to="/view-task">
              <Button>
                <strong style={{ color: "white", textDecoration: "none" }}>
                  📄 View Task
                </strong>
              </Button>
            </Link>
          </div>
        </Container>
        <Routes>
          <Route path="/add-task" element={<TaskInput />} />
          <Route path="/view-task" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
