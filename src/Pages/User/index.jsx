import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Col,Row,Container } from "react-bootstrap";


function User() {
  return (
    <>

<Container fluid style={{background: "url(https://img.freepik.com/premium-photo/fighter-jet-aesthetic-desktop-wallpaper-8k-photography-background_882954-14213.jpg?w=1060) no-repeat",backgroundSize:"cover"}}>
    <Row className="d-flex">
        <Col className='d-flex justify-content-center align-items-center col-auto bg-dark min-vh-100' style={{color:"white",opacity:"0.3"}}>
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
    </Row>
    </Container>
    </>
  );
}



export default User;
