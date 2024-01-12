import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const AddUser = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Add User</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter Service ID" />
                            <Form.Text className="text-danger">
                                *Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter Service ID" />
                            <Form.Text className="text-danger">
                                *Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter Service ID" />
                            <Form.Text className="text-danger">
                                *Required
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddUser;