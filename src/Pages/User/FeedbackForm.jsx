import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Button } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Feedbackform.css";
import { Fab } from '@mui/material';
import { logout } from '../../Comtrollers/logoutController';
import LogoutIcon from '@mui/icons-material/Logout';

const FeedbackForm = () => {
  const navigate = useNavigate()
  const [counselees, setCounselees] = useState([])
  const [counsellor, setCounsellor] = useState({})
  const [selectedCounselee, setSelectedcounselee] = useState({})
  const [formData, setFormData] = useState({
    "Academics": "",
    "Projects": "",
    "Sick Report": "",
    "OLQ": "",
    "Games": "",
    "Cultural": "",
    "Financial": "",
    "Personal": ""
  })
  var counselId = 12345;
  useEffect(() => {
    axios.get("/counselee/getCounselees?", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      console.log(data)
      setCounselees(data.data.data)
      setCounsellor(data.data.counsellor)
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
    console.log(formData)
  }

  return (

    <div class="container">
      <div class="row align-items-start">
        <div class="col-2 col-auto min-vh-100" id="sidebarfeedback-md">
          <div className='row mt-2 mb-3'>
            <div className='col-6'>
              <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
            </div><div className='col-6'>
              <Fab sx={{ ml: 1 }} variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                Logout
                <LogoutIcon sx={{ ml: 1 }} />
              </Fab>
            </div></div>
          <h2 style={{ marginBottom: "0" }}>
            <small class="text-muted">{counsellor?.name}</small>
          </h2>
          <p style={{ marginBottom: "0" }}>
            <small class="text-muted">Service ID :{counsellor?.service_id}</small>
          </p>
          <p >
            <small class="text-muted">Rank : {counsellor?.rank}</small>
          </p>
          <select class="form-select" aria-label="Select Counselee" onChange={(e) => { console.log(counselees[e.target.value]); setSelectedcounselee(counselees[e.target.value]) }}>
            <option selected disabled>Select Counselee</option>
            {
              counselees.map((elem, index) => {
                return (
                  <option value={index}>{elem.name} : {elem.service_id}</option>
                )
              })
            }
          </select>
        </div>
        <div class="col-md-9 offset-md-2 col-xs-12">
          <h1 className='mb-3 text-center'>Feedback Form</h1>
          <div className='row mb-3 p-3 position-sticky' id="sidebarfeedback-xs" style={{ backgroundColor: "#0d6efd40" }}>
              <div className='row mt-2 mb-2'>
                <div className='col-6'>
                  <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
                </div><div className='col-6'>
                  <Fab sx={{ ml: 1 }} variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                    Logout
                    <LogoutIcon sx={{ ml: 1 }} />
                  </Fab>
                </div></div>
            <div className='col-12'>
              <h2 style={{ marginBottom: "0" }}>
                <small class="text-muted">{counsellor?.name}</small>
              </h2>
              <p style={{ marginBottom: "0" }}>
                <small class="text-muted">Service ID :{counsellor?.service_id}</small>
              </p>
              <p >
                <small class="text-muted">Rank : {counsellor?.rank}</small>
              </p>
            </div>
            <div class="col-12">
              <select class="form-select" aria-label="Select Counselee" onChange={(e) => { console.log(counselees[e.target.value]); setSelectedcounselee(counselees[e.target.value]) }}>
                <option selected disabled>Select Counselee</option>
                {
                  counselees.map((elem, index) => {
                    return (
                      <option value={index}>{elem.name} : {elem.service_id}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
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
          <div class="input-group mb-2">
            <span class="input-group-text">Academics</span>
            <textarea class="form-control" name="Academics" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Projects</span>
            <textarea class="form-control" name="Projects" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Sick Report</span>
            <textarea class="form-control" name="Sick Report" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">OLQ</span>
            <textarea class="form-control" name="OLQ" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Games</span>
            <textarea class="form-control" name="Games" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Cultural</span>
            <textarea class="form-control" name="Cultural" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Financial</span>
            <textarea class="form-control" name="Financial" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div class="input-group">
            <span class="input-group-text">Personal</span>
            <textarea class="form-control" name="Personal" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd", color: "black" }}></textarea>
          </div>
          <div className='text-center mt-4 mb-4'>
            <Button onClick={() => navigate("/feedbackpageprint", { state: { ...selectedCounselee, ...formData } })}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm