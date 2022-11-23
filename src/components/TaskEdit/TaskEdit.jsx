import { useState } from "react";
import "./style.scss";

const TaskEdit = ({text, saveTask, id, deleteToDo, showError}) => {
  const [newText, setNewText] = useState(text)

  const saveToDo = async (id, newText) => {
    const editedTask = await saveTask(id, newText);

    if (editedTask) {
      setNewText(newText);
      showError("");
    }
    return editedTask;
  };

  return (
    <div>
      <input value={newText} onChange={(ele) => setNewText(ele.target.value)}/>
      <button type="button" className="btn" onClick={() => saveToDo(id, newText)}>
        Сохранить
      </button>
      <button type="button" className="btn" onClick={() => deleteToDo(id)}>
        Удалить
      </button>
    </div>
  );
};

export default TaskEdit;