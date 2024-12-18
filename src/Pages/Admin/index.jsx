import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import User from "./User";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setServiceId } from "../../Reducers/loginReducer";
import { logout } from "../../Controllers/logoutController";

import SearchIcon from "@mui/icons-material/Search";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="counsellor-box">
      <Container style={{ height: "100vh" }}>
        <Row>
          <Col>
            <h1 className="text-center" style={{ color: "white" }}>
              Admin Dashboard
            </h1>
          </Col>
        </Row>
        <Row className="flex-grow-1 mt-5">
          <Col xs={6} className="d-flex">
            <Button
              style={{ backgroundColor: "#0a58ca", color: "white" }}
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                navigate("/admin/adduser");
              }}
              size="large"
            >
              Add Counsellor
            </Button>
            <Button
              style={{
                backgroundColor: "#0a58ca",
                color: "white",
                marginLeft: "5px",
              }}
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                navigate("/admin/addquestions");
              }}
              size="large"
            >
              Add Questions
            </Button>
            <Button
              style={{
                backgroundColor: "#0a58ca",
                color: "white",
                marginLeft: "5px",
              }}
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={() => {
                navigate("/admin/searchcounselee");
              }}
              size="large"
            >Feedback report
            </Button>
          </Col>
          <Col className="text-end">
            <Button
              style={{ backgroundColor: "#0a58ca", color: "white" }}
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={() => {
                logout(navigate);
              }}
              size="large"
            >
              Logout
            </Button>
          </Col>
        </Row>
        <Row>
          <User />
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
