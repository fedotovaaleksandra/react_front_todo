import TaskEdit from "../TaskEdit/TaskEdit";
import './style.scss';

const Tasks = ({
  tasks,
  deleteOne,
  edited,
  saveTask,
  onCheckboxTask,
  editToDo,
}) => {
  const onChangeCheckBox = async (id) => {
    const checkboxTask = await onCheckboxTask(id, tasks);
    return checkboxTask;
  };

  const deleteToDo = async (id) => {
    const oneTask = await deleteOne(id);
    return oneTask;
  };


  return (
    <div className="App_tasks">
      {tasks.map((task) => (
        <div className="task">
          {edited === task._id ? (
            <TaskEdit
            text={task.text}
            saveTask={saveTask}
            deleteToDo={deleteToDo}
            id={task._id}
          />
        ) : (
          <div>
            <input type="text" 
            value={task.isCheck}
            onChange={() => onChangeCheckBox(task._id)} 
            checked={task.isCheck}
            />
            <span
              className={task.isCheck ? "text-task checkbox" : "text-task"}
            >
              {task.text}
            </span>
            {task.isCheck === true ? (
              <button
              type="button"
              className="btn"
              hidden
              onClick={() => editToDo(task._id, task.text)}
              >
                Редактировать
              </button>
            ) : (
              <button
              type="button"
              className="btn"
              onClick={() => editToDo(task._id, task.text)}
              >
                Редактировать
              </button>
            )}
            <button
            type="button"
            className="btn"
            onClick={() => deleteToDo(task._id)}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
  );
};

export default Tasks;