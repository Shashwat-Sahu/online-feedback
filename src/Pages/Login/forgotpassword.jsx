import React, { useState } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PasswordIcon from "@mui/icons-material/Password";
import { Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import { Alert, Snackbar } from "@mui/material";
import { sha256 } from "js-sha256";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { setType, setServiceId, setToken } from "../../Reducers/loginReducer";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [inputFields, setInputFields] = useState({
    service_id: "",
    password: "",
    otp: null,
    type: "admin",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: null, error: null });
  const [submitting, setSubmitting] = useState(false);
  const [otpSent, setOTPSent] = useState(false);

  const validateValues = (inputValues) => {
    if (!inputValues.service_id) {
      setMessage({ error: "Service ID is empty ", message: null });
      return true;
    }
    if (otpSent) {
      if (inputValues.password.length < 5) {
        setMessage({ error: "Password is too short", message: null });
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var error = validateValues(inputFields);
    if (error) return;
    setSubmitting(true);
    axios
      .post("/verifyOTP", {
        service_id: inputFields.service_id,
        password: sha256(inputFields.password),
        type: inputFields.type,
        otp: inputFields.otp,
      })
      .then((data) => {
        setSubmitting(false);

        setMessage({ message: data?.data?.message, error: null });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        localStorage.clear();
        err = err?.response?.data;
        setMessage({ error: err?.error, message: null });

        setSubmitting(false);
      });
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const sendOTP = () => {
    var error = validateValues(inputFields);
    if (error) return;
    setSubmitting(true);
    axios
      .post("/sendOTP", {
        service_id: inputFields.service_id,
        type: inputFields.type,
      })
      .then((data) => {
        setSubmitting(false);
        setMessage({ message: data?.data?.message, error: null });
        setOTPSent(data?.data?.message == "OTP Sent");
      })
      .catch((err) => {
        err = err?.response?.data;
        setMessage({ error: err?.error, message: null });

        setSubmitting(false);
      });
  };

  return (
    <div className="box">
      
        <Snackbar
          open={message?.error}
          autoHideDuration={6000}
          onClose={() => setMessage({ message: null, error: null })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error">
            <p className="error">{message.error}</p>
          </Alert>
        </Snackbar>
      
      <Snackbar
        open={message?.message}
        autoHideDuration={6000}
        onClose={() => setMessage({ message: null, error: null })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">
          <p className="success">{message.message}</p>
        </Alert>
      </Snackbar>
      
      <Container className="h-100">
        <Row className="h-100">
          <Col xs={12} className="d-flex justify-content-center">
            <img
              src={require("../../assets/training.png")}
              className="mt-3"
              style={{ width: "70%" }}
            />
          </Col>
          <Col md={6} xs={12} className="m-auto">
            <Form action="" onSubmit={handleSubmit}>
              <div class="container" style={{ marginBottom: "13rem" }}>
                <div class="top-header">
                  <header>Forgot Password</header>
                </div>
                <div class="input-field">
                  <div
                    className="input-container"
                    style={
                      errors.service_id ? { border: "2px solid red" } : null
                    }
                  >
                    <PersonOutlinedIcon className="icon" />
                    <input
                      type="number"
                      class="input"
                      name="service_id"
                      placeholder="Service ID"
                      value={inputFields.service_id}
                      disabled={otpSent}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {!otpSent && (
                  <div class="input-field mt-4">
                    <input
                      type="button"
                      class="submit"
                      value="Send OTP"
                      onClick={sendOTP}
                    />
                  </div>
                )}
                {otpSent && (
                  <div class="input-field">
                    <div
                      className="input-container"
                      style={
                        errors.password ? { border: "2px solid red" } : null
                      }
                    >
                      <PasswordIcon className="icon" />
                      <input
                        type="password"
                        name="password"
                        class="input"
                        placeholder="Password"
                        value={inputFields.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                {otpSent && (
                  <div class="input-field">
                    <div
                      className="input-container"
                      style={
                        errors.password ? { border: "2px solid red" } : null
                      }
                    >
                      <PasswordIcon className="icon" />
                      <input
                        type="password"
                        name="otp"
                        class="input"
                        placeholder="OTP"
                        value={inputFields.otp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                <div class="bottom">
                  <div id="admin" class="left">
                    <input
                      type="radio"
                      checked={inputFields.type == "admin"}
                      name="type"
                      onChange={handleChange}
                      value="admin"
                    />
                    <label for="check"> Admin</label>
                  </div>
                  <div id="user" class="left">
                    <input
                      type="radio"
                      checked={inputFields.type == "counsellor"}
                      name="type"
                      onChange={handleChange}
                      value="counsellor"
                    />
                    <label for="check"> Counsellor</label>
                  </div>
                </div>
                {otpSent && (
                  <div class="input-field mt-4">
                    <input type="submit" class="submit" value="Login" />
                  </div>
                )}
                {submitting && (
                  <div className=" mt-3 d-flex justify-content-center">
                    <Spinner
                      animation="border"
                      variant="light"
                      className="m-auto"
                    />
                  </div>
                )}
                <p
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: "0px",
                    left: "0px",
                    right: "0px",
                  }}
                >
                  Developed by AFTC
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
