import { Route, Routes } from "react-router-dom";
import ToDoList from "./components/ToDoList/ToDoList";
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDoList/>}/>
      </Routes>
    </div>
  );
};

export default App;
