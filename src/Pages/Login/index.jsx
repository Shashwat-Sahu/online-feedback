// import React from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";

// const Login = () => {

//     return (
//         <>
//             <Container fluid style={{background: "url(https://tfipost.com/wp-content/uploads/2022/08/Indian-Airforce-Battle-Ready.jpg) no-repeat",backgroundSize:"cover"}}>
//                 <Row className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
//                     <Col xs={8} md={3}>
//                     <Form className="mb-4">
//                         <Row>
//                             <h2 className='link-info'>Login</h2>
//                         </Row>
//                         <Form.Group className="mb-4">
//                             <Form.Control type="text" placeholder="User ID" />
//                         </Form.Group>
//                         <Form.Group className="mb-4">
//                             <Form.Control type="password" placeholder="Password" />
//                         </Form.Group>
//                         <Form.Group className="mb-4">
//                         <Form.Check label = "Admin" inline type="radio" id="admin" name="login-group" />
//                         <Form.Check label = "User" inline type="radio" id="user" name="login-group" />
//                         </Form.Group>
//                         <Button type="submit">Submit form</Button>
//                     </Form>
//                     <h6>Not Registered?</h6>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     )

// }

// export default Login;

import React from 'react'
import './login.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordIcon from '@mui/icons-material/Password';

const Login = () => {
  return (
    <div class="box">
        <div class="container">
            <div class="top-header">
                <span>Have an account?</span>
                <header>Login</header>
            </div>
            <div class="input-field">
            <PersonOutlinedIcon className='icon'/>
                <input type="text" class="input" placeholder="Username" required/>
              
            </div>
            <div class="input-field">
                <PasswordIcon className='icon'/>
                <input type="password" class="input" placeholder="Password" required/>
                <i class="bx bx-lock-alt"></i>
            </div>
            <div class="input-field">
                <input type="submit" class="submit" value="Login"/>
            </div>
            <div class="bottom">
                <div id="admin" class="left">
                    <input type="radio"/>
                    <label for="check"> Admin</label>
                </div>
                <div id="user" class="left">
                    <input type="radio"/>
                    <label for="check"> User</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login