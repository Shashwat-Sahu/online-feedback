import React, { useState } from 'react'
import { Col, Container, Form, Row, Dropdown, FloatingLabel, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import '../../commonStyles.css'
import axios from 'axios';
import { Snackbar } from '@mui/material';

const AddStudent = () => {
    const [data, setData] = useState([{ rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" }]);
    const [message, setMessage] = useState({ message: null, error: null })
    const handleChange = (e) => {
        console.log(e)
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleIncreaseStudent = () =>{
        setData([...data,{ rank: "Marshal of the Indian Air Force", name: "", service_id: "", password: "" }])
    }

    const handleSubmit = () => {
        if (!data.name || !data.rank || !data.service_id || !data.password)
            return setMessage({ ...message, error: "Few fields are empty" })
        if (data.service_id.length != 5)
            return setMessage({ ...message, error: "Service ID must be 5 digits" })
        axios.post('/counsellor/add', data).then(data => {
            console.log(data)
            setMessage({ message: data?.data?.message, error: null })

        }).catch(err => {
            err = err.response.data
            setMessage({ error: err?.error, message: null })
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
                        <Button id="submit-Btn" variant="contained" color="info" onClick={()=>handleIncreaseStudent()} endIcon={<AddIcon/>} size="medium"> Add More </Button>
                    </div>
                </Row>
                <Row>
                    <Col md={12} sm={8} xs={10} className="m-auto">
                        {data.map((index, data) => {
                            return (
                                <Form className="table-user d-inline-block" style={{minWidth:"40%"}}>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Name"
                                        className="mb-3"
                                        style={{ color: "white" }}
                                        id="input-field"
                                    >
                                        <Form.Control type="text" placeholder="User Name" name="name" onChange={handleChange} index={index} />
                                        {!data.name &&
                                            <Form.Text className="text-danger">
                                                *Name can't be empty
                                            </Form.Text>}
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Service ID"
                                        className="mb-3" style={{ color: "white" }}>
                                        <Form.Control id="input-field" type="number" placeholder="Enter Service ID" index={index} name="service_id" onChange={handleChange} />
                                        {!data.service_id &&
                                            <Form.Text className="text-danger">
                                                *Service ID can't be empty
                                            </Form.Text>}
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Rank"
                                        className="mb-3">
                                        <Form.Select style={{ background: "transparent", color: "white" }} value={data.rank} name="rank" onChange={handleChange} index={index}>

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
                                    <div className="text-center">
                                        <Button id="submit-Btn" variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />} size="medium"> Submit</Button>
                                    </div>
                                    <div className='text-end'>
                                        <DeleteIcon style={{color:"white"}}/>
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