import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Button } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Feedbackform.css";
import { Alert, Fab, Snackbar } from '@mui/material';
import { logout } from '../../Controllers/logoutController';
import LogoutIcon from '@mui/icons-material/Logout';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const FeedbackFormCi = () => {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [hof, setHof] = useState({})
  const [prevReport, setPrevReport] = useState([])
  const [message, setMessage] = useState({ message: null, error: null })
  const [selectedReport, setSelectedReport] = useState({})
  const [HofName,setHofName] = useState("")
  const [allCI,setAllCI] = useState([])
  const [formData, setFormData] = useState({
    "Academics": "",
    "Projects": "",
    "Sick Report": "",
    "OLQ": "",
    "Games": "",
    "Cultural": "",
    "Financial": "",
    "Personal": "",
    "HOF's comments":"",
    "DS's comments": "",
    "CI's comments":"",
  })
  var counselId = 12345;
  useEffect(() => {
    axios.get("/ci/getReports?", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      setHof(data.data.ci)
      setReports(data.data.reports)

    }).catch(err => {
      err = err.response.data
      // setMessage({ error: err?.error, message: null })
      if (err.error == "Not Authorized") {
        localStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    })



  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const SubmitReport = () => {
    if (!selectedReport?.service_id)
      return setMessage({ ...message, error: "Service ID is empty" })
    if (!hof?.service_id) {
      setMessage({ ...message, error: "Counsellor Service ID is empty" })
      return setTimeout(() => {
        return window.location.href = "/"
      }, 2000);
    }
    axios.put("/ci/updateReport", {
      report_id:selectedReport._id,
      ci_comments:formData["CI's comments"],
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      setMessage({ message: data?.data?.message, error: null });
      const report = data.data.report;
      formData.Academics = report.academics;
      formData.Cultural = report.cultural;
      formData['DS\'s comments'] = report.ds_comments;
      formData.Financial = report.financial;
      formData.Games = report.games;
      formData['HOF\'s comments'] = report.hof_comments;
      formData['CI\'s comments'] = report.ci_comments;
      formData.OLQ = report.olq;
      formData.Personal = report.personal;
      formData.Projects = report.projects;
      formData['Sick Report'] = report.sick_report;
      setTimeout(()=>{
        navigate("/feedbackpageprint",{
          state:{
            "Academics": report?.academics,
            "Projects": report?.projects,
            "Sick Report": report?.sick_report,
            "OLQ": report?.olq,
            "Games": report?.games,
            "Cultural": report?.cultural,
            "Financial": report?.financial,
            "Personal": report?.personal,
            "HOF's comments": report?.hof_comments,
            "CI's comments": report?.ci_comments,
            "DS's comments": report?.ds_comments,
          }
        })
      },2000)
    }).catch(err => {
      err = err.response.data
      setMessage({ error: err?.error, message: null })
      if (err.error == "Not Authorized") {
        localStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }

    })
  }
  const ExportCSV = (reportData,date) => {

    var fileName = `${selectedReport.service_id}_${date?.toLocaleString()}`;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet([reportData]);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataFile = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataFile, fileName + fileExtension);

  }
  const GetPrevReport = () => {
    if (!selectedReport?.service_id)
      return setMessage({ ...message, error: "Service ID is empty" })
    if (!hof?.service_id) {
      setMessage({ ...message, error: "Counsellor Service ID is empty" })
      return setTimeout(() => {
        return window.location.href = "/"
      }, 2000);
    }

    axios.get(`/ci/getfeedback?service_id=${selectedReport?.service_id}&ci_service_id=${hof?.service_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      console.log(data)
      setPrevReport(data?.data)
    })
  }

  const Reset = () => {
    setSelectedReport({})
    setFormData({
      "Academics": "",
      "Projects": "",
      "Sick Report": "",
      "OLQ": "",
      "Games": "",
      "Cultural": "",
      "Financial": "",
      "Personal": "",
      "report_hof": "",
      "DS's comments": "",
      
    "HOF's comments":"",
    "CI's comments":""
    })
    setPrevReport([])
    setHofName("")
  }
  const getHofName=(report)=>{
    axios.get(`/ci/getHofName?report_hof=${report?.report_hof}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data=>{
      setHofName(data?.data?.name)
    })
  }
  return (

    <div class="container-fluid">
      {<Snackbar open={message?.error} autoHideDuration={6000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="error">
          <p className="error">{message.error}</p>
        </Alert>

      </Snackbar>}
      {<Snackbar open={message?.message} autoHideDuration={6000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="success">
          <p className="success">{message.message}</p>
        </Alert>

      </Snackbar>}
      <div class="row align-items-start">
        <div class="col-2 col-auto min-vh-100" id="sidebarfeedback-md">
          <div className='row mt-2 mb-3'>
            <div className='col-3'>
              <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
            </div></div>
          <h2 style={{ marginBottom: "0" }}>
            <small class="text-muted">{hof?.name}</small>
          </h2>
          <p style={{ marginBottom: "0" }}>
            <small class="text-muted">Service ID :{hof?.service_id}</small>
          </p>
          <select class="form-select" aria-label="Select Counselee" value={reports ? reports.indexOf(selectedReport) : -1} onChange={(e) => { getHofName(reports[e.target.value]);;setPrevReport([]); setSelectedReport(reports[e.target.value]);  setFormData({...formData,"CI's comments":reports[e.target.value].ci_comments}) }}>
            <option selected disabled value={-1}>Select Counselee</option>
            {
              reports.map((elem, index) => {
                return (
                  <option value={index}>{elem.service_id} : {new Date(elem.created_at).toLocaleString()}</option>
                )
              })
            }
          </select>
        </div>
        <div class="col-md-10 offset-md-2 col-xs-12">
          <h1 className='mb-3 text-center'>Feedback Form</h1>
          <div className='row mb-3 p-3 position-sticky' id="sidebarfeedback-xs" style={{ backgroundColor: "#0d6efd40" }}>
            <div className='row mt-2 mb-2'>
              <div className='col-3'>
                <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
              </div><div className='col-9 text-end'>
                <Fab sx={{ ml: 1 }} variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                  Logout
                  <LogoutIcon sx={{ ml: 1 }} />
                </Fab>
              </div></div>
            <div className='col-12'>
              <h2 style={{ marginBottom: "0" }}>
                <small class="text-muted">{hof?.name}</small>
              </h2>
              <p style={{ marginBottom: "0" }}>
                <small class="text-muted">Service ID :{hof?.service_id}</small>
              </p>
            </div>
            <div class="col-12">
              <select class="form-select" aria-label="Select Counselee" onChange={(e) => { getHofName(reports[e.target.value]); setSelectedReport(reports[e.target.value]); setFormData({...formData,"CI's comments":reports[e.target.value].ci_comments}) }}>
                <option selected disabled>Select Counselee</option>
                {
                  reports.map((elem, index) => {
                    return (
                      <option value={index}>{elem.service_id} : {new Date(elem.created_at).toLocaleString()}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div class="row">
            <div className='col-6'>
          <table class="table table-bordered" style={{ width: "auto" }}>
            <tbody>

              <tr>
                <th scope="row">Service ID</th>
                <td>{selectedReport?.service_id}</td>
              </tr>
              <tr>
                <th scope="row">HOF Name</th>
                <td>{HofName}</td>
              </tr>

            </tbody>
          </table>
          </div>
            <div className='col-6'>
          <div className='text-end d-none d-md-block'>
              <Fab sx={{ ml: 1 }} variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                Logout
                <LogoutIcon sx={{ ml: 1 }} />
              </Fab>
            </div>
          </div>
            </div>
          <div class="mb-2">
            Academics
            : {selectedReport["academics"]} 
          </div>
          <div class="mb-2">
            Projects
            : {selectedReport["projects"]}  
          </div>
          <div class="mb-2">
            Sick Report
            : {selectedReport["sick_report"]}  
          </div>
          <div class="mb-2">
            OLQ
            : {selectedReport["olq"]}  
          </div>
          <div class="mb-2">
            Games
            : {selectedReport["games"]} 
          </div>
          <div class="mb-2">
            Cultural
            : {selectedReport["cultural"]}  
          </div>
          <div class="mb-2">
            Financial
            : {selectedReport["financial"]}  
          </div>
          <div class="mb-2">
            Personal
            : {selectedReport["personal"]} 
          </div>
          <div class="mb-2">
            DS's comments
            : {selectedReport["ds_comments"]} 
          </div>
          <div class="mb-2">
            HOF's comments
            : {selectedReport["hof_comments"]} 
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">CI's comments</span>
            <textarea class="form-control" disabled={selectedReport["ci_comments"]?.length>0} value={formData["CI's comments"]} name="CI's comments" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          
          {/*
          <div class="input-group mb-2">
            <span class="input-group-text">CI's comments</span>
            <textarea class="form-control" value={formData["CI's comments"]} name="CI's comments" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div> */}

          <div className='text-center mt-4 mb-4'>
            <Fab sx={{ mr: 1, mb: 1 }} variant="extended" onClick={Reset} endIcon={<RestartAltIcon />} color="error">
              Reset
              <RestartAltIcon sx={{ ml: 1 }} />
            </Fab>
            <Fab sx={{ mr: 1, mb: 1 }} variant="extended" onClick={GetPrevReport} endIcon={<LogoutIcon />} color="primary">
              Last Feedback reports
              <LogoutIcon sx={{ ml: 1 }} />
            </Fab>
            <Fab sx={{ mb: 1 }} variant="extended" onClick={SubmitReport} color="success" >

              Generate Report
              <KeyboardArrowRightIcon sx={{ ml: 1 }} />
            </Fab>
          </div>

          <div className='table-responsive'>
            {prevReport?.length > 0 && <table class="table table-hover table-bordered mt-4 table-sm">
              <thead>
                <tr>
                  <th scope="col">Report Date</th>
                  <th scope="col">Academics</th>
                  <th scope="col">Projects</th>
                  <th scope="col">Sick Report</th>
                  <th scope="col">OLQ</th>
                  <th scope="col">Games</th>
                  <th scope="col">Cultural</th>
                  <th scope="col">Financial</th>
                  <th scope="col">Personal</th>
                  <th scope="col">HOF's comments</th>
                  <th scope="col">CI's comments</th>
                  <th scope="col">DS's comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prevReport?.map(report => {
                  return (
                    <tr>
                      <td>{new Date(report?.created_at).toLocaleString()}</td>
                      <td>{report?.academics}</td>
                      <td>{report?.projects}</td>
                      <td>{report?.sick_report}</td>
                      <td>{report?.olq}</td>
                      <td>{report?.games}</td>
                      <td>{report?.cultural}</td>
                      <td>{report?.financial}</td>
                      <td>{report?.personal}</td>
                      <td>{report?.hof_comments}</td>
                      <td>{report?.ci_comments}</td>
                      <td>{report?.ds_comments}</td>
                      <td>
                        <DownloadIcon onClick={() =>{ navigate("/feedbackpageprint",{
                          state:{
                            "Academics": report?.academics,
                            "Projects": report?.projects,
                            "Sick Report": report?.sick_report,
                            "OLQ": report?.olq,
                            "Games": report?.games,
                            "Cultural": report?.cultural,
                            "Financial": report?.financial,
                            "Personal": report?.personal,
                            "HOF's comments": report?.hof_comments,
                            "CI's comments": report?.ci_comments,
                            "DS's comments": report?.ds_comments,
                          }
                        }) }}/>
                      </td>
                    </tr>
                  )
                })}


              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackFormCi