import React, { useState, useEffect } from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import { Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import { Alert, Snackbar } from '@mui/material';
import { sha256 } from 'js-sha256';
import axios from 'axios';

const Login = () => {
    const [inputFields, setInputFields] = useState({ service_id: "", password: "", type: "admin" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.service_id.length != 5) {
            errors.service_id = "Service ID should be 5 digits long";
            return errors;
        }
        if (inputValues.password.length < 5) {
            errors.password = "Password is too short";
            return errors;
        }

    }
    const handleChange = (e) => {
        console.log(e)
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var error = validateValues(inputFields)
        if (error?.service_id || error?.password)
            return setErrors(error);
        setSubmitting(true);
        axios.post("/login", {
            service_id: inputFields.service_id, password: sha256(inputFields.password), type: inputFields.type
        }).then(data => {
            console.log(data)
            setSubmitting(false)
        }).catch(err => {
            console.log(err)
            setSubmitting(false)
        })
    }
    const finishSubmit = () => {
        console.log(inputFields);
    };


    return (
        <div className='box'>
            <Container className='h-100'>
                {<Snackbar open={errors.service_id || errors.password} autoHideDuration={6000} onClose={() => setErrors({})} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert severity="error">{errors.service_id || errors.password ? (
                        <p className="error">{errors.service_id || errors.password}</p>
                    ) : null}</Alert>
                </Snackbar>}
                {Object.keys(errors).length === 0 && submitting ? (
                    <span className="success">Successfully submitted ✓</span>
                ) : null}
                <Row className='h-100'>
                    <Col md={6} xs={12} className="m-auto">
                        <Form action='' onSubmit={handleSubmit}>
                            <div class="container">
                                <div class="top-header">
                                    <span>Have an account?</span>
                                    <header>Login</header>
                                </div>
                                <div class="input-field">
                                    <div className='input-container' style={errors.service_id ? { border: "2px solid red" } : null}>
                                        <PersonOutlinedIcon className='icon' />
                                        <input type="number" class="input" name="service_id" placeholder="Service ID" value={inputFields.service_id} onChange={handleChange} />

                                    </div>
                                </div>
                                <div class="input-field">
                                    <div className='input-container' style={errors.password ? { border: "2px solid red" } : null}>
                                        <PasswordIcon className='icon' />
                                        <input type="password" name="password" class="input" placeholder="Password" value={inputFields.password} onChange={handleChange} />

                                    </div>
                                </div>

                                <div class="bottom">
                                    <div id="admin" class="left">
                                        <input type="radio" checked={inputFields.type == "admin"} name="type" onChange={handleChange} value="admin" />
                                        <label for="check"> Admin</label>
                                    </div>
                                    <div id="user" class="left">
                                        <input type="radio" checked={inputFields.type == "user"} name="type" onChange={handleChange} value="user" />
                                        <label for="check"> User</label>
                                    </div>
                                </div>
                                <div class="input-field mt-4">
                                    <input type="submit" class="submit" value="Login" />
                                </div>
                                {submitting && <div className=' mt-3 d-flex justify-content-center'>
                                    <Spinner animation="border" variant="light" className='m-auto' />
                                </div>}
                            </div>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    )
};

export default Login
