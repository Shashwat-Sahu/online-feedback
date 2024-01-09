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

import React,{ useState,useEffect } from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordIcon from '@mui/icons-material/Password';

const Login = () => {
    const [inputFields,setInputFields]=useState({serviceId:"",password:""});
    const[errors,setErrors]=useState({});
    const [submitting,setSubmitting]=useState(false);
    const validateValues=(inputValues)=>{
        let errors={};
        if(inputValues.serviceId.length<5){
          errors.serviceId="Service ID should be 5 digits long";
        }
        if((inputValues.serviceId!=/^[0-9]+$/)){
            errors.serviceId="Service ID should be numbers";
        }
        if (inputValues.password.length < 5) {
            errors.password = "Password is too short";
          }
          return errors;
    }
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
      };
   const handleSubmit=(e)=>{
    e.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true); 
    }
    const finishSubmit = () => {
        console.log(inputFields);
      };

      useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
      }, [errors]);
   
  return (
    <div >
         {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
    <Form className="box" action='' onSubmit={handleSubmit} >
        <div class="container">
            <div class="top-header">
                <span>Have an account?</span>
                <header>Login</header>
            </div>
            <div class="input-field">
            <PersonOutlinedIcon className='icon'/>
                <input type="text" class="input" name="serviceId" placeholder="Service ID" value={inputFields.serviceId} onChange={handleChange}  style={{ border: errors.serviceId ? "1px solid red" : null }}/>
                {errors.serviceId ? (
            <p className="error">Email should be number and atleast 5 digits long</p>
          ) : null}
            </div>
            <div class="input-field">
                <PasswordIcon className='icon'/>
                <input type="password" name="password" class="input" placeholder="Password" value={inputFields.password} onChange={handleChange}  style={{ border: errors.password ? "1px solid red" : null }}/>
                {errors.password ? (
            <p className="error">
              Password should be at least 5 characters long
            </p>
          ) : null}
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
    </Form>
    </div>
  )
};

export default Login
