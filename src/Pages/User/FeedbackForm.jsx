import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Feedbackform.css";
import { Alert, Fab, Snackbar } from "@mui/material";
import { logout } from "../../Controllers/logoutController";
import LogoutIcon from "@mui/icons-material/Logout";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FeedbackSuggestions from "./FeedbackSugesstion.json";
import Pdf from "./Pdf";
import { BlobProvider } from "@react-pdf/renderer";

const FeedbackForm = React.memo(() => {
  const navigate = useNavigate();
  const [counselees, setCounselees] = useState([]);
  const [counsellor, setCounsellor] = useState({});
  const prevReport = useRef([]);
  const [prevReportsState, setPrevReport] = useState([]);
  const [message, setMessage] = useState({ message: null, error: null });
  const [selectedCounselee, setSelectedcounselee] = useState({});
  const [totalSession, setTotalSession] = useState(0);
  const [activeSession, setActiveSession] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    service_id: "00000",
    counsellor_service_id: "00000",
    counselling_session: [],
  });

  const [clausesEnabled, setClausesEnabled] = useState(Array(3).fill(false));

  useEffect(() => {
    axios
      .get("/counselee/getCounselees?", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setCounselees(data.data.data);
        setCounsellor(data.data.counsellor);
      })
      .catch((err) => {
        err = err.response.data;
        // setMessage({ error: err?.error, message: null })
        if (err.error == "Not Authorized") {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });

    axios
      .get("/user/getQuestions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setQuestions(data?.data);
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
  }, []);

  useEffect(() => {
    GetPrevReport();
    setFormData({ ...formData, service_id: selectedCounselee.service_id });
  }, [selectedCounselee]);

  const handleChangeOther = (e, questionIndex) => {
    formData.counselling_session[activeSession][questionIndex].question =
      e.target.value;
    setFormData({
      ...formData,
      counselling_session: formData.counselling_session,
    });
  };

  const handleChange = (e, questionIndex, type) => {
    if (formData.counselling_session[activeSession].length <= questionIndex)
      formData.counselling_session[activeSession].push({
        question: "",
        other: false,
        answer: "",
      });
    if (type == "question" && e.target.value == "Other") {
      formData.counselling_session[activeSession][questionIndex].other = true;
      formData.counselling_session[activeSession][questionIndex].question = "";
      formData.counselling_session[activeSession][questionIndex].answer = "";
    } else if (
      type == "question" &&
      formData.counselling_session[activeSession][questionIndex].other == true
    ) {
      formData.counselling_session[activeSession][questionIndex].other = false;
      formData.counselling_session[activeSession][questionIndex].question =
        e.target.value;
    } else if (type == "grade") {
      formData.counselling_session[activeSession][questionIndex]["answer"] =
        e.target.value + " ";
      formData.counselling_session[activeSession][questionIndex].grade =
        e.target.value;
      formData.counselling_session[activeSession][
        questionIndex
      ].gradeRequired = true;
    } else {
      formData.counselling_session[activeSession][questionIndex][type] =
        e.target.value;
    }

    setFormData({
      ...formData,
      counselling_session: formData.counselling_session,
    });
  };

  const SubmitReport = () => {
    if (!selectedCounselee?.service_id)
      return setMessage({ ...message, error: "Service ID is empty" });
    if (!counsellor?.service_id) {
      setMessage({ ...message, error: "Counsellor Service ID is empty" });
      return setTimeout(() => {
        return (window.location.href = "/");
      }, 2000);
    }
    const totalSession = formData.counselling_session?.length;
    const addedSession = prevReport.current.counselling_session?.length;

    const counselling_session_timestamp = [
      ...formData.counselling_session_timestamp,
      ...Array(totalSession - addedSession).fill(new Date()),
    ];

    axios
      .post(
        "/user/feedbackreport",
        {
          ...formData,
          service_id: selectedCounselee.service_id,
          counsellor_service_id: counsellor.service_id,
          counselling_session_timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        setMessage({ message: data?.data?.message, error: null });
        prevReport.current = { ...data?.data?.data };
        setPrevReport({...data?.data?.data })
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
  const ExportCSV = (reportData) => {
    var date = new Date();
    var fileName = `${selectedCounselee.service_id}_${
      selectedCounselee.name
    }_${date?.toLocaleString()}`;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const data = reportData.QnA.map((question, index) => {
      if (index == 0)
        return {
          "session no": reportData.session,
          "Created At": reportData.createdAt,
          Questions: question?.question,
          Answers: question?.answer,
        };
      else return { Questions: question?.question, Answers: question?.answer };
    });
    const merge = [
      { s: { r: 1, c: 0 }, e: { r: reportData.QnA.length, c: 0 } },
      { s: { r: 1, c: 1 }, e: { r: reportData.QnA.length, c: 1 } },
    ];
    const ws = XLSX.utils.json_to_sheet(data, {
      header: ["session no", "Created At", "Questions", "Answers"],
    });
    ws["!merges"] = merge;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataFile = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataFile, fileName + fileExtension);
  };

  const GetPrevReport = () => {
    if (!selectedCounselee?.service_id)
      return setMessage({ ...message, error: "Service ID is empty" });
    if (!counsellor?.service_id) {
      setMessage({ ...message, error: "Counsellor Service ID is empty" });
      return setTimeout(() => {
        return (window.location.href = "/");
      }, 2000);
    }

    axios
      .get(
        `/user/getfeedback?service_id=${selectedCounselee?.service_id}&counsellor_service_id=${counsellor?.service_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        if (data?.data) {
          const val = JSON.parse(JSON.stringify(data?.data));
          setFormData(val);
          setTotalSession(data?.data?.counselling_session?.length);
          setActiveSession(data?.data?.counselling_session?.length - 1);
        } else {
          setFormData({
            counselling_session: [],
            counselling_session_timestamp: [],
          });
          setTotalSession(0);
          setActiveSession(-1);
        }
        prevReport.current = data?.data
          ? JSON.parse(JSON.stringify(data?.data))
          : {
              service_id: selectedCounselee?.service_id,
              counselling_session: [],
              counselling_session_timestamp: [],
            };
        setPrevReport(JSON.parse(JSON.stringify(prevReport.current)));
        if (data?.data?.counselling_session)
          setTotalSession(data?.data?.counselling_session?.length);
      });
  };

  const Reset = () => {
    setSelectedcounselee({});
    setFormData({
      Academics: "",
      Projects: "",
      "Sick Report": "",
      OLQ: "",
      Games: "",
      Cultural: "",
      Financial: "",
      Personal: "",
      report_hof: "",
      "DS's comments": "",
    });

    prevReport.current = [];
  };

  return (
    <div class="container-fluid">
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
      <div class="row align-items-start">
        <div class="col-2 col-auto min-vh-100" id="sidebarfeedback-md">
          <div className="row mt-2 mb-3">
            <div className="col-3">
              <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
            </div>
          </div>
          <h2 style={{ marginBottom: "0" }}>
            <small class="text-muted">{counsellor?.name}</small>
          </h2>
          <p style={{ marginBottom: "0" }}>
            <small class="text-muted">
              Service ID :{counsellor?.service_id}
            </small>
          </p>
          <p>
            <small class="text-muted">Rank : {counsellor?.rank}</small>
          </p>
          <select
            class="form-select"
            aria-label="Select Counselee"
            value={counselees ? counselees.indexOf(selectedCounselee) : -1}
            onChange={(e) => {
              prevReport.current = [];
              setSelectedcounselee(counselees[e.target.value]);
            }}
          >
            <option selected disabled value={-1}>
              Select Counselee
            </option>
            {counselees.map((elem, index) => {
              return (
                <option value={index}>
                  {elem.name} : {elem.service_id}
                </option>
              );
            })}
          </select>
          {selectedCounselee?.kpi && (
            <div className="kpi-marks-container">
              <h4 className="kpi-heading">Academic Marks</h4>
              <div className="kpi-marks-value">{selectedCounselee?.kpi}</div>
            </div>
          )}
        </div>
        <div class="col-md-10 offset-md-2 col-xs-12 feedbackFormContainer">
          <h1 className="mb-3 text-center">Feedback Form</h1>
          <div
            className="row mb-3 p-3 position-sticky"
            id="sidebarfeedback-xs"
            style={{ backgroundColor: "#0d6efd40" }}
          >
            <div className="row mt-2 mb-2">
              <div className="col-3">
                <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
              </div>
              <div className="col-9 text-end">
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
              </div>
            </div>
            <div className="col-12">
              <h2 style={{ marginBottom: "0" }}>
                <small class="text-muted">{counsellor?.name}</small>
              </h2>
              <p style={{ marginBottom: "0" }}>
                <small class="text-muted">
                  Service ID :{counsellor?.service_id}
                </small>
              </p>
              <p>
                <small class="text-muted">Rank : {counsellor?.rank}</small>
              </p>
            </div>
            <div class="col-12">
              <select
                class="form-select"
                aria-label="Select Counselee"
                onChange={(e) => {
                  setSelectedcounselee(counselees[e.target.value]);
                }}
              >
                <option selected disabled>
                  Select Counselee
                </option>
                {counselees.map((elem, index) => {
                  return (
                    <option value={index}>
                      {elem.name} : {elem.service_id}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="row">
            <div className="col-6">
              <table class="table table-bordered" style={{ width: "auto" }}>
                <tbody>
                  <tr>
                    <th scope="row">Counselee Name</th>
                    <td>{selectedCounselee?.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Service ID</th>
                    <td>{selectedCounselee?.service_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-6">
              <div className="text-end d-none d-md-block">
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
              </div>
            </div>
          </div>
          {selectedCounselee?.service_id && (
            <>
              <div class="row">
                {selectedCounselee?.kpi && (
                  <div className="kpi-marks-container">
                    <div className="kpi-remark">
                      {/* Feedback:{" "} */}
                      <b>
                        {FeedbackSuggestions.filter(
                          (item) =>
                            item.score[0] <= selectedCounselee?.kpi &&
                            item.score[1] >= selectedCounselee?.kpi
                        ).map((item) => {
                          return (
                            <>
                              <h6 className="kpi-heading">
                                Feedback: {item.feedback}
                              </h6>
                              <h6 className="kpi-heading">
                                Suggestions: {item.suggestion}
                              </h6>
                            </>
                          );
                        })}
                      </b>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h3>Counselling sessions</h3>
                <div className="counselling-container">
                  {totalSession >= 0 &&
                    prevReport.current?.counselling_session?.length <
                      totalSession && (
                      <Fab
                        sx={{ mr: 1, mb: 1 }}
                        variant="extended"
                        color="secondary"
                        onClick={() => {
                          setActiveSession(
                            activeSession - 1 >= 0 ? activeSession - 1 : 0
                          );

                          setTotalSession(totalSession - 1);
                          formData.counselling_session.pop();

                          setFormData(formData);
                        }}
                      >
                        -
                      </Fab>
                    )}
                  {[...Array(totalSession)].map((val, ind) => {
                    return (
                      <Fab
                        sx={{ mr: 1, mb: 1 }}
                        variant="extended"
                        color={activeSession == ind ? "primary" : "information"}
                        onClick={() => {
                          setActiveSession(ind);
                        }}
                      >
                        {ind + 1}
                      </Fab>
                    );
                  })}
                  <Fab
                    sx={{ mr: 1, mb: 1 }}
                    variant="extended"
                    color="secondary"
                    onClick={() => {
                      if (totalSession == 0) {
                        setActiveSession(0);
                      } else setActiveSession(totalSession);
                      setTotalSession(totalSession + 1);
                      formData.counselling_session.push([
                        {
                          question: "",
                          other: false,
                          answer: "",
                        },
                      ]);
                      setFormData(formData);
                    }}
                  >
                    +
                  </Fab>
                </div>
              </div>
              {formData?.counselling_session[activeSession]?.map(
                (quesAns, i) => {
                  return (
                    <>
                      <Row>
                        <Col md={8}>
                          <div class="input-group mb-2">
                            <select
                              class="form-select"
                              aria-label="Select Question"
                              name="qna"
                              disabled={
                                prevReport.current?.counselling_session
                                  ?.length >= activeSession &&
                                prevReport.current?.counselling_session[
                                  activeSession
                                ]
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                handleChange(e, i, "question");
                              }}
                              value={
                                quesAns?.other ? "Other" : quesAns?.question
                              }
                            >
                              <option selected disabled value="">
                                Select Question
                              </option>
                              {questions?.map((elem, index) => {
                                return (
                                  <option value={elem.question}>
                                    {elem.question}
                                  </option>
                                );
                              })}
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div class="input-group mb-2">
                            {questions?.find(
                              (elem) => elem.question == quesAns.question
                            )?.gradeRequired && (
                              <select
                                class="form-select"
                                aria-label="Select Grade"
                                name="grade"
                                disabled={
                                  prevReport.current?.counselling_session
                                    ?.length >= activeSession &&
                                  prevReport.current?.counselling_session[
                                    activeSession
                                  ]
                                    ? true
                                    : false
                                }
                                value={quesAns?.grade}
                                onChange={(e) => {
                                  handleChange(e, i, "grade");
                                }}
                              >
                                <option selected value="">
                                  Select Grade
                                </option>
                                {questions
                                  ?.find(
                                    (elem) => elem.question == quesAns.question
                                  )
                                  ?.grade.map((elem, ind) => {
                                    return (
                                      <option value={elem}>{ind + 1}</option>
                                    );
                                  })}
                              </select>
                            )}
                          </div>
                        </Col>
                      </Row>

                      {quesAns?.other && (
                        <div class="input-group mb-2">
                          <span class="input-group-text">Question</span>
                          <textarea
                            class="form-control"
                            name="question"
                            value={quesAns?.question}
                            disabled={
                              prevReport.current?.counselling_session?.length >=
                                activeSession &&
                              prevReport.current?.counselling_session[
                                activeSession
                              ]
                                ? true
                                : false
                            }
                            aria-label="With textarea"
                            onChange={(e) => {
                              handleChangeOther(e, i);
                            }}
                            style={{ borderColor: "#adb5bd", color: "black" }}
                          ></textarea>
                        </div>
                      )}
                      {activeSession >= 0 && (
                        <div class="input-group mb-2">
                          <span class="input-group-text">Answer</span>
                          <textarea
                            class="form-control"
                            name="Academics"
                            value={quesAns?.answer}
                            disabled={
                              prevReport.current?.counselling_session?.length >=
                                activeSession &&
                              prevReport.current?.counselling_session[
                                activeSession
                              ]
                                ? true
                                : false
                            }
                            aria-label="With textarea"
                            onChange={(e) => {
                              handleChange(e, i, "answer");
                            }}
                            style={{ borderColor: "#adb5bd", color: "black" }}
                          ></textarea>
                        </div>
                      )}
                    </>
                  );
                }
              )}

              {activeSession >= 0 &&
                !(
                  prevReport.current?.counselling_session?.length >=
                    activeSession &&
                  prevReport.current?.counselling_session[activeSession]
                ) && (
                  <>
                    <Fab
                      sx={{ mr: 1, mb: 1 }}
                      variant="extended"
                      color="secondary"
                      onClick={() => {
                        var counsellingsession = formData.counselling_session;
                        counsellingsession[activeSession] = [
                          ...counsellingsession[activeSession],
                          {
                            question: "",
                            other: false,
                            answer: "",
                          },
                        ];
                        setFormData((prevData) => {
                          return {
                            ...prevData,
                            counselling_session: counsellingsession,
                          };
                        });
                      }}
                    >
                      Add Questions +
                    </Fab>
                    <Fab
                      sx={{ mr: 1, mb: 1 }}
                      variant="extended"
                      color="secondary"
                      onClick={() => {
                        var counsellingsession = formData.counselling_session;
                        counsellingsession[activeSession].pop();
                        if (counsellingsession[activeSession].length == 0) {
                          counsellingsession.pop();
                          setActiveSession(
                            activeSession - 1 >= 0 ? activeSession - 1 : 0
                          );

                          setTotalSession(totalSession - 1);
                        }
                        setFormData((prevData) => {
                          return {
                            ...prevData,
                            counselling_session: counsellingsession,
                          };
                        });
                      }}
                    >
                      Delete Question
                    </Fab>
                  </>
                )}

              {prevReport.current?.counselling_session?.length <=
                activeSession && (
                <FormGroup>
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        value={clausesEnabled[0]}
                        onChange={(e) => {
                          let clauses = [...clausesEnabled];
                          clauses[0] = e.target.checked;
                          setClausesEnabled(clauses);
                        }}
                      />
                    }
                    label="The counselee has been made aware of the drug policy"
                  />
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        value={clausesEnabled[1]}
                        onChange={(e) => {
                          let clauses = [...clausesEnabled];
                          clauses[1] = e.target.checked;
                          setClausesEnabled(clauses);
                        }}
                      />
                    }
                    label="The counselee has been made aware of the IT policies"
                  />
                  <FormControlLabel
                    required
                    control={
                      <Checkbox
                        value={clausesEnabled[2]}
                        onChange={(e) => {
                          let clauses = [...clausesEnabled];
                          clauses[2] = e.target.checked;
                          setClausesEnabled(clauses);
                        }}
                      />
                    }
                    label="The counselee has been made aware regarding discipline and conduct"
                  />
                </FormGroup>
              )}
              <div className="text-center mt-4 mb-4">
                <Fab
                  sx={{ mr: 1, mb: 1 }}
                  variant="extended"
                  onClick={Reset}
                  endIcon={<RestartAltIcon />}
                  color="error"
                >
                  Reset
                  <RestartAltIcon sx={{ ml: 1 }} />
                </Fab>
                <Fab
                  sx={{ mr: 1, mb: 1 }}
                  variant="extended"
                  onClick={GetPrevReport}
                  endIcon={<LogoutIcon />}
                  color="primary"
                >
                  Last Feedback reports
                  <LogoutIcon sx={{ ml: 1 }} />
                </Fab>
                <BlobProvider
                  document={
                    <Pdf
                      data={{
                        ...JSON.parse(JSON.stringify(prevReportsState)),
                        name: selectedCounselee.name,
                        counsellor,
                        ...FeedbackSuggestions.filter(
                          (item) =>
                            item.score[0] <= selectedCounselee?.kpi &&
                            item.score[1] >= selectedCounselee?.kpi
                        ).map((item) => item)[0],
                      }}
                    />
                  }
                >
                  {({ blob, url, loading, error }) => (
                    <Fab
                      sx={{ mr: 1, mb: 1 }}
                      variant="extended"
                      disabled={loading || error}
                      onClick={() => {
                        if (blob) {
                          // Create a URL for the blob and open it in a new tab
                          const blobUrl = URL.createObjectURL(blob);
                          const newWindow = window.open(blobUrl, "_blank");

                          if (newWindow) {
                            newWindow.focus(); // Focus the new tab/window
                          } else {
                            console.error("Failed to open new window");
                          }

                          // Optional: revoke the object URL after opening
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                        } else if (loading) {
                          console.log("Loading document...");
                        } else if (error) {
                          console.error("Error generating document:", error);
                        }
                      }}
                      endIcon={<LogoutIcon />}
                      color="primary"
                    >
                      PDF Report Generate
                      <LogoutIcon sx={{ ml: 1 }} />
                    </Fab>
                  )}
                </BlobProvider>
                <Fab
                  sx={{ mb: 1 }}
                  variant="extended"
                  onClick={SubmitReport}
                  color="success"
                  disabled={
                    prevReport.current?.counselling_session?.length <=
                      activeSession &&
                    clausesEnabled.every((item) => item == true)
                      ? false
                      : true
                  }
                >
                  Submit Report
                  <KeyboardArrowRightIcon sx={{ ml: 1 }} />
                </Fab>
                {clausesEnabled.every((item) => item == true)}
              </div>
              <h2>Previous sessions</h2>
              <div className="table-responsive">
                {prevReport.current?.counselling_session?.length > 0 && (
                  <table class="table table-hover table-bordered mt-4 table-sm">
                    <thead>
                      <tr>
                        <th scope="col">Session No.</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Questions</th>
                        <th scope="col">Answer</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prevReportsState?.counselling_session?.map(
                        (session, i) =>
                          session.map((question, index) => {
                            return (
                              <tr>
                                {index == 0 && (
                                  <td rowSpan={session?.length}>{i + 1}</td>
                                )}

                                {index == 0 && (
                                  <td rowSpan={session?.length}>
                                    {new Date(
                                      prevReportsState?.counselling_session_timestamp[
                                        i
                                      ]
                                    ).toLocaleDateString("en-IN")}
                                  </td>
                                )}
                                {/* <td>{new Date(report?.created_at).toLocaleString()}</td> */}
                                <td>{question?.question}</td>
                                <td>{question?.answer}</td>
                                {index == 0 && (
                                  <td rowSpan={session?.length}>
                                    <BlobProvider
                                      document={
                                        <Pdf
                                        session_index={i+1}
                                          data={{
                                            
                                            service_id:
                                              selectedCounselee?.service_id,
                                            counselling_session: [JSON.parse(JSON.stringify(session))],
                                            counselling_session_timestamp: [
                                              prevReportsState
                                                ?.counselling_session_timestamp[
                                                i
                                              ],
                                            ],
                                            name: selectedCounselee.name,
                                            counsellor,
                                            ...FeedbackSuggestions.filter(
                                              (item) =>
                                                item.score[0] <=
                                                  selectedCounselee?.kpi &&
                                                item.score[1] >=
                                                  selectedCounselee?.kpi
                                            ).map((item) => item)[0],
                                          }}
                                        />
                                      }
                                    >
                                      {({ blob, url, loading, error }) => (
                                        <DownloadIcon
                                          onClick={() => {
                                            if (blob) {
                                              // Create a URL for the blob and open it in a new tab
                                              const blobUrl =
                                                URL.createObjectURL(blob);
                                              const newWindow = window.open(
                                                blobUrl,
                                                "_blank"
                                              );

                                              if (newWindow) {
                                                newWindow.focus(); // Focus the new tab/window
                                              } else {
                                                console.error(
                                                  "Failed to open new window"
                                                );
                                              }

                                              // Optional: revoke the object URL after opening
                                              setTimeout(
                                                () =>
                                                  URL.revokeObjectURL(blobUrl),
                                                1000
                                              );
                                            } else if (loading) {
                                              console.log(
                                                "Loading document..."
                                              );
                                            } else if (error) {
                                              console.error(
                                                "Error generating document:",
                                                error
                                              );
                                            }
                                          }}
                                        />
                                      )}
                                    </BlobProvider>
                                  </td>
                                )}
                              </tr>
                            );
                          })
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default FeedbackForm;
