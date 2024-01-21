import React, { useState } from "react";
import { Col, Container, Form, Row, Dropdown, FloatingLabel } from "react-bootstrap";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../../commonStyles.css'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Fab from '@mui/material/Fab';
import { logout } from "../../Comtrollers/logoutController";

const AddUser = () => {
    const [data, setData] = useState({ rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" });
    const [message, setMessage] = useState({ message: null, error: null })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleChange = (e) => {
        console.log(e)
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!data.name || !data.rank || !data.service_id || !data.password)
            return setMessage({ ...message, error: "Few fields are empty" })
        if (data.service_id.length != 5)
            return setMessage({ ...message, error: "Service ID must be 5 digits" })
        axios.post('/counsellor/add', { ...data, password: sha256(data.password) }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            console.log(data)
            setMessage({ message: data?.data?.message, error: null });
            setData({ rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" })

        }).catch(err => {
            err = err.response.data
            setMessage({ error: err?.error, message: null })
            if (err.error == "Not Authorized") {
                localStorage.clear()
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }

        })
    }
    return (
        <div className="counsellor-box">

            {<Snackbar open={message?.error} autoHideDuration={6000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error">
                    <p className="error">{message.error}</p>
                </Alert>

            </Snackbar>}
            {<Snackbar open={message?.message} autoHideDuration={6000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="success">
                    <p className="success">{message.message}</p>
                </Alert>

            </Snackbar>}
            <Container >
                <Row>

                    <h1 className="text-center" style={{ color: "white", marginTop: "1rem" }}>Add Counsellor</h1>

                </Row>
                <Row>
                    <Col>
                        <Fab variant="extended" onClick={() => { navigate("/") }}>
                            <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
                            Back to Dashboard
                        </Fab>
                    </Col>
                    <Col className="text-end" >
                        <Fab variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                            Logout
                            <LogoutIcon sx={{ ml: 1 }} />
                        </Fab>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} sm={8} xs={10} className="m-auto">
                        <Form className="table-user">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3"
                                style={{ color: "white" }}

                            >
                                <Form.Control type="text" id="input-field" placeholder="User Name" value={data.name} name="name" onChange={handleChange} />
                                {!data.name &&
                                    <Form.Text className="text-danger">
                                        *Name can't be empty
                                    </Form.Text>}
                            </FloatingLabel>


                            <FloatingLabel
                                controlId="floatingInput"
                                label="Service ID"
                                className="mb-3" style={{ color: "white" }}>
                                <Form.Control id="input-field" type="number" placeholder="Enter Service ID" value={data.service_id} name="service_id" onChange={handleChange} />
                                {!data.service_id &&
                                    <Form.Text className="text-danger">
                                        *Service ID can't be empty
                                    </Form.Text>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Rank"
                                className="mb-3">
                                <Form.Select style={{ background: "transparent", color: "white" }} value={data.rank} name="rank" onChange={handleChange}>

                                    <option style={{ color: "black" }} value="Marshal of the Indian Air Force">Marshal of the Indian Air Force</option>

                                    <option style={{ color: "black" }} value="Air chief marshal">Air chief marshal</option>

                                    <option style={{ color: "black" }} value="Air marshal">Air marshal</option>

                                    <option style={{ color: "black" }} value="Air vice marshal">Air vice marshal</option>

                                    <option style={{ color: "black" }} value="Air commodore">Air commodore</option>

                                    <option style={{ color: "black" }} value="Group captain">Group captain</option>

                                    <option style={{ color: "black" }} value="Wing commander">Wing commander</option>

                                    <option style={{ color: "black" }} value="Squadron leader">Squadron leader</option>

                                    <option style={{ color: "black" }} value="Flight lieutenant">Flight lieutenant</option>

                                    <option style={{ color: "black" }} value="Flying officer">Flying officer</option>

                                    <option style={{ color: "black" }} value="Flight cadet">Flight cadet</option>

                                </Form.Select>
                                {!data.rank &&
                                    <Form.Text className="text-danger">
                                        *Rank can't be empty
                                    </Form.Text>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Set Password"
                                className="mb-3"
                                style={{ color: "white" }}
                            >
                                <Form.Control type="password" id="input-field" placeholder="Set Password" value={data.password} name="password" onChange={handleChange} />

                                {!data.password &&
                                    <Form.Text className="text-danger">
                                        *Password can't be empty
                                    </Form.Text>}
                            </FloatingLabel>
                            <div className="text-center">
                                <Button id="submit-Btn" variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />} size="medium"> Submit</Button>
                            </div>
                        </Form>

                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default AddUser;