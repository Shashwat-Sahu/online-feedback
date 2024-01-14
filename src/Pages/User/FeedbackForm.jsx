import React from 'react'
import { Col, Row, Container } from "react-bootstrap";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const FeedbackForm = () => {
  return (
    
     <div class="container" style={{marginLeft:"0"}}>
  <div class="row align-items-start">
    <div class="col col-auto min-vh-100" style={{backgroundColor:"#0d6efd40"}}>
    <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
    <h2 style={{marginBottom:"0"}}>
  <small class="text-muted">Samiksha Sahu</small>
</h2>
<p style={{marginBottom:"0"}}>
  <small class="text-muted">Service ID:13342</small>
</p>
<p >
<small class="text-muted">Rank:Flying Officer</small>
</p>
    <select class="form-select" aria-label="Select Counselee">
  <option selected>Select Counselee</option>
  <option value="1">Samiksha Sahu</option>
  <option value="2">Neelam Sahu</option>
  <option value="3">Shashwat Sahu</option>
</select>
    </div>
    <div class="col">
      <h1 className='mb-3 text-center'>Feedback Form</h1>
    <table class="table table-bordered" style={{width:"auto"}}>
  <tbody>
   
      <tr>
    <th scope="row">Counselee Name</th>
      <td>Samiksha Sahu</td>  
      </tr>
      <tr>
    <th scope="row">Service ID</th>
      <td>13342</td>  
      </tr>
   
  </tbody>
</table>
<div class="input-group mb-2">
  <span class="input-group-text">Academics</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">Projects</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">Sick Report</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">OLQ</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">Games</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">Cultural</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group mb-2">
  <span class="input-group-text">FinanciaL</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
<div class="input-group">
  <span class="input-group-text">Personal</span>
  <textarea class="form-control" aria-label="With textarea" style={{borderColor:"#adb5bd"}}></textarea>
</div>
    </div>
    </div>
    </div>
  )
}

export default FeedbackForm