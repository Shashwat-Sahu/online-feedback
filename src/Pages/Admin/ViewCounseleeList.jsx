import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Modify from './Modify';
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const ViewCounseleeList = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">View Counselee under</h1>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col xs={12}>
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Service ID</th>
                                <th scope="col">Counselee Name</th>
                                <th scope="col">Rank</th>
                                <th scope="col">Modify Counselee</th>
                                <th scope="col">Delete Counselee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">12345</th>
                                <td>Samiksha Sahu</td>

                                <td>Wing Commander</td>
                                <td><Modify /></td>
                                <td><IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton></td>

                            </tr>
                            

                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewCounseleeList;