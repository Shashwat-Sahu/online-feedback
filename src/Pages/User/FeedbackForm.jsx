import React from 'react'
import { Col, Row, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputGroup from 'react-bootstrap/InputGroup';

const currDate = new Date().toLocaleDateString();
const FeedbackForm = () => {
  return (
      <Container fluid style={{ margin: "0" }} >
        <Row>
          <Col className='d-flex justify-content-center align-items-center col-auto bg-dark min-vh-100' style={{ color: "white", opacity: "0.3" }}>
            <div>
              <AccountCircleIcon style={{ fontSize: "xxx-large" }} />
              <h1>Samiksha Sahu</h1>
              <h5> Department:Engineering</h5>
              <h6>Service ID:78908</h6>
              <Form.Select size="sm" style={{ width: "auto", backgroundColor: "#fff3cd8c" }}>
                <option>Select Student</option>
                <option value="1">Jainendra Kr Sahu:17116</option>
                <option value="2">Neelam Sahu:22027</option>
                <option value="3">Shashwat Sahu:25112</option>
              </Form.Select>

            </div>
          </Col>
          <Col>
            <h1 style={{ textAlign: "center" }}>User Feedback Form</h1>
            {/* <Col style={{paddingRight:"0"}}> */}
            <Table striped bordered style={{ width: "auto", textAlign: "none", marginTop: "2rem" }}>

              <tbody>
                <tr>
                  <td>Candidate Name</td>
                  <td>Jainendra Kumar Sahu</td>

                </tr>
                <tr>
                  <td>Service ID</td>
                  <td>17116</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{currDate}</td>
                </tr>

              </tbody>
            </Table>
            <div style={{ paddingLeft: "0" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Academics</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Projects</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Sick Report</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>OLQ</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Games</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Cultural</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Financial</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Personal</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </div>
          </Col>
          {/* </Col> */}
        </Row>
      </Container>
 
  )
}

export default FeedbackForm
