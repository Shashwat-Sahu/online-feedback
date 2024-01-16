import React, { useState } from 'react'
import { Col, Container, Form, Row, Dropdown, FloatingLabel, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import '../../commonStyles.css'
import axios from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const AddStudent = () => {
    const [data, setData] = useState([{ rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" }]);
    const [message, setMessage] = useState({ message: null, error: null })
    const token = useSelector(state => state.login.token)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    console.log(token)
    const { counselId } = useParams()
    const handleChange = (e, index) => {
        const newArray = data.map((item, i) => {
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item;
            }
        });
        setData(newArray);
    };

    const handleIncreaseStudent = () => {
        setData([...data, { rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" }])
    }

    const handleDelete = (index) => {
        console.log(index, data)
        const filtered = data.filter((value, ind) => {
            if (ind != index)
                return value
        })
        console.log(filtered)
        setData(filtered)

    }

    function isUnique(value, index, array) {
        return array.indexOf(value) === array.lastIndexOf(value);
    }

    const handleSubmit = () => {
        var service_ids = data.map(function (obj) {
            return obj.service_id;
        })
        if (!service_ids.every(isUnique))
            return setMessage({ ...message, error: "Service ID should be unique" })
        data.forEach((data) => {
            if (!data.name || !data.rank || !data.service_id)
                return setMessage({ ...message, error: "Few fields are empty" })
            if (data.service_id.length != 5)
                return setMessage({ ...message, error: "Service ID must be 5 digits for " + data.service_id })
        })
        console.log(counselId)
        axios.put('/counsellor/addCounseleeList', {
            counselee_list: data, counsellor_service_id: counselId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            console.log(data)
            setMessage({ message: data?.data?.message, error: null })

        }).catch(err => {
            err = err.response.data
            setMessage({ error: err?.error, message: null })
            if(err.error=="Not Authorized")
            setTimeout(() => {
                window.location.reload()  
            }, 2000);
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

                    <h1 className="text-center" style={{ color: "white", marginTop: "1rem" }}>Add Counselee</h1>

                </Row>
                <Row>
                    <div className="text-end">

                        <Button id="submit-Btn" className='mx-2' variant="contained" color="info" onClick={() => handleIncreaseStudent()} endIcon={<AddIcon />} size="medium"> Add More </Button>
                        <Button id="submit-Btn" variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />} size="medium"> Submit</Button>

                    </div>
                </Row>
                <Row>
                    <Col xs={12} className="d-flex justify-content-center flex-wrap">
                        {data.map((data, index) => {
                            return (
                                <Form className="table-user d-inline-block mx-1" style={{ minWidth: "30%" }}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Name"
                                        className="mb-3"
                                        style={{ color: "white" }}
                                        id="input-field"
                                    >
                                        <Form.Control type="text" placeholder="User Name" name="name" value={data.name} onChange={(e) => handleChange(e, index)} index={index} />
                                        {!data.name &&
                                            <Form.Text className="text-danger">
                                                *Name can't be empty
                                            </Form.Text>}
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Service ID"
                                        className="mb-3" style={{ color: "white" }}>
                                        <Form.Control id="input-field" type="number" placeholder="Enter Service ID" value={data.service_id} index={index} name="service_id" onChange={(e) => handleChange(e, index)} />
                                        {!data.service_id &&
                                            <Form.Text className="text-danger">
                                                *Service ID can't be empty
                                            </Form.Text>}
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Rank"
                                        className="mb-3">
                                        <Form.Select style={{ background: "transparent", color: "white" }} value={data.rank} name="rank" onChange={(e) => handleChange(e, index)} index={index}>

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

                                    <div className='text-end'>
                                        <DeleteIcon style={{ color: "white" }} onClick={() => handleDelete(index)} />
                                    </div>
                                </Form>
                            )
                        })}
                    </Col>

                </Row>

            </Container>
        </div>
    )

}

export default AddStudent