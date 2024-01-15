import React, { useState } from 'react'
import { Row, Col, Form, Dropdown, Modal, Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

const Modify = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(props.details);
  const [message, setMessage] = useState({message:null,error:null})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (!data.name || !data.rank)
      return window.alert("Name or Rank can't be empty")
    axios.put('/counsellor/update', {
      service_id: data.service_id,
      name: data.name,
      rank: data.rank
    }).then(data => {
      console.log(data)
      setMessage(data?.data?.message)
    }).catch(err => {
      setMessage(err?.error)
    })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <EditIcon />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setMessage({message:null,error:null})} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          {message?.message && <Alert severity="error">
            <p className="error">{true}</p>
          </Alert>
          }
          {message?.error &&<Alert severity="success">
              <p className="success">{true}</p>
            </Alert>
          }
        </Snackbar>
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
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Rank
              </Form.Label>
              <Col sm="10">
                <Form.Select value={data.rank} onChange={(event) => setData({ ...data, rank: event.target.value })}>

                  <option value="Marshal of the Indian Air Force">Marshal of the Indian Air Force</option>

                  <option value="Air chief marshal">Air chief marshal</option>

                  <option value="Air marshal">Air marshal</option>

                  <option value="Air vice marshal">Air vice marshal</option>

                  <option value="Air commodore">Air commodore</option>

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
            </Form.Group>
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