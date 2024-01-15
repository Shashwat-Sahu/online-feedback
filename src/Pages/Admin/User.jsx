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
import { Alert, Snackbar } from '@mui/material';

const User = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({ message: null, error: null })
  
  
  const [counsellors, setCounsellors] = useState([])

  const handleDelete = (service_id)=>{
    console.log(service_id)
    axios.delete("/counsellor/delete?service_id="+service_id).then(data => {
      console.log(data)
      setMessage({ message: data?.data?.message, error: null })
    }).catch(err=>{
      console.log(err)
      err = err.response.data
      setMessage({ error: err?.error, message: null })
  })
  }

  useEffect(() => {
    if(show==false||message?.message)
    axios.get("/getCounsellors").then(data => {
      console.log(data)
      setCounsellors(data.data)
    })
  }, [show,message])

  return (
    <div className='table-responsive'>
      
      {<Snackbar open={message?.error} autoHideDuration={1000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="error">
          <p className="error">{message.error}</p>
        </Alert>

      </Snackbar>}
      {<Snackbar open={message?.message} autoHideDuration={1000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="success">
          <p className="success">{message.message}</p>
        </Alert>

      </Snackbar>}
    <table class="table table-hover table-bordered mt-4">
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
              <td><Modify details={{...counsellor,type:"counsellor"}} show={show} setShow={setShow}/></td>
              <td><IconButton aria-label="delete" onClick={()=>{handleDelete(counsellor.service_id)}}>
                <DeleteIcon />
              </IconButton></td>
              <td><AddIcon onClick={() => { navigate("/admin/addstudent") }} style={{ color: "blue" }} /></td>
              <td><RemoveRedEyeIcon style={{ color: "blue" }} onClick={() => { navigate("/admin/viewcounseleelist/12344") }} /></td>

            </tr>
          )
        })}


      </tbody>
    </table>
    </div>
  )
}

export default User