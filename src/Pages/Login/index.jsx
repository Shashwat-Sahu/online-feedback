import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {

    return (
        <>
            <Container fluid style={{background: "url(https://tfipost.com/wp-content/uploads/2022/08/Indian-Airforce-Battle-Ready.jpg) no-repeat",backgroundSize:"cover"}}>
                <Row className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                    <Col xs={8} md={3}>
                    <Form className="mb-4">
                        <Row>
                            <h2 className='link-info'>Login</h2>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Control type="text" placeholder="User ID" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                        <Form.Check label = "Admin" inline type="radio" id="admin" name="login-group" />
                        <Form.Check label = "User" inline type="radio" id="user" name="login-group" />
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

export default Login;