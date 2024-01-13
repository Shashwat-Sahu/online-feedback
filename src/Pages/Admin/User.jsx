import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Modify from './Modify';
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  return (
    <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Service ID</th>
      <th scope="col">Counsellor Name</th>
      <th scope="col">Modify Counsellor</th>
      <th scope="col">Delete Counsellor</th>
      <th scope="col">Add Counselee</th>
      <th scope="col">View Counselee List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">12345</th>
      <td>Samiksha Sahu</td>
      <td><Modify/></td>
      <td><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></td>
      <td><AddIcon onClick={()=>{navigate("/admin/addstudent")}} style={{color:"blue"}}/></td>
      <td><RemoveRedEyeIcon style={{color:"blue"}}/></td>

    </tr>
    <tr>
    <th scope="row">12342</th>
      <td>Neelam Sahu</td>
      <td><Modify/></td>
      <td><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></td>
      <td><AddIcon onClick={()=>{navigate("/admin/addstudent")}} style={{color:"blue"}}/></td>
      <td><RemoveRedEyeIcon style={{color:"blue"}}/></td>
    </tr>
    <tr>
    <th scope="row">12343</th>
      <td>Shashwat Sahu</td>
      <td><Modify/></td>
      <td><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></td>
      <td><AddIcon onClick={()=>{navigate("/admin/addstudent")}} style={{color:"blue"}}/></td>
      <td><RemoveRedEyeIcon style={{color:"blue"}}/></td>
    </tr>
    <tr>
    <th scope="row">12341</th>
      <td>Jainendra Kumar Sahu</td>
      <td><Modify/></td>
      <td><IconButton aria-label="delete">
  <DeleteIcon />
</IconButton></td>
      <td><AddIcon onClick={()=>{navigate("/admin/addstudent")}} style={{color:"blue"}}/></td>
      <td><RemoveRedEyeIcon style={{color:"blue"}}/></td>
    </tr>

  </tbody>
</table>
  )
}

export default User