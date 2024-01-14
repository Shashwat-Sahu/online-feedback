import React from 'react'
import { Col, Container, Form, Row,Dropdown,FloatingLabel } from "react-bootstrap";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../../commonStyles.css'

const AddStudent = () => {
    return (
        <div className="counsellor-box">
        <Container fluid={{url:('')}}>
            <Row>
                
                    <h1 className="text-center" style={{color:"white",marginTop:"1rem"}}>Add Counselee</h1>
                
            </Row>
            <Row className="text-center table-user">
               
                <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                            style={{color:"white"}}
                            id="input-field"
                        >
                            <Form.Control type="text" placeholder="User Name" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Service ID"
                            className="mb-3" style={{color:"white"}}>
                            <Form.Control  id="input-field" type="number" placeholder="Enter Service ID" />
                        </FloatingLabel>
                        <Form.Label style={{color:"white"}}>Rank</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className="mb-3" style={{ color: "#212529", backgroundColor: "white", border: "1px solid #dee2e6" }}  >
                                Select Rank
                            </Dropdown.Toggle>

                            <Dropdown.Menu id="input-field">
                                <Dropdown.Item href="#/action-1" active>Marshal of the Indian Air Force</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Air chief marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Air marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Air vice marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Air chief marshal</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Air commodore </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Group captain</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Wing commander</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Squadron leader</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Flight lieutenant</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">Flying officer</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">Flight cadet</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className="text-center">
                            <Button id="submit-Btn" variant="contained" color="success" endIcon={<SendIcon />} size="medium"> Submit</Button>
                        </div>
                    </Form>
                   
                

            </Row>

        </Container>
        </div>
    )
}

export default AddStudent