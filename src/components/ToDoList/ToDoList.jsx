import { useState, useEffect } from "react";
import {
  AllTasksService,
  deleteToDoService,
  onChangeCheckBoxService,
  addNewTaskService,
  saveToDoService
} from "services/services";
import AddTask from "components/AddTask/AddTask";
import Tasks from "components/Tasks/Tasks";
import "./style.scss";

const showError = (error) => {
  const textError = document.getElementById("error-messsage");

  if (!textError) {
    return;
  }

  textError.innerText = error;
};

const ToDoList = () => {
  const [edited, setEdited] = useState(null);
  const [text, setText] = useState(" ");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    allTasks();
  }, []);

  const allTasks = async () => {
    try {
      const res = await AllTasksService();
      const result = await res.data;
      setTasks(result);
    } catch (error) {
      showError("not be empty")
    }
  };

  const addTask = async (addText) => {
    try {
      const responce = await addNewTaskService(addText);
      setTasks([responce.data, ...tasks])
      return responce.data;
    } catch (error) {
      showError("data add error");
    }
  }

  const deleteOne = async (id) => {
    try {
      const responce = await deleteToDoService(id);
      
      if (responce.data.deleteCount === 1) {
        const filterTasks = tasks.filter((item) => id !== item._id);
        setTasks(filterTasks);
      }

    } catch (error) {
      showError("deleted error")
    }
  };

  const onCheckBoxTask = async (id) => {
    try {
      const responce = await onChangeCheckBoxService(id, tasks);
      tasks.forEach((element) => {

        if (element._id === id) {
          element.isCheck = responce.data.isCheck;
        }

        tasks.sort((a, b) => 
        a.isCheck > b.isCheck ? 1: a.isCheck < b.isCheck ? -1:0
        );
        setText([...tasks]);
      });
    } catch (error) {
      showError("change checkbox error");
    }
  };

  const editToDo = (id, text) => {
    setEdited(id);
    setText(text);
  };

  const saveTask = async (id, newText) => {
    try {
      
      if (newText.trim() === "") {
        showError("not be empty");
        return;
      }

      const responce = await saveToDoService(id, newText);
      tasks.forEach((element) => {

        if (responce.data._id === element._id) {
          element.text = responce.data.text;
        }
      });
      setText([...tasks, responce.data.text]);
      setEdited(null);
      showError("");
    } catch (error) {
      showError("edit text error");
    }
  };

  return (
    <div className="App_todolist">
      <AddTask text={text} 
        addTask={addTask}
        //deleteTask={deleteTask}
        showError={showError} 
      />
      <Tasks tasks={tasks}
        edited={edited}
        text={text}
        deleteOne={deleteOne}
        onCheckboxTask={onCheckBoxTask}
        editToDo={editToDo}
        saveTask={saveTask}
        showError={showError}
      />
    </div>
  );
};

export default ToDoList;