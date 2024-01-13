import React,{useState} from 'react'
import {Row,Col,Form,Dropdown,Modal,Button} from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';

const Modify = () => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <>
   
      <Button variant="primary" onClick={handleShow}>
      <EditIcon/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Counsellor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Full Name" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Rank
        </Form.Label>
        <Col sm="10">
        <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark" className="mb-3" style={{color:"#212529",backgroundColor:"white",border:"1px solid #dee2e6"}} >
                                Select Rank
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" active>Marshal of the Indian Air Force</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Air chief marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Air marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Air vice marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Air chief marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Air commodore </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Group captain</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Wing commander</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Squadron leader</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Flight lieutenant</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Flying officer</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Flight cadet</Dropdown.Item>
                            </Dropdown.Menu>
                            
                        </Dropdown>

        </Col>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Modify