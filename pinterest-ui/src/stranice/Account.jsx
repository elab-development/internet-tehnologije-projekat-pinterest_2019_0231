import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import instanca from "../axios-instanca/instanca";

const Account = () => {

    const userId = parseInt(window.sessionStorage.getItem("userId"));

    const [poruka, setPoruka] = useState("");

    const [data, setData] = useState([]);

    const [refreshBoards, setRefreshBoards] = useState(0);

    useEffect(() => {
        let userId = window.sessionStorage.getItem("userId");
        instanca.get("user-boards/"+userId)
            .then(response => {
                console.log(response.data);
                setData(response.data.podaci);
            })
            .catch(error => {
                console.log(error);
            });
    }, [refreshBoards]);

    const {formData, handleChange} = useForm({
        title: "",
        description: "",
        board_id: "",
        pin_title: "",
        pin_description: "",
        image: ""
    });

    const addBoard = () => {

        console.log(formData);

        instanca.post("/boards", {
            title: formData.title,
            description: formData.description,
            user_id: userId
        }).then(response => {
            console.log(response.data);
            if (response.data.status === 200) {
                setRefreshBoards(refreshBoards + 1);
                setPoruka("Board added successfully");
            }
        }).catch(error => {
            console.log(error);
            setPoruka("Something went wrong. Please try again");
        });
    }

    const addPin = () => {

            console.log(formData);

            instanca.post("/pins", {
                pin_title: formData.pin_title,
                pin_description: formData.pin_description,
                image: formData.image,
                board_id: formData.board_id
            }).then(response => {
                console.log(response.data);
                if (response.data.status === 200) {
                    setPoruka("Pin added successfully");
                }
            }).catch(error => {
                console.log(error);
                setPoruka("Something went wrong. Please try again");
            });
    }



    return (
        <div>
            <div className="text-center mt-3">
                <h1 className="fw-bold">My Account</h1>
                <p className="text-muted">Add new pins and boards</p>
                <h3>{
                    poruka
                }</h3>
            </div>

            <Row>
                <Col>
                    <h1>Add board</h1>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={handleChange} name="title" type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={handleChange} name="description" as="textarea" rows={3}/>
                        </Form.Group>
                        <hr/>
                        <Button variant={"primary"} onClick={addBoard} type={"button"}>Add board</Button>
                    </Form>
                </Col>

                <Col>
                    <h1>Add pins</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Board</Form.Label>
                            <Form.Select name="board_id" onChange={handleChange} aria-label="Choose the board">
                                {
                                    data && data.map(board => {
                                        return (
                                            <option key={board.id} value={board.id}>{board.title}</option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Pin Title</Form.Label>
                            <Form.Control onChange={handleChange} name="pin_title" type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Label>Pin Description</Form.Label>
                            <Form.Control onChange={handleChange} name="pin_description" as="textarea" rows={3}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control onChange={handleChange} name="image" type="text"/>
                        </Form.Group>
                        <hr/>
                        <Button variant={"primary"} onClick={addPin} type={"button"}>Add pin</Button>
                    </Form>
            </Col>
        </Row>
</div>
)
    ;
};

export default Account;