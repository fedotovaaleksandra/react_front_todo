import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./style.scss";

const AddTask = ({ text, addTask, showError, deleteTask }) => {
  const [ addText, setAddText ] = useState(text);

  const  addNewTask = async () => {
     if (addText.trim() === "") {
      showError("not be empty");
      return;
     }
     const newTask = await addTask(addText);

     if (newTask) {
      setAddText("");
      showError("");
     }
  };
  
  return (
    <div className="control">
      <h1 className="control_header"> To-Do List</h1>
      <input 
      className="control_input"
      type="text"
      value={addText}
      onChange={(elem) => setAddText(elem.target.value)}
      />
      <button
      type="button"
      className="control_btn"
      onClick={addNewTask}
      >
        Добавить задачу
      </button>
    </div>
  );
};

export default AddTask;