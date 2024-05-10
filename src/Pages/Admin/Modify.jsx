import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Dropdown, Modal, Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Modify = (props) => {
  console.log(props)
  const [data, setData] = useState({});
  const [message, setMessage] = useState({ message: null, error: null })
  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!data.name || !data.rank)
      return window.alert("Name or Rank can't be empty")
    axios.put(data.type == "counsellor" ? '/counsellor/update' : '/counselee/update', {
      service_id: data.service_id,
      name: data.name,
      rank: data.rank
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      setMessage({ message: data?.data?.message, error: null })
      handleClose()
    }).catch(err => {
      err = err?.response?.data
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

  useEffect(()=>{
    setData(props.details)
  },[props])

  return (
    <>
      
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
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Counsellor : {data.service_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Full Name" value={data.name} onChange={(event) => setData({ ...data, name: event.target.value })} />
              </Col>
              {!data.name && <Col sm={{ span: 10, offset: 2 }}>
                <Form.Text className="text-danger">
                  *Name can't be empty
                </Form.Text>
              </Col>}
            </Form.Group>
            {props?.details?.type=="counsellor"&&<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Rank
              </Form.Label>
              <Col sm="10">
                <Form.Select value={data.rank} onChange={(event) => setData({ ...data, rank: event.target.value })}>

          
                  <option value="Group captain">Group captain</option>

                  <option value="Wing commander">Wing commander</option>

                  <option value="Squadron leader">Squadron leader</option>

                  <option value="Flight lieutenant">Flight lieutenant</option>

                  <option value="Flying officer">Flying officer</option>

                  <option value="Flight cadet">Flight cadet</option>

                </Form.Select>
              </Col>
              {!data.rank && <Col sm={{ span: 10, offset: 2 }}>
                <Form.Text className="text-danger">
                  *Rank can't be empty
                </Form.Text>
              </Col>}
            </Form.Group>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Modify