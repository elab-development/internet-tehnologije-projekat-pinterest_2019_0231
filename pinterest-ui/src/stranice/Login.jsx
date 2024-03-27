import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import instanca from "../axios-instanca/instanca";
import useForm from "../useForm";

const Login = () => {

    const [message, setMessage] = useState("");

    const {formData, handleChange} = useForm({
        email: "",
        password: "",
        emailRegister: "",
        passwordRegister: "",
        name: ""
    });

    const handleSubmit = (e) => {
        instanca.post("login", formData).then(response => {
            console.log(response.data);
            window.sessionStorage.setItem("token", response.data.podaci.token);
            window.sessionStorage.setItem("userId", response.data.podaci.korisnik.id);
            window.location.href = "/";
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmitRegister = (e) => {

        console.log(formData);

        let data = {
            email: formData.emailRegister,
            password: formData.passwordRegister,
            name: formData.name
        }

        instanca.post("register", data).then(response => {
            console.log(response.data);
            if (response.data.status === 200) {
                setMessage("You have successfully registered. Please login now.");
            }else{
                setMessage("Something went wrong. Please try again.");
            }
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <>
            <div className="text-center mt-3">
                <h1 className="fw-bold">Login to Pinterest</h1>
                <p className="text-muted">Then you can find a lot of interesting boards</p>
                <p>{message}</p>
            </div>

            <Row>
                <Col>
                    <h2>Login page</h2>
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
                </Col>
                <Col>
                    <h2>Do not have an account, please register</h2>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="name" type="name" placeholder="Enter name" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} name="emailRegister" type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="passwordRegister" type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={handleSubmitRegister}>
                        Register
                    </Button>

                </Col>
            </Row>


        </>
    );
};

export default Login;