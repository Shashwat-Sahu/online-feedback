import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Modify from './Modify';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
const ViewCounseleeList = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [editCounsellor, setEditCounsellor] = useState({})
    const { counselId } = useParams()
    const [message, setMessage] = useState({ message: null, error: null })
    const dispatch = useDispatch()


    const [counselees, setCounselees] = useState([])
    const handleShow = (counselee) => {
        setEditCounsellor({...counselee,type:"counselee"})

        setShow(true)
    }
    const handleDelete = (service_id) => {
        console.log(service_id)
        axios.delete(`/counselee/delete?service_id=${service_id}&counsellor_service_id=${counselId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }}).then(data => {
            console.log(data)
            setMessage({ message: data?.data?.message, error: null })
        }
        ).catch(err => {
            console.log(err)
            err = err.response.data
            setMessage({ error: err?.error, message: null })
            if (err.error == "Not Authorized")
            {localStorage.clear()
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })
    }

    useEffect(() => {
        if (show == false || message?.message)
            axios.get("/getCounselees?service_id=" + counselId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(data => {
                console.log(data)
                setCounselees(data.data)
            }).catch(err => {
                err = err.response.data
                if (err.error == "Not Authorized")
                {
                    localStorage.clear()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            })
    }, [show, message])
    return (
        < div className="counsellor-box">
            <Container style={{ height: "100vh" }}>

                <Row>
                    <Col>
                        <h1 className="text-center" style={{color:"white"}}>All Counselee under: {counselId}</h1>
                    </Col>
                </Row>
                <Row>
                    <div className='table-responsive'>

                        {<Snackbar open={message?.error} autoHideDuration={1000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                            <Alert severity="error">
                                <p className="error">{message.error}</p>
                            </Alert>

                        </Snackbar>}
                        {<Snackbar open={message?.message} autoHideDuration={1000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                            <Alert severity="success">
                                <p className="success">{message.message}</p>
                            </Alert>

                        </Snackbar>}
                        <table class="table table-hover table-bordered mt-4">
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
                                {counselees.map((counselee) => {
                                    return (
                                        <tr>
                                            <th scope="row">{counselee.service_id}</th>
                                            <td>{counselee.name}</td>
                                            <td>{counselee.rank}</td>
                                            <td><Button variant="primary" onClick={() => handleShow(counselee)}>
                                                <EditIcon />
                                            </Button></td>
                                            <td><IconButton aria-label="delete" onClick={() => { handleDelete(counselee.service_id) }}>
                                                <DeleteIcon />
                                            </IconButton></td>

                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </Row>
            </Container>
            <Modify details={editCounsellor} show={show} setShow={setShow} />
        </div>
    )
}

export default ViewCounseleeList;