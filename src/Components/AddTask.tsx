import { useState } from "react";
import { ITask } from "../App";

interface IAddTask {
  isAddTask: boolean;
  handleClose: (isOpen: boolean) => void;
  addTask: (name: string) => void;
  Tasks: ITask[];
}
const AddTask = ({ isAddTask, handleClose, addTask, Tasks }: IAddTask) => {
  const [Taskname, setTaskname] = useState("");
  const [isErroe, setIsErroe] = useState("");
  const handleSubmit = () => {
    if (Taskname != "") {
      var data = Tasks.find((item) => item.name === Taskname);
      if (data) {
        setIsErroe("Please provide other task");
      } else {
        addTask(Taskname);
        setTaskname("");
      }
    } else {
      setIsErroe("Please provide task");
    }
  };
  return (
    <div className={`modal ${isAddTask ? "show-modal" : ""}`}>
      <div className="modal-content">
        <input
          name="myInput"
          className="search"
          placeholder="Enter Task"
          onChange={(e) => {
            setTaskname(e.target.value);
            setIsErroe("");
          }}
          value={Taskname}
        />
        <p className="error-txt">{isErroe}</p>
        <div className="btn-box">
          <button
            className="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            SUBMIT
          </button>
          <button className="button" onClick={() => handleClose(false)}>
            CANCLE
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddTask;
