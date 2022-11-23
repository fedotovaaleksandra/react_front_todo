import host from "constants";
import axios from "axios";

const AllTasksService = async () => {
  const res = await axios.get(host);
  return res;
};

const addNewTaskService = async (text) => {
  const answer = await axios.post(host, {
    text,
  });

  return answer;
};

const deleteToDoService = async (id) => {
  const response = await axios.delete(`${host}/${id}`);
  return response;
};

const onChangeCheckBoxService = async (id, tasks) => {
  const task = tasks.find((item) => item._id === id);

  if (!task) {
    return;
  }

  const check = !task.isCheck;
  const response = await axios.patch(`${host}/check/${id}`, {
    isCheck: check,
  });
  return response;
};

const saveToDoService = async (id, text) => {
  const res = await axios.patch(`${host}/text/${id}`, {
    text,
  });
  return res;
};

export {
  AllTasksService,
  addNewTaskService,
  deleteToDoService,
  onChangeCheckBoxService,
  saveToDoService,
};