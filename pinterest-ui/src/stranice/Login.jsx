import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import instanca from "../axios-instanca/instanca";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = (e) => {
        instanca.post("login", formData).then(response => {
            console.log(response.data);
            window.sessionStorage.setItem("token", response.data.token);
            window.location.href = "/";
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <>
            <div className="text-center mt-3">
                <h1 className="fw-bold">Login to Pinterest</h1>
                <p className="text-muted">Then you can find a lot of interesting boards</p>
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleSubmit}>
                Login
            </Button>
        </>
    );
};

export default Login;