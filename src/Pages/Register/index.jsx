import { useState } from 'react';
import React from 'react'
import { Button, Col, Container, Form, Row,InputGroup } from 'react-bootstrap'

const Register = () => {
  
  return (
    <>
    <Container fluid style={{background: "url(https://tfipost.com/wp-content/uploads/2022/08/Indian-Airforce-Battle-Ready.jpg) no-repeat",backgroundSize:"cover"}}>
    <Row className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                    <Col xs={8} md={3}>
                    <Form className="mb-4">
                        <Row>
                            <h2 className='link-info'>Sign Up</h2>
                        </Row>
                        <Form.Group as={Col} className="mb-4">
                        <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="First Name" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-4">
                          <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Last Name" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} className="mb-4">
                          <Form.Label>Service ID</Form.Label>
                            <Form.Control required type="text" placeholder="Service Number" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-4">
                          <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Set Password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                    <h6>Not Registered?</h6>
                    </Col>
                </Row>
    </Container>
    </>
  )
}

export default Register