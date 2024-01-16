import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Button } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const navigate = useNavigate()
  const [counselees, setCounselees] = useState([])
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
    axios.get("/counselee/getCounselees?service_id=" + (counselId)).then(data => {
      console.log(data)
      setCounselees(data.data)
    }).catch(err => {
      err = err.response.data
    })
  }, [])

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    console.log(formData)
  }

  return (

    <div class="container" style={{ marginLeft: "0" }}>
      <div class="row align-items-start">
        <div class="col col-auto min-vh-100" style={{ backgroundColor: "#0d6efd40" }}>
          <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
          <h2 style={{ marginBottom: "0" }}>
            <small class="text-muted">Samiksha Sahu</small>
          </h2>
          <p style={{ marginBottom: "0" }}>
            <small class="text-muted">Service ID:13342</small>
          </p>
          <p >
            <small class="text-muted">Rank:Flying Officer</small>
          </p>
          <select class="form-select" aria-label="Select Counselee" onChange={(e) => { console.log(counselees[e.target.value]);setSelectedcounselee(counselees[e.target.value]) }}>
            <option selected disabled>Select Counselee</option>
            {
              counselees.map((elem,index) => {
                return (
                  <option value={index}>{elem.name} : {elem.service_id}</option>
                )
              })
            }
          </select>
        </div>
        <div class="col">
          <h1 className='mb-3 text-center'>Feedback Form</h1>
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
            <textarea class="form-control" name="Academics" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Projects</span>
            <textarea class="form-control" name="Projects" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Sick Report</span>
            <textarea class="form-control" name="Sick Report" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">OLQ</span>
            <textarea class="form-control" name="OLQ" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Games</span>
            <textarea class="form-control" name="Games" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Cultural</span>
            <textarea class="form-control" name="Cultural" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group mb-2">
            <span class="input-group-text">Financial</span>
            <textarea class="form-control" name="Financial" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div class="input-group">
            <span class="input-group-text">Personal</span>
            <textarea class="form-control" name="Personal" aria-label="With textarea" onChange={handleChange} style={{ borderColor: "#adb5bd" }}></textarea>
          </div>
          <div className='text-center mt-4'>
            <Button onClick={()=>navigate("/feedbackpageprint",{state:{...selectedCounselee,...formData}})}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm