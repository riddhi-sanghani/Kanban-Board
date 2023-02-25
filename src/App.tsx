import React, { useState, useRef } from "react";
import "./App.css";
import AddTask from "./Components/AddTask";
import TaskBox from "./Components/TaskBox";
export interface ITask {
  name: string;
  category: string;
}

const App = () => {
  const [task, setTask] = useState([
    { name: "First task", category: "Requested" },
    { name: "Second task", category: "Requested" },
    { name: "Third task", category: "Requested" },
    { name: "Fourth task", category: "Requested" },
    { name: "Fifth task", category: "Requested" },
  ]);
  const [filterTask, setFilterTask] = useState("");
  const list = ["Requested", "To do", "In Progress", "Done"];
  const [isAddTask, setIsAddTask] = useState(false);
  const onDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, cat: string) => {
    let id = e.dataTransfer.getData("id");
    console.log(cat, id);
    let tasks = task.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });
    console.log(tasks, "tasks");
    setTask([...tasks]);
  };
  const addTask = (name: string) => {
    setTask([...task, { name, category: "Requested" }]);
    setIsAddTask(false);
  };
  return (
    <>
      <div className="container">
        <input
          name="myInput"
          className="search"
          placeholder="Search Task"
          onChange={(e) => {
            setFilterTask(e.target.value);
          }}
          value={filterTask}
        />
        <div className={"main-box"}>
          {list.map((item, index) => {
            return (
              <div
                key={item}
                className="task-heading"
                style={{}}
                onDragOver={(e) => onDragOver(e, item)}
                onDrop={(e) => onDrop(e, item)}
              >
                <h2>{item}</h2>
                <TaskBox
                  data={task.filter((cat) => cat.category == item)}
                  onDragStart={(e, id) => onDragStart(e, id)}
                  cat={item}
                  filterTask={filterTask}
                ></TaskBox>

                {item == "Requested" && (
                  <button className="button" onClick={() => setIsAddTask(true)}>
                    ADD
                  </button>
                )}
              </div>
            );
          })}
          <AddTask
            Tasks={task}
            isAddTask={isAddTask}
            handleClose={() => setIsAddTask(false)}
            addTask={(name) => addTask(name)}
          ></AddTask>
        </div>
      </div>
    </>
  );
};
export default App;
