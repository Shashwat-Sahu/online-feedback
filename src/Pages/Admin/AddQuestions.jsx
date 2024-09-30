import { Alert, Fab, Snackbar } from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Controllers/logoutController";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ArrowForward } from "@mui/icons-material";

const AddQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [updatingQuestions, setUpdatingQuestions] = useState([]);
  const [message, setMessage] = useState({ message: null, error: null });

  const navigate = useNavigate();

  useEffect(() => {
    if (message.error == null)
      axios
        .get("/getQuestions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => {
          console.log(data);
          setQuestions(data?.data);
          setUpdatingQuestions(data?.data);
        })
        .catch((err) => {
          err = err.response.data;
          setMessage({ error: err?.error, message: null });
          if (err.error == "Not Authorized") {
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
  }, [message]);

  const handleChange = (e, index) => {
    {
      const newArray = updatingQuestions.map((item, i) => {
        if (index === i) {
          if (e.target.name == "question")
            return { ...item, [e.target.name]: e.target.value };
          else if (e.target.name == "gradeRequired") {
            if (item.grade.length == 0)
              return {
                ...item,
                [e.target.name]: e.target.checked,
                grade: e.target.checked ? Array(10).fill("") : [],
              };
            else {
              return {
                ...item,
                [e.target.name]: e.target.checked,
              };
            }
          }
        } else {
          return item;
        }
      });
      console.log(newArray);
      setUpdatingQuestions(newArray);
    }
  };

  const handleChangeUpdateGrade = (e, indexGrade, indexQuestion) => {
    const newArray = updatingQuestions.map((item, i) => {
      if (indexQuestion === i) {
        var grades = item.grade;
        grades[indexGrade] = e.target.value;
        return { ...item, grade: grades };
      } else {
        return item;
      }
    });

    setUpdatingQuestions(newArray);
  };

  const handleAddQuestion = () => {
    setUpdatingQuestions([
      { question: "Sample Question", grade: [], gradeRequired: false },
      ...updatingQuestions,
    ]);
  };

  const handleSubmit = (quest) => {
    const { question, gradeRequired, grade } = quest;

    axios
      .put(
        "/updateQuestions",
        {
          question,
          grade,
          gradeRequired,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((data) => {
        console.log(data);

        setMessage({ message: data?.data?.message, error: null });
      })
      .catch((err) => {
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

  const handleDelete = (id) => {
    axios
      .delete("/deleteQuestion?id=" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        console.log(data);

        setMessage({ message: data?.data?.message, error: null });
      })
      .catch((err) => {
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
      {
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
      }
      {
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
      }
      <Container>
        <Row>
          <Col>
            <h1 className="text-center mb-5" style={{ color: "white" }}>
              Add Questions
            </h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xs={3}>
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
              id="submit-Btn"
              className="mx-2"
              variant="contained"
              color="info"
              onClick={() => handleAddQuestion()}
              endIcon={<AddIcon />}
              size="medium"
            >
              {" "}
              Add More{" "}
            </Button>
            <Fab
              sx={{ ml: 1 }}
              variant="extended"
              onClick={() => {
                logout(navigate);
              }}
              endIcon={<LogoutIcon />}
            >
              Logout
              <LogoutIcon sx={{ ml: 1 }} />
            </Fab>
          </Col>
        </Row>

        {updatingQuestions && (
          <Accordion defaultActiveKey="0">
            {updatingQuestions?.map((question, index) => {
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{question.question}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xs={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Question"
                          className="mb-3"
                          style={{ color: "black" }}
                        >
                          <Form.Control
                            type="text"
                            id="input-field"
                            placeholder="Question"
                            name="question"
                            value={question.question}
                            onChange={(e) => handleChange(e, index)}
                            index={index}
                            style={{ color: "black" }}
                          />
                          {!question.question && (
                            <Form.Text className="text-danger">
                              Question can't be empty
                            </Form.Text>
                          )}
                        </FloatingLabel>
                      </Col>
                      <Col xs={6} className="align-content-center">
                        <Form.Check
                          type="checkbox"
                          name="gradeRequired"
                          checked={question.gradeRequired}
                          index={index}
                          label="Grade Required"
                          style={{ color: "black" }}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Col>
                    </Row>
                    {question?.gradeRequired && (
                      <Row>
                        {question?.grade?.map((grade, indexGrade) => {
                          return (
                            <Col xs={6}>
                              <FloatingLabel
                                controlId="floatingInput"
                                label={`Grade Answer ${indexGrade + 1}`}
                                className="mb-3"
                                style={{ color: "black" }}
                              >
                                <Form.Control
                                  type="text"
                                  id="input-field"
                                  placeholder="Grade Answer"
                                  name="grade"
                                  value={grade}
                                  onChange={(e) =>
                                    handleChangeUpdateGrade(
                                      e,
                                      indexGrade,
                                      index,
                                    )
                                  }
                                  index={indexGrade}
                                  style={{ color: "black" }}
                                />
                                {!grade && (
                                  <Form.Text className="text-danger">
                                    Grade Answer can't be empty
                                  </Form.Text>
                                )}
                              </FloatingLabel>
                            </Col>
                          );
                        })}
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <Button
                          id="submit-Btn"
                          className="mx-2"
                          variant="contained"
                          color="success"
                          onClick={() => handleSubmit(question)}
                          endIcon={<ArrowForward />}
                          size="medium"
                        >
                          {" "}
                          Submit{" "}
                        </Button>
                        <DeleteIcon
                          onClick={() => handleDelete(question._id)}
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </Container>
    </div>
  );
};

export default AddQuestions;
