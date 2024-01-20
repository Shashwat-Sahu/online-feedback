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
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../Reducers/loginReducer';
import { Button } from 'react-bootstrap';

const User = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editCounsellor, setEditCounsellor] = useState({})
  const [message, setMessage] = useState({ message: null, error: null })
  const dispatch = useDispatch()
   const [counsellors, setCounsellors] = useState([])
   const [currentPage,setCurrentPage]=useState(1);
   const recordsPerPage=5;
   const lastIndex=currentPage*recordsPerPage;
   const firstIndex=lastIndex-recordsPerPage;
   const records=counsellors.slice(firstIndex,lastIndex);
   const npage=Math.ceil(counsellors.length/recordsPerPage);
   const numbers=[...Array(npage+1).keys()].slice(1);

 
  const handleShow = (counsellor) => {
    setEditCounsellor({...counsellor,type:"counsellor"})
    
    setShow(true)
  }

  const handleDelete = (service_id) => {
    console.log(service_id)
    axios.delete("/counsellor/delete?service_id=" + service_id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    ).then(data => {
      console.log(data)
      setMessage({ message: data?.data?.message, error: null })
    }).catch(err => {
      console.log(err)
      err = err.response.data
      setMessage({ error: err?.error, message: null })
      if (err.error == "Not Authorized")
                {
                    localStorage.clear()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
    })
  }

  useEffect(() => {
    if (show == false || message?.message)
      axios.get("/getCounsellors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(data => {
        console.log(data)
        setCounsellors(data.data)
      }).catch(err => {
        console.log(err)
        err = err?.response?.data
        if (err.error == "Not Authorized")
                {
                    localStorage.clear()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
      })
  }, [show, message])

  
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
      <table class="table table-hover table-bordered mt-4 table-sm">
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
          {records.map((counsellor) => {
            return (
              <tr>
                <th scope="row">{counsellor.service_id}</th>
                <td>{counsellor.name}</td>
                <td>{counsellor.rank}</td>
                <td><Button variant="primary" onClick={() => handleShow(counsellor)}>
                  <EditIcon />
                </Button></td>
                <td><IconButton aria-label="delete" onClick={() => { handleDelete(counsellor.service_id) }}>
                  <DeleteIcon />
                </IconButton></td>
                <td><AddIcon onClick={() => { navigate("/admin/addstudent/" + counsellor.service_id) }} style={{ color: "blue" }} /></td>
                <td><RemoveRedEyeIcon style={{ color: "blue" }} onClick={() => { navigate("/admin/viewcounseleelist/" + counsellor.service_id) }} /></td>

              </tr>
            )
          })}


        </tbody>
      </table>
      <nav>
  <ul className="pagination justify-content-end">
  <li className='page-item'>
<a href="#" className='page-link' onClick={prePage}>
Prev
</a>
    </li>
    {
      numbers.map((n,i)=>(
        <li className={`page-item ${currentPage===n? 'active':''}`} key={i}>
<a href="#" className='page-link' onClick={()=>changeCPage(n)}>{n}

</a>
        </li>

      ))
    }
    <li className='page-item'>
<a href="#" className='page-link' onClick={nextPage}>
Next
</a>
    </li>
  </ul>
</nav>
      <Modify details={editCounsellor} show={show} setShow={setShow} />
      
    </div>
  )
  function prePage(){
    if(currentPage!==firstIndex){
      setCurrentPage(currentPage-1)
    }

  }
  function changeCPage(id=counsellors.service_id){
setCurrentPage(id)
  }
  function nextPage(){
if(currentPage!==lastIndex)
setCurrentPage(currentPage+1)
  }
}

export default User