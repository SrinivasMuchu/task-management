import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import RegisterAndLogin from './Components/OnBoarding/RegisterAndLogin';
import EditDetails from './Components/OnBoarding/EditDetails';
import NavBar from './Components/HomePage/NavBar';
import LoggedInNavPage from './Components/HomePage/LoggedInNavPage';
import TaskList from './Components/TaskList/TaskList';
import TaskForm from './Components/TaskManagement/TaskForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<LoggedInNavPage />} />
        <Route path="/signup" element={<RegisterAndLogin type='register'/>} />
        <Route path="/login" element={<RegisterAndLogin type='login'/>} />
        <Route path="/edit-details" element={<EditDetails type='edit'/>} />
        <Route path="/change-password" element={<EditDetails type='pass'/>} />
        <Route path="/task-list" element={<TaskList/>} />
        <Route path="/task-form" element={<TaskForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
