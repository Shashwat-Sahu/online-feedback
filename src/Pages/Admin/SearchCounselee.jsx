import React, { useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import User from "./User";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setServiceId } from "../../Reducers/loginReducer";
import { logout } from "../../Controllers/logoutController";
import { Box, Fab, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const SearchCounselee = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState({ message: null, error: null });
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (e) => {
    setSubmitting(true)
    axios
      .get("/getCounselee?service_id=" + e.target.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setSubmitting(false)
        setReports(data?.data?.data);
        setMessage({ message: data?.data?.message, error: null });
      })
      .catch((err) => {
        setSubmitting(false)
        err = err.response.data;
        setMessage({ error: err?.error, message: null });
        if (err.error == "Not Authorized") {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

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
        <Col>
            <Fab
              variant="extended"
              onClick={() => {
                navigate("/");
              }}
            >
              <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
              Back to Dashboard
            </Fab>
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
          <Col xs={4}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon />
              <TextField
                id="standard-basic"
                label="Service ID"
                variant="standard"
                onChange={handleChange}
              />
            </Box>
          </Col>
        </Row>
        <Row>
        {submitting && (
                  <div className=" mt-3 d-flex justify-content-center">
                    <Spinner
                      animation="border"
                      variant="light"
                      className="m-auto"
                    />
                  </div>
                )}
          {reports.length>0&&<table class="table table-hover table-bordered mt-4 table-sm">
            <thead>
              <tr>
                <th scope="col">Service ID</th>
                <th scope="col">Download Sessions Reports</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                return (
                  <tr>
                    <td>{report.service_id}</td>
                    <td>
                      Download Report{" "}
                      <DownloadIcon
                        onClick={() => {
                          navigate("/feedbackpageprint", {
                            state: report,
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>}
          
        </Row>
      </Container>
    </div>
  );
};

export default SearchCounselee;
