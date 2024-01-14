import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import FeedbackFrom from './Pages/User/FeedbackForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './Pages/Admin';
import AddUser from './Pages/Admin/AddUser';
import AddStudent from './Pages/Admin/AddStudent';
import ViewCounseleeList from './Pages/Admin/ViewCounseleeList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/userfeedback" Component={FeedbackFrom} />
        <Route path="/admindashboard" Component={AdminDashboard}/>
        <Route path="/admin/adduser" Component={AddUser}/>
        <Route path="/admin/addstudent" Component={AddStudent}/>
        <Route path="/admin/viewcounseleelist/:counselId" Component={ViewCounseleeList} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
