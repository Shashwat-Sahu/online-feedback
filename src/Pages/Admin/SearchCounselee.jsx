import React, { useEffect, useState } from "react";
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
import CheckIcon from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DownloadIcon from "@mui/icons-material/Download";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { BlobProvider } from "@react-pdf/renderer";
import Pdf from "../User/Pdf";
import FeedbackSuggestions from "../User/FeedbackSugesstion.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  color: "black",
  boxShadow: 24,
  p: 4,
};
const heading = {
  color: "black",
};
const SearchCounselee = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState({ message: null, error: null });
  const [submitting, setSubmitting] = useState(false);
  const [service_id,setService_id] = useState('')
  const [filters,setFilters] = useState({course_name:['','','']})
  const [filtersApplied, setFiltersApplied] = useState(false)


  useEffect(()=>{
    if(service_id)
    {
      handleSubmit()
    }
  },[service_id])

  const handleFilter = (e,index)=>{
    
      let value = ''
      if(e.target.checked)
      {
        value = e.target.value
      }
      let course_name = filters.course_name
        course_name[index] = value
    setFilters({...filters,"course_name":course_name})
    let filterApplied = !course_name.every(item=>item=='')
    
    setFiltersApplied(filterApplied)
    
  }

  const handleSubmit=()=>{
    setSubmitting(true);
    axios
      .post("/getCounselee",{
        service_id: service_id,
        filters_applied:filtersApplied,
        course_name:filters.course_name
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },)
      .then((data) => {
        console.log(data)
        setSubmitting(false);
        setReports(data?.data?.data);
        setMessage({ message: data?.data?.message, error: null });
      })
      .catch((err) => {
        setSubmitting(false);
        err = err.response.data;
        setMessage({ error: err?.error, message: null });
        if (err.error == "Not Authorized") {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  }
  const handleChange = (e) => {
    setService_id(e.target.value)
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
        <Row style={{marginTop:"10px"}}>
          <Col xs={2}>
            <Button
              onClick={handleOpen}
              style={{ backgroundColor: "#0a58ca", color: "white" }}
              variant="contained"
              endIcon={<FilterAltIcon />}
            >
              Filter by Course
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography>Course Name</Typography>
                <FormGroup>
                  <FormControlLabel
                  n
                    label={
                      <Typography sx={{ fontColor: "black" }}>
                        28 CCCN(O)
                      </Typography>
                    }
                    control={<Checkbox name = "course_name" value = '28 CCCN(O)' checked={!!filters.course_name[0]} onChange={(e)=>handleFilter(e,0)}/>}
                  />
                  <FormControlLabel
                  name = "course_name"
                    label={
                      <Typography sx={{ fontColor: "black" }}>
                        29 CCCN(O)
                      </Typography>
                    }
                    control={<Checkbox name = "course_name" value = '29 CCCN(O)' checked={!!filters.course_name[1]} onChange={(e)=>handleFilter(e,1)}/>}
                  />
                  <FormControlLabel
                  name = "course_name"
                    label={
                      <Typography sx={{ fontColor: "black" }}>
                        30 CCCN(O)
                      </Typography>
                    }
                    control={<Checkbox name = "course_name" value = '30 CCCN(O)' checked={!!filters.course_name[2]} onChange={(e)=>handleFilter(e,2)}/>}
                  />
                </FormGroup>
                <Button 
              onClick={()=>{handleClose();handleSubmit()}}
              style={{ backgroundColor: "#0a58ca", color: "white" }}
              variant="contained"
              endIcon={<CheckIcon />}
            >
              Apply
            </Button>
              </Box>
            </Modal>
          </Col>
          <Col xs={10}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon />
              <TextField
                id="standard-basic"
                label="Search by Service ID"
                variant="standard"
                onChange={handleChange}
              />
            </Box>
          </Col>
        </Row>
        <Row>
          {submitting && (
            <div className=" mt-3 d-flex justify-content-center">
              <Spinner animation="border" variant="light" className="m-auto" />
            </div>
          )}
          {console.log(reports)}
          {reports.length > 0 && (
            <table class="table table-hover table-bordered mt-4 table-sm">
              <thead>
                <tr>
                  <th scope="col">Service ID</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Download Sessions Reports</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => {
                  return (
                    <tr>
                      <td>{report.counselee_details?.service_id}</td>
                      <td>{report.course_name}</td>
                      <td>
                        {console.log(report)}
                        Download Report{" "}
                        <BlobProvider
                                      document={
                                        <Pdf
                                          data={{
                                            rank: report.counselee_details?.rank,
                                            service_id:
                                            report.counselee_details?.service_id,
                                            counselling_session: report.report?.counselling_session,
                                            counselling_session_timestamp: report.report?.counselling_session_timestamp,
                                            name: report.counselee_details?.name,
                                            counsellor:report.counsellor_details,
                                            ...FeedbackSuggestions.filter(
                                              (item) =>
                                                item.score[0] <=
                                              report.counselee_details?.kpi &&
                                                item.score[1] >=
                                                report.counselee_details?.kpi
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SearchCounselee;
