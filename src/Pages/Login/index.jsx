import React, { useState, useEffect } from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import { Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import { Alert, Snackbar } from '@mui/material';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setType, setServiceId, setToken } from '../../Reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [inputFields, setInputFields] = useState({ service_id: "", password: "", type: "admin" });
    const [errors, setErrors] = useState({});

    const [message, setMessage] = useState({ message: null, error: null })
    const [submitting, setSubmitting] = useState(false);
    const { setToken, setType, setServiceId } = props
    const navigate = useNavigate();


    const dispatch = useDispatch()

    const validateValues = (inputValues) => {
        if (!inputValues.service_id) {

            setMessage({ error: "Service ID is empty ", message: null })
            return true;
        }
        if (inputValues.password.length < 5) {
            setMessage({ error: "Password is too short", message: null })
            return true;
        }

    }
    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var error = validateValues(inputFields)
        if (error)
            return;
        setSubmitting(true);
        axios.post("/login", {
            service_id: inputFields.service_id, password: sha256(inputFields.password), type: inputFields.type
        }).then(data => {
            setSubmitting(false)

            localStorage.setItem("token", data.data.token)
            setToken(true)
            setType(inputFields.type)
            setServiceId(inputFields.service_id)
            navigate("/")
            setSubmitting(false)
        }).catch(err => {
            localStorage.clear()
            err = err?.response?.data
            setMessage({ error: err?.error, message: null })

            setSubmitting(false)
        })
    }


    return (
        <div className='box'>

            {<Snackbar open={message?.error} autoHideDuration={6000} onClose={() => setMessage({ message: null, error: null })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert severity="error">
                    <p className="error">{message.error}</p>
                </Alert>

            </Snackbar>}
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col xs={12}>

                        <div style={{
                            fontSize: "30px",
                            color: '#00000075',
                            textAlign: "center",
                            textTransform: "uppercase",
                            fontWeight: "bold"
                        }}>Trainee Online Integrated Management System</div>
                    </Col>
                    <Col md={6} xs={12} className="m-auto">

                        <Form action='' onSubmit={handleSubmit}>
                            <div class="container" style={{ marginBottom: "13rem" }}>

                                <div class="top-header">

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
const mapStateToProps = state => {
    return {
        token: state.loginDetails.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setToken: data => {
            dispatch({
                type: 'SET_TOKEN',
                token: data,
            })
        },
        setServiceId: data => {
            dispatch({
                type: 'SET_SERVICE_ID',
                service_id: data,
            })
        },
        setType: data => {
            dispatch({
                type: 'SET_TYPE',
                userType: data,
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)
