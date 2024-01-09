import React from 'react'
import { Col,Row,Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const currDate=new Date().toLocaleDateString();
const FeedbackForm = () => {
  return (
    <div>
        <Container className='d-flex' >
<Row>
    <h1 style={{textAlign:"center"}}>User Feedback Form</h1>
        {/* <Col style={{paddingRight:"0"}}> */}
    <Table striped bordered style={{width:"auto",textAlign:"none",marginTop:"2rem"}}>
      
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
    <div style={{paddingLeft:"0"}}>
    <InputGroup  className="mb-3">
        <InputGroup.Text>Academics</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Projects</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Sick Report</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>OLQ</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Games</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Cultural</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Financial</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      <InputGroup  className="mb-3">
        <InputGroup.Text>Personal</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup>
      </div>
   
    {/* </Col> */}
    </Row>
    </Container>
</div>
  )
}

export default FeedbackForm
