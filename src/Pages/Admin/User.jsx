import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Modify from './Modify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = useState([])
  useEffect(() => {
    axios.get("/getCounsellors").then(data => {
      console.log(data)
      setCounsellors(data.data)
    })
  }, [])

  return (
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Service ID</th>
          <th scope="col">Counsellor Name</th>
          <th scope="col">Rank</th>
          <th scope="col">Modify Counsellor</th>
          <th scope="col">Delete Counsellor</th>
          <th scope="col">Add Counselee</th>
          <th scope="col">View Counselee List</th>
        </tr>
      </thead>
      <tbody>
        {counsellors.map((counsellor) => {
          return (
            <tr>
              <th scope="row">{counsellor.service_id}</th>
              <td>{counsellor.name}</td>
              <td>{counsellor.rank}</td>
              <td><Modify details={{...counsellor,type:"counsellor"}}/></td>
              <td><IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton></td>
              <td><AddIcon onClick={() => { navigate("/admin/addstudent") }} style={{ color: "blue" }} /></td>
              <td><RemoveRedEyeIcon style={{ color: "blue" }} onClick={() => { navigate("/admin/viewcounseleelist/12344") }} /></td>

            </tr>
          )
        })}


      </tbody>
    </table>
  )
}

export default User