import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import FeedbackForm from "./Pages/User/FeedbackForm";
import FeedbackFromHof from "./Pages/Hof/FeedbackForm";

import FeedbackFromCi from "./Pages/CI/FeedbackForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "./Pages/Admin";
import AddUser from "./Pages/Admin/AddUser";
import AddStudent from "./Pages/Admin/AddStudent";
import ViewCounseleeList from "./Pages/Admin/ViewCounseleeList";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import FeedbackPage from "./Pages/User/FeedbackPage";
import AddQuestions from "./Pages/Admin/AddQuestions";
import ForgotPassword from "./Pages/Login/forgotpassword";

const Routing = (props) => {
  const navigate = useNavigate();
  const { token, userType } = props;
  return (
    <>
      {!token && (
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/forgotpassword" Component={ForgotPassword} />
        </Routes>
      )}{" "}
      {userType == "admin" && token && (
        <Routes>
          <Route path="/" Component={AdminDashboard} />
          <Route path="/admin/adduser" Component={AddUser} />
          <Route path="/admin/addstudent/:counselId" Component={AddStudent} />
          <Route
            path="/admin/viewcounseleelist/:counselId"
            Component={ViewCounseleeList}
          />
          <Route path="/admin/addquestions" Component={AddQuestions} />
        </Routes>
      )}
      {userType == "counsellor" && token && (
        <Routes>
          <Route path="/" Component={FeedbackForm} />
          <Route path="/feedbackpageprint" Component={FeedbackPage} />
        </Routes>
      )}
    </>
  );
};

function App(props) {
  const { token, userType } = props;
  console.log(props);
  // useEffect(() => {
  //   dispatch(setToken(localStorage.getItem("token")))
  // }, [])

  return (
    <BrowserRouter>
      <Routing token={token} userType={userType} />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.loginDetails.token,
    userType: state.loginDetails.userType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (data) => {
      dispatch({
        type: "SET_TOKEN",
        token: data,
      });
    },
    setServiceId: (data) => {
      dispatch({
        type: "SET_SERVICE_ID",
        service_id: data,
      });
    },
    setType: (data) => {
      dispatch({
        type: "SET_TYPE",
        userType: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
