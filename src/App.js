import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import FeedbackFrom from './Pages/User/FeedbackForm'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
        {/* <Login/> */}
      <FeedbackFrom/>
    </div>
  );
}

export default App;
