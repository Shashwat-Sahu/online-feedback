import React, { useState, useEffect } from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {
    const [inputFields, setInputFields] = useState({ serviceId: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.serviceId.length != 5) {
            errors.serviceId = "Service ID should be 5 digits long";
            return errors;
        }
        if (inputValues.password.length < 5) {
            errors.password = "Password is too short";
            return errors;
        }

    }
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var error = validateValues(inputFields)
        if(error.serviceId||error.password)
        return setErrors(error);
        setSubmitting(true);
    }
    const finishSubmit = () => {
        console.log(inputFields);
    };

    // useEffect(() => {
    //     if (Object.keys(errors).length === 0 && submitting) {
    //         finishSubmit();
    //     }
    // }, [errors]);

    return (
        <div className='box'>
        <Container className='h-100'>
            {<Snackbar open={errors.serviceId||errors.password} autoHideDuration={6000} onClose={()=>setErrors({})} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error">{errors.serviceId || errors.password ? (
                    <p className="error">{errors.serviceId || errors.password}</p>
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
                                <div className='input-container' style={errors.serviceId?{ border: "2px solid red" }:null}>
                                    <PersonOutlinedIcon className='icon' />
                                    <input type="number" class="input" name="serviceId" placeholder="Service ID" value={inputFields.serviceId} onChange={handleChange} />

                                </div>
                            </div>
                            <div class="input-field">
                                <div className='input-container' style={errors.password?{ border: "2px solid red" }:null}>
                                    <PasswordIcon className='icon' />
                                    <input type="password" name="password" class="input" placeholder="Password" value={inputFields.password} onChange={handleChange} />

                                </div>
                            </div>
                            <div class="input-field">
                                <input type="submit" class="submit" value="Login" />
                            </div>
                            <div class="bottom">
                                <div id="admin" class="left">
                                    <input type="radio" />
                                    <label for="check"> Admin</label>
                                </div>
                                <div id="user" class="left">
                                    <input type="radio" />
                                    <label for="check"> User</label>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>

        </Container>
        </div>
    )
};

export default Login
