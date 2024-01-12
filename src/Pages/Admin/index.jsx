import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (<>
        <Container style={{ height: "100vh" }}>

            <Row>
                <Col>
                    <h1 className="text-center">Admin Dashboard</h1>
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-5">
                <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" style={{ width: "20rem", height: "10rem" }} onClick={()=>{navigate("/admin/adduser")}}>Add User</Button>
                </Col>
                <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" style={{ width: "20rem", height: "10rem" }}>Add Students</Button>
                </Col>
                <Col xs={4} className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" style={{ width: "20rem", height: "10rem" }}>Modify</Button>
                </Col>
            </Row>
        </Container>
    </>)

}

export default AdminDashboard;