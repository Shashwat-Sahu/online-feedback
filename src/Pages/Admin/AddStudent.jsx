import React, { useState } from 'react'
import * as XLSX from "xlsx"
import { Col, Container, Form, Row, Dropdown, FloatingLabel, Alert } from "react-bootstrap";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import '../../commonStyles.css'
import axios from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Fab from '@mui/material/Fab';
import { logout } from '../../Controllers/logoutController';

const AddStudent = () => {
    const [data, setData] = useState([{
        rank: "Flying officer",
        name: "", service_id: "",
         gender: "Male",
        dob: "",
        mo_name: "",
        m_occ: "",
        fo_name: "",
        f_occ: "",
        si_name: "",
        si_occ: "",
        qualification: "Graduate",
        academic_marks:0,
        pro_extra_co_marks:0
    }]);
    const [message, setMessage] = useState({ message: null, error: null })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { counselId } = useParams()
    const handleChange = (e, index) => {
        console.log(e)
        const newArray = data.map((item, i) => {
            console.log(e.target.name)
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item;
            }
        });
        setData(newArray);
    };

    const handleIncreaseStudent = () => {
        setData([...data, {
            rank: "Flying officer",
            name: "", service_id: "",
             gender: "Male",
            dob: "",
            mo_name: "",
            m_occ: "",
            fo_name: "",
            f_occ: "",
            si_name: "",
            si_occ: "",
            qualification: "Graduate",
            academic_marks:0,
            pro_extra_co_marks:0
        }])
    }

    const handleUploadInput = async(e) =>{
        const file = e.target.files[0];
        const fileReader = await new FileReader()
        fileReader.readAsArrayBuffer(file)
    
        fileReader.onload = (e) => {
          const bufferArray = e?.target.result
          const wb = XLSX.read(bufferArray, { type: "buffer" ,cellText:false,cellDates:true})
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
    
          const data = XLSX.utils.sheet_to_json(ws, {raw: false,dateNF:'yyyy-mm-dd'})
          const fileName = file.name.split(".")[0]
            const updateData = data.map(x=>{
                return{
                    
            rank: "Flying officer",
                    service_id:x["Service ID"],
                    name:x["name"], 
                    gender: x["gender"],
                    dob:x["dob (dd-mm-yyyy)"],
                    mo_name:x["mother name"],
                    m_occ: x["mother occupation"],
                    fo_name:x["father name"],
                    f_occ:x["father occupation"],
                    si_name: x["sibling name"],
                    si_occ:x["sibling occupation"],
                    qualification:x["qualification"],
                    academic_marks:x["academic marks"],
                    pro_extra_co_marks:x["project & extra co-curricular marks"]
                }
            })
            setData(updateData)
          console.log(data)
        }
    }

    const handleUpload = () =>{
        var fileInput = document.getElementById("uploadexcel")
        fileInput.click()
    }

    const handleDownloadTemplate = () => {
        const worksheet = XLSX.utils.json_to_sheet([{
            service_id: "",name: "",
             gender: "",
            dob: "",
            mo_name: "",
            m_occ: "",
            fo_name: "",
            f_occ: "",
            si_name: "",
            si_occ: "",
            qualification: "Graduate",
        academic_marks:0,
        pro_extra_co_marks:0
        }])

        const workbook = XLSX.utils.book_new();
        var columns = ["Service ID","name", "gender",
            "dob (dd-mm-yyyy)",
            "mother name",
            "mother occupation",
            "father name",
            "father occupation",
            "sibling name",
            "sibling occupation",
            "qualification",
            "academic marks",
            "project & extra co-curricular marks"]
//             const max_width = columns.reduce((w, r) => Math.max(w, r.length), 10);
//   worksheet["!cols"] = [ { wch: max_width } ];
        XLSX.utils.sheet_add_aoa(worksheet, [columns], { origin: "A1" });

            
        XLSX.utils.book_append_sheet(workbook, worksheet, "counselee1");

        /* create an XLSX file and try to save to Presidents.xlsx */
        XLSX.writeFile(workbook, "Counselee List.xlsx");
    }

    const handleDelete = (index) => {
        const filtered = data.filter((value, ind) => {
            if (ind != index)
                return value
        })
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
            if (!data.name || !data.rank || !data.service_id || !data.f_occ || !data.fo_name || !data.gender|| !data.m_occ || !data.mo_name|| !data.qualification || data.academic_marks==0 || data.pro_extra_co_marks==0)
                return setMessage({ ...message, error: "Few fields are empty" })
        })
        axios.put('/counsellor/addCounseleeList', {
            counselee_list: data, counsellor_service_id: counselId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setMessage({ message: data?.data?.message, error: null })
            setData([{ rank: "Flying officer", name: "", service_id: "", gender: "Male",
                dob: "",
                mo_name: "",
                m_occ: "",
                fo_name: "",
                f_occ: "",
                si_name: "",
                si_occ: "",
                qualification: "",
                academic_marks:0,
                pro_extra_co_marks:0}])

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

                    <h1 className="text-center" style={{ color: "white", marginTop: "1rem" }}>Add Counselee</h1>

                </Row>

                <Row>

                    <Col xs={3}>
                        <Fab variant="extended" onClick={() => { navigate("/") }}>
                            <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
                            Back to Dashboard
                        </Fab>
                    </Col>
                    <Col className='text-end'>
                        <Button id="submit-Btn" className='mx-2' variant="contained" color="info" onClick={() => handleIncreaseStudent()} endIcon={<AddIcon />} size="medium"> Add More </Button>
                        <Button id="submit-Btn" className='mx-2' variant="contained" onClick={handleDownloadTemplate} color="info" endIcon={<DownloadIcon />} size="medium"> Download Excel Template</Button>
                        <Button id="submit-Btn" className='mx-2' variant="contained" onClick={handleUpload} color="info" endIcon={<UploadIcon />} size="medium"> Upload Excel</Button>
                        <input id="uploadexcel" type='file' style={{display:"none"}} onChange={handleUploadInput}/>
                        <Button id="submit-Btn" className='mx-2' variant="contained" onClick={handleSubmit} color="success" endIcon={<SendIcon />} size="medium"> Submit</Button>
                        <Fab sx={{ ml: 1 }} variant="extended" onClick={() => { logout(navigate) }} endIcon={<LogoutIcon />}>
                            Logout
                            <LogoutIcon sx={{ ml: 1 }} />
                        </Fab>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="d-flex justify-content-center flex-wrap">
                        {data.map((data, index) => {
                            return (
                                <Form className="table-user d-inline-block mx-1" style={{ minWidth:"30%" }}>
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
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Name"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="text" id="input-field" placeholder="User Name" name="name" value={data.name} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.name &&
                                                    <Form.Text className="text-danger">
                                                        *Name can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Gender"
                                                className="mb-3">
                                                <Form.Select style={{ background: "transparent", color: "white" }} value={data.gender} name="gender" onChange={(e) => handleChange(e, index)} index={index}>

                                                    <option selected disabled style={{ color: "black" }} value="Select">Select</option>
                                                    <option style={{ color: "black" }} value="Male">Male</option>

                                                    <option style={{ color: "black" }} value="Female">Female</option>

                                                    <option style={{ color: "black" }} value="Other">Other</option>
                                                </Form.Select>
                                                {!data.gender &&
                                                    <Form.Text className="text-danger">
                                                        *Gender can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="DOB"
                                        className="mb-3">
                                        <Form.Control id="input-field" className='text-dark bg-light' type="date" placeholder="Enter Date of Birth" value={data.dob} index={index} name="dob" onChange={(e) => handleChange(e, index)} />
                                        {!data.service_id &&
                                            <Form.Text className="text-danger">
                                                *Date of birth can't be empty
                                            </Form.Text>}
                                    </FloatingLabel>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Mother's Name"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="text" id="input-field" placeholder="User Name" name="mo_name" value={data.mo_name} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.mo_name &&
                                                    <Form.Text className="text-danger">
                                                        *Mother's name can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Mother's Occupation"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="text" id="input-field" placeholder="Mother's Occupation" name="m_occ" value={data.m_occ} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.m_occ &&
                                                    <Form.Text className="text-danger">
                                                        *Mother's Occupation can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Father's Name"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="text" id="input-field" placeholder="Father's Name" name="fo_name" value={data.fo_name} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.fo_name &&
                                                    <Form.Text className="text-danger">
                                                        *Father's name can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Father's Occupation"
                                                className="mb-3"
                                                style={{ color: "white" }}
                                            >
                                                <Form.Control type="text" id="input-field" placeholder="Father's Occupation" name="f_occ" value={data.f_occ} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.f_occ &&
                                                    <Form.Text className="text-danger">
                                                        *Father's Occupation can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Sibling's Name"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="text" id="input-field" placeholder="Sibling's Name" name="si_name" value={data.si_name} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.si_name &&
                                                    <Form.Text className="text-danger">
                                                        *Sibling's name can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Sibling's Occupation"
                                                className="mb-3"
                                                style={{ color: "white" }}
                                            >
                                                <Form.Control type="text" id="input-field" placeholder="Father's Occupation" name="si_occ" value={data.si_occ} onChange={(e) => handleChange(e, index)} index={index} />
                                                {!data.f_occ &&
                                                    <Form.Text className="text-danger">
                                                        *Sibling's Occupation can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <FloatingLabel
                                                controlId="floatingInput"
                                                label="Qualification"
                                                className="mb-3">
                                                <Form.Select style={{ background: "transparent", color: "white" }} value={data.qualification} name="qualification" onChange={(e) => handleChange(e, index)} index={index}>

                                                    <option selected disabled style={{ color: "black" }} value="Select">Select</option>
                                                    <option style={{ color: "black" }} value="Graduate">Graduate</option>

                                                    <option style={{ color: "black" }} value="Post Graduate">Post Graduate</option>

                                                    <option style={{ color: "black" }} value="PHd">PHd</option>
                                                </Form.Select>
                                                {!data.qualification &&
                                                    <Form.Text className="text-danger">
                                                        *Qualification can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Academic Marks"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="number" id="input-field" placeholder="Academic Marks" name="academic_marks" value={data.academic_marks>=0?data.academic_marks:data.academic_marks=0} onChange={(e) => handleChange(e, index)} index={index} />
                                                {data.academic_marks==0 &&
                                                    <Form.Text className="text-danger">
                                                        *Academic marks can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                        <FloatingLabel
                                                controlId="floatingInput"
                                                label="Project & Extra Curricular Marks"
                                                className="mb-3"
                                                style={{ color: "white" }}

                                            >
                                                <Form.Control type="number" id="input-field" placeholder="Project & Extra Curricular Marks" name="pro_extra_co_marks" value={data.pro_extra_co_marks>=0?data.pro_extra_co_marks:data.pro_extra_co_marks=0} onChange={(e) => handleChange(e, index)} index={index} />
                                                {data.pro_extra_co_marks==0 &&
                                                    <Form.Text className="text-danger">
                                                        *Project & Extra Curricular marks can't be empty
                                                    </Form.Text>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    {/* <FloatingLabel
                                        controlId="floatingInput"
                                        label="Rank"
                                        className="mb-3">
                                        <Form.Select style={{ background: "transparent", color: "white" }} value={data.rank} name="rank" onChange={(e) => handleChange(e, index)} index={index}>

                                            <option selected disabled style={{ color: "black" }} value="Select">Select</option>
                                            <option style={{ color: "black" }} value="Flying officer">Flying officer</option>

                                            <option style={{ color: "black" }} value="Flight cadet">Flight cadet</option>

                                        </Form.Select>
                                        {!data.rank &&
                                            <Form.Text className="text-danger">
                                                *Rank can't be empty
                                            </Form.Text>}
                                    </FloatingLabel> */}

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