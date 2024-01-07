import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Col,Row,Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const currDate=new Date().toLocaleDateString();
function User() {
  return (
    <>

<Container fluid style={{background: "url(https://img.freepik.com/premium-photo/fighter-jet-aesthetic-desktop-wallpaper-8k-photography-background_882954-14213.jpg?w=1060) no-repeat",backgroundSize:"cover"}}>
    <Row className="d-flex">
        <Col className='col-auto bg-dark min-vh-100' style={{paddingTop:"10rem",color:"white",opacity:"0.3"}}>
        <div>
          <AccountCircleIcon style={{fontSize:"xxx-large"}}/>
          <h1>Samiksha Sahu</h1>
          <h5> Department:Engineering</h5>
          <h6>Service ID:78908</h6>
        </div>
        </Col>
<Col style={{paddingLeft:"0"}}>
<Form.Select size="sm" style={{width:"auto",backgroundColor:"#fff3cd8c"}}>
      <option>Select Student</option>
      <option value="1">Jainendra Kr Sahu:17116</option>
      <option value="2">Neelam Sahu:22027</option>
      <option value="3">Shashwat Sahu:25112</option>
    </Form.Select>
    
</Col>
<Col style={{paddingRight:"0"}}>
    <Table striped bordered style={{width:"auto",textAlign:"none"}}>
      
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
    </Col>
    </Row>
    </Container>
    </>
  );
}



export default User   